# Lettera

Platform untuk membuat surat digital berbasis template, lalu membagikannya lewat satu tautan rahasia.

```
Landing → Pilih template → Tulis + live preview → Buat surat → Link siap dibagikan
```

Dibangun dengan Next.js 15 (App Router), TypeScript, Supabase (Auth + PostgreSQL + RLS), dan Tailwind CSS v4.

---

## Menjalankan proyek

```bash
npm install
cp .env.example .env.local     # isi kredensial Supabase
npm run dev
```

Buka http://localhost:3000

### Variabel lingkungan

| Variabel | Dipakai di | Keterangan |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | browser + server | URL project Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | browser + server | Anon key, aman di client karena RLS aktif |
| `SUPABASE_SERVICE_ROLE_KEY` | server saja (opsional) | Hanya diimpor oleh `src/lib/supabase/admin.ts` yang memakai `server-only` |
| `NEXT_PUBLIC_SITE_URL` | server | Dipakai untuk membentuk URL share dan metadata |

### Menyiapkan database

Jalankan dua migrasi di `supabase/migrations` secara berurutan (SQL Editor Supabase atau `supabase db push`):

1. `20260920090000_init.sql` — enum, tabel `profiles` / `templates` / `letters`, index, trigger, RLS, dan fungsi `get_public_letter`.
2. `20260920090100_seed_templates.sql` — seed 4 template awal (Romantic, Birthday, Graduation, Friendship).

Detail tiap policy ada di [`docs/SECURITY.md`](docs/SECURITY.md).

### Catatan build

`src/app/layout.tsx` memuat font lewat `next/font/google` (Inter, Fraunces, Caveat), jadi `npm run build` pertama membutuhkan koneksi internet agar font dapat diunduh dan di-cache.

---

## Struktur

```
src/
├── app/
│   ├── (marketing)/        landing, /templates, /templates/[slug], about, privacy, terms
│   ├── (auth)/             /login, /register
│   ├── create/[slug]/      letter builder
│   ├── created/…/          halaman "surat kamu siap"
│   ├── dashboard/          daftar + CRUD surat milik user
│   ├── letter/…/           halaman publik (noindex)
│   └── auth/callback/      pertukaran kode OAuth
├── components/             ui, layout, landing, templates, letter-builder, dashboard, auth
├── templates/              registry + definisi & komponen tiap template
├── services/               query dan Server Actions
├── lib/                    supabase, auth, validations, utils, constants
├── hooks/                  draft lokal, copy, web share
└── types/
supabase/migrations/        SQL skema, RLS, seed
docs/                       ARCHITECTURE.md, SECURITY.md
```

Pembahasan lebih dalam: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

---

## Keputusan utama

**Template adalah komponen React, bukan HTML di database.** Database hanya menyimpan `slug` template dan `content` JSONB. Registry di `src/templates/registry.ts` memetakan slug ke definisi field + komponen render, sehingga komponen yang sama dipakai untuk thumbnail, live preview, dan halaman publik. Menambah template = menambah satu folder berisi `definition.ts` + `XTemplate.tsx`, mendaftarkannya di registry, lalu satu baris seed.

**Form digerakkan konfigurasi.** Setiap template mendeklarasikan field-nya sendiri; `buildContentSchema()` menyusun schema Zod dari konfigurasi itu, dan schema yang sama dipakai ulang di Server Action saat menyimpan — validasi frontend tidak pernah dipercaya.

**Jalur baca publik terisolasi.** Tidak ada policy `select` untuk role `anon` di tabel `letters`. Halaman publik memanggil fungsi `get_public_letter(token)` (SECURITY DEFINER) lewat client Supabase tanpa cookie, dan fungsi itu hanya mengembalikan `public_token`, slug template, judul, konten, dan tanggal — `id` dan `user_id` tidak pernah meninggalkan server.

**Token publik acak.** `crypto.randomUUID()` per surat, unique di database, dengan retry bila bentrok. Bukan id baris, bukan id user.

---

## Peta fase

| Fase | Isi | Status |
| --- | --- | --- |
| 1 | Setup, Tailwind, Supabase client (browser/server/middleware), auth, skema, RLS | selesai |
| 2 | Landing page, daftar template, halaman detail template | selesai |
| 3 | Letter builder, dynamic form, live preview | selesai |
| 4 | Create letter, token publik, render surat publik | selesai |
| 5 | Dashboard, CRUD, copy/share link | selesai |
| 6 | Responsif, loading/error/empty state, SEO, a11y, performa | selesai |
| 7 | Review keamanan & RLS | selesai — lihat `docs/SECURITY.md` |

## Verifikasi

```bash
npx tsc --noEmit   # 0 error
npx eslint .       # 0 error, 0 warning
npm run build      # sukses, 19 route
```

## Siap dikembangkan

Arsitektur sudah menyediakan tempat untuk: kolom `status` dan `view_count` di `letters`, role `admin` di `profiles` beserta policy pengelolaan template, `sort_order` dan `is_active` pada template, serta `content` JSONB yang bebas berkembang. Fitur seperti expiration date, password, QR code, view counter, upload gambar, atau template premium dapat ditambahkan tanpa membongkar skema atau sistem template.

## Skrip

| Perintah | Kegunaan |
| --- | --- |
| `npm run dev` | server pengembangan |
| `npm run build` | build produksi |
| `npm start` | menjalankan hasil build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
