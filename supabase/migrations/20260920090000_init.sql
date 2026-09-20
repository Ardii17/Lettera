-- =============================================================================
-- Lettera — schema awal: profiles, templates, letters, index, RLS, policy, RPC.
-- Dijalankan lewat `supabase db push` atau disalin ke SQL Editor Supabase.
-- =============================================================================

-- gen_random_uuid() tersedia bawaan di Postgres 14+ (Supabase), jadi tidak perlu extension tambahan.

-- -----------------------------------------------------------------------------
-- Enum
-- -----------------------------------------------------------------------------
do $$
begin
  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type public.user_role as enum ('user', 'admin');
  end if;
  if not exists (select 1 from pg_type where typname = 'letter_status') then
    create type public.letter_status as enum ('draft', 'published', 'archived');
  end if;
end
$$;

-- -----------------------------------------------------------------------------
-- Helper: updated_at otomatis
-- -----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- -----------------------------------------------------------------------------
-- profiles — 1:1 dengan auth.users
-- -----------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  name text,
  avatar_url text,
  role public.user_role not null default 'user',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is 'Data publik user. Role dipakai untuk fitur admin di masa depan.';

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Profil dibuat otomatis saat user mendaftar (email/password maupun OAuth).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'name', split_part(coalesce(new.email, ''), '@', 1)),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Helper role admin. SECURITY DEFINER supaya policy tidak memicu rekursi RLS.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- -----------------------------------------------------------------------------
-- templates — katalog template (komponen React-nya ada di kode, bukan di DB)
-- -----------------------------------------------------------------------------
create table if not exists public.templates (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  category text not null,
  thumbnail_url text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on column public.templates.slug is 'Penghubung ke registry template di kode (src/templates).';

drop trigger if exists templates_set_updated_at on public.templates;
create trigger templates_set_updated_at
  before update on public.templates
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- letters — surat milik user
-- -----------------------------------------------------------------------------
create table if not exists public.letters (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  template_id uuid not null references public.templates (id) on delete restrict,
  public_token text not null unique,
  title text,
  content jsonb not null default '{}'::jsonb,
  status public.letter_status not null default 'published',
  view_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint letters_public_token_length check (char_length(public_token) between 16 and 64)
);

comment on column public.letters.public_token is 'Token acak (UUID v4) untuk URL publik. Bukan id baris, bukan id user.';
comment on column public.letters.content is 'Isi surat per template dalam JSONB agar schema tidak perlu berubah tiap ada template baru.';

drop trigger if exists letters_set_updated_at on public.letters;
create trigger letters_set_updated_at
  before update on public.letters
  for each row execute function public.set_updated_at();

-- Index untuk pola lookup utama.
create index if not exists letters_user_id_created_at_idx
  on public.letters (user_id, created_at desc);
create index if not exists letters_template_id_idx on public.letters (template_id);
-- public_token sudah punya unique index dari constraint UNIQUE (dipakai halaman publik).
create index if not exists templates_active_sort_idx
  on public.templates (is_active, sort_order);

-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================
alter table public.profiles enable row level security;
alter table public.templates enable row level security;
alter table public.letters enable row level security;

-- --- profiles ---------------------------------------------------------------
-- Baca profil sendiri saja; tidak ada policy yang membuka profil user lain.
drop policy if exists "profiles: baca milik sendiri" on public.profiles;
create policy "profiles: baca milik sendiri"
  on public.profiles for select
  to authenticated
  using (id = auth.uid());

-- Update terbatas pada profil sendiri.
drop policy if exists "profiles: ubah milik sendiri" on public.profiles;
create policy "profiles: ubah milik sendiri"
  on public.profiles for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

-- Insert cadangan bila trigger handle_new_user tidak berjalan (mis. impor manual).
drop policy if exists "profiles: buat milik sendiri" on public.profiles;
create policy "profiles: buat milik sendiri"
  on public.profiles for insert
  to authenticated
  with check (id = auth.uid());

-- --- templates --------------------------------------------------------------
-- Katalog template boleh dibaca siapa pun, tapi hanya yang aktif.
drop policy if exists "templates: baca yang aktif" on public.templates;
create policy "templates: baca yang aktif"
  on public.templates for select
  to anon, authenticated
  using (is_active = true);

-- Admin bisa membaca semua template termasuk yang dinonaktifkan.
drop policy if exists "templates: admin baca semua" on public.templates;
create policy "templates: admin baca semua"
  on public.templates for select
  to authenticated
  using (public.is_admin());

-- Hanya admin yang boleh mengelola katalog template.
drop policy if exists "templates: admin kelola" on public.templates;
create policy "templates: admin kelola"
  on public.templates for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- --- letters ----------------------------------------------------------------
-- User hanya melihat suratnya sendiri lewat API/dashboard.
drop policy if exists "letters: baca milik sendiri" on public.letters;
create policy "letters: baca milik sendiri"
  on public.letters for select
  to authenticated
  using (user_id = auth.uid());

-- Kepemilikan dipaksa saat insert: user_id wajib sama dengan user yang login.
drop policy if exists "letters: buat milik sendiri" on public.letters;
create policy "letters: buat milik sendiri"
  on public.letters for insert
  to authenticated
  with check (user_id = auth.uid());

-- Update hanya untuk surat sendiri, dan tidak boleh dialihkan ke user lain.
drop policy if exists "letters: ubah milik sendiri" on public.letters;
create policy "letters: ubah milik sendiri"
  on public.letters for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "letters: hapus milik sendiri" on public.letters;
create policy "letters: hapus milik sendiri"
  on public.letters for delete
  to authenticated
  using (user_id = auth.uid());

-- Catatan: TIDAK ada policy select untuk role `anon` pada tabel letters.
-- Pembaca surat publik tidak pernah menyentuh tabel ini secara langsung;
-- satu-satunya jalur baca publik adalah fungsi terkontrol di bawah.

-- =============================================================================
-- Akses publik lewat token
-- =============================================================================
-- SECURITY DEFINER: fungsi berjalan sebagai pemiliknya sehingga bisa melewati
-- RLS, tetapi hanya mengembalikan satu baris yang cocok dengan token, tanpa
-- kolom sensitif (id, user_id, status internal).
create or replace function public.get_public_letter(p_token text)
returns table (
  public_token text,
  template_slug text,
  template_name text,
  title text,
  content jsonb,
  created_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select
    l.public_token,
    t.slug as template_slug,
    t.name as template_name,
    l.title,
    l.content,
    l.created_at
  from public.letters l
  join public.templates t on t.id = l.template_id
  where l.public_token = p_token
    and l.status = 'published'
    and t.is_active = true
  limit 1;
$$;

revoke all on function public.get_public_letter(text) from public;
grant execute on function public.get_public_letter(text) to anon, authenticated;

comment on function public.get_public_letter(text) is
  'Satu-satunya jalur baca surat untuk publik. Menerima token acak dan mengembalikan konten tanpa data internal user.';
