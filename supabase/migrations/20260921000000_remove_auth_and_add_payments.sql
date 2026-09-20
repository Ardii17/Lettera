-- =============================================================================
-- Lettera — Migrasi: Hapus Keterikatan Auth & Tambahkan Metadata Pembayaran QRIS
-- =============================================================================

-- 1. Jadikan user_id opsional (nullable) agar pembuatan surat tidak membutuhkan akun login
alter table public.letters alter column user_id drop not null;

-- 2. Tambahkan kolom metadata pembayaran & pembeli
alter table public.letters add column if not exists payer_email text;
alter table public.letters add column if not exists payer_name text;
alter table public.letters add column if not exists payment_status text not null default 'pending';
alter table public.letters add column if not exists amount integer not null default 15000;

-- 3. Perbarui RLS policy agar role anon dan authenticated dapat menyimpan, membaca, dan memperbarui status pembayaran surat
drop policy if exists "letters: buat milik sendiri" on public.letters;
drop policy if exists "letters: anon buat surat" on public.letters;
create policy "letters: anon buat surat"
  on public.letters for insert
  to anon, authenticated
  with check (true);

drop policy if exists "letters: ubah milik sendiri" on public.letters;
drop policy if exists "letters: anon ubah surat" on public.letters;
create policy "letters: anon ubah surat"
  on public.letters for update
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "letters: baca milik sendiri" on public.letters;
drop policy if exists "letters: anon baca surat" on public.letters;
create policy "letters: anon baca surat"
  on public.letters for select
  to anon, authenticated
  using (true);
