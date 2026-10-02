-- =============================================================================
-- Lettera — Migrasi: Tabel wedding_rsvps untuk Konfirmasi Kehadiran & Doa Restu
-- =============================================================================

create table if not exists public.wedding_rsvps (
  id uuid primary key default gen_random_uuid(),
  letter_id uuid not null references public.letters(id) on delete cascade,
  guest_name text not null,
  presence text not null default 'Hadir',
  guest_count text not null default '1',
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists wedding_rsvps_letter_id_idx on public.wedding_rsvps (letter_id, created_at desc);

-- Aktifkan RLS
alter table public.wedding_rsvps enable row level security;

-- Siapa pun dapat membaca ucapan & konfirmasi kehadiran pada surat publik
drop policy if exists "wedding_rsvps: publik baca rsvp" on public.wedding_rsvps;
create policy "wedding_rsvps: publik baca rsvp"
  on public.wedding_rsvps for select
  to anon, authenticated
  using (true);

-- Siapa pun dapat mengirimkan ucapan & konfirmasi kehadiran
drop policy if exists "wedding_rsvps: publik kirim rsvp" on public.wedding_rsvps;
create policy "wedding_rsvps: publik kirim rsvp"
  on public.wedding_rsvps for insert
  to anon, authenticated
  with check (true);
