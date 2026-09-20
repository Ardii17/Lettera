# Database Supabase

Urutan menjalankan:

1. `20260920090000_init.sql` — tabel, index, trigger, RLS, policy, dan fungsi `get_public_letter`.
2. `20260920090100_seed_templates.sql` — katalog 4 template bawaan (idempoten).

## Dengan Supabase CLI

```bash
supabase link --project-ref <project-ref>
supabase db push
```

`seed.sql` (salinan file seed) otomatis dijalankan oleh `supabase start` untuk development lokal.

## Tanpa CLI

Buka **SQL Editor** di dashboard Supabase, jalankan isi kedua file migrasi secara berurutan.

## Catatan penting

- Setiap template baru di `src/templates/` harus ditambahkan sebagai baris di tabel `templates` dengan `slug` yang sama.
- `public_token` tidak pernah ditebak dari `id`; kolom `id` tidak pernah dikirim ke halaman publik.
- Tidak ada policy `select` untuk role `anon` di tabel `letters`. Pembacaan publik hanya lewat `get_public_letter(text)`.
