# Keamanan

## Prinsip

URL acak bukan lapisan keamanan. Ia hanya membuat tautan sulit ditebak. Yang menjaga data adalah RLS di PostgreSQL, ditambah satu jalur baca publik yang sempit dan eksplisit.

## Policy RLS

RLS aktif di ketiga tabel. Tidak ada policy yang memberi role `anon` akses `select` ke `letters`.

### `profiles`

| Policy | Operasi | Aturan | Alasan |
| --- | --- | --- | --- |
| `profiles: baca milik sendiri` | select | `id = auth.uid()` | Profil (termasuk email) tidak boleh terbaca user lain |
| `profiles: ubah milik sendiri` | update | `id = auth.uid()` | Hanya pemilik yang boleh memperbarui nama/avatar |
| `profiles: buat milik sendiri` | insert | `id = auth.uid()` | Pelengkap trigger `on_auth_user_created` |

Baris profil dibuat otomatis oleh trigger saat user mendaftar, jadi klien tidak perlu menyisipkan apa pun.

### `templates`

| Policy | Operasi | Aturan | Alasan |
| --- | --- | --- | --- |
| `templates: baca yang aktif` | select | `is_active = true` | Katalog memang publik |
| `templates: admin baca semua` | select | `role = 'admin'` pada profil pemanggil | Admin perlu melihat template nonaktif |
| `templates: admin kelola` | all | `role = 'admin'` | Menyiapkan pengelolaan template tanpa perlu ubah skema nanti |

### `letters`

| Policy | Operasi | Aturan |
| --- | --- | --- |
| `letters: baca milik sendiri` | select | `user_id = auth.uid()` |
| `letters: buat milik sendiri` | insert | `user_id = auth.uid()` |
| `letters: ubah milik sendiri` | update | `user_id = auth.uid()` (using dan with check) |
| `letters: hapus milik sendiri` | delete | `user_id = auth.uid()` |

Artinya, walaupun seseorang memakai anon key langsung terhadap REST API Supabase, ia tidak bisa membaca satu pun surat milik orang lain — dengan atau tanpa token.

## Jalur baca publik

```sql
create function public.get_public_letter(p_token text)
returns table (public_token, template_slug, template_name, title, content, created_at)
language sql stable security definer set search_path = public
```

- **SECURITY DEFINER** membuat fungsi berjalan sebagai pemiliknya sehingga dapat melewati RLS, tetapi ia hanya mengembalikan satu baris yang cocok dengan token.
- Kolom yang dikembalikan sengaja dibatasi: tidak ada `id`, `user_id`, email, atau metadata internal.
- Syarat tambahan `status = 'published'` dan `is_active = true`, sehingga surat yang diarsipkan atau template yang dinonaktifkan tidak lagi terbuka.
- `set search_path = public` mencegah pembajakan lewat schema lain.
- Hak eksekusi dicabut dari `public` lalu diberikan eksplisit ke `anon` dan `authenticated`.

Halaman `/letter/[template]/[token]` memanggil fungsi ini lewat `lib/supabase/anon.ts`, client Supabase yang sengaja dibuat tanpa akses cookie. Jadi kunjungan ke halaman publik tidak pernah membawa sesi siapa pun.

## Token publik

`crypto.randomUUID()` menghasilkan UUID v4 dari CSPRNG. Kolom `public_token` unique dan dibatasi 16–64 karakter; jika terjadi bentrok, Server Action mencoba token baru. Token tidak pernah diturunkan dari id user atau id baris, dan id baris sendiri tidak pernah dikirim ke klien publik.

## Validasi dan sanitasi

Setiap mutasi lewat Server Action (`services/letters.actions.ts`) memvalidasi ulang payload dengan schema Zod yang dibangun dari definisi field template — hasil validasi di browser tidak dipercaya. Slug template dicocokkan dengan registry dan tabel, bukan diterima apa adanya. Teks dibersihkan (`lib/utils/sanitize.ts`) dan dipotong sesuai batas panjang. Tidak ada `dangerouslySetInnerHTML` di seluruh proyek; isi surat selalu dirender sebagai teks React, jadi tidak ada jalur XSS dari konten user.

Kepemilikan tidak pernah diambil dari field tersembunyi di form. `user_id` selalu berasal dari sesi server, dan RLS memeriksanya sekali lagi di database.

## Rahasia

`SUPABASE_SERVICE_ROLE_KEY` hanya dibaca oleh `lib/supabase/admin.ts`, yang diawali `import "server-only"` sehingga build gagal jika file itu sampai terseret ke bundle klien. Aplikasi ini tidak membutuhkannya untuk berjalan; ia disediakan untuk keperluan operasional di masa depan. Hanya variabel berawalan `NEXT_PUBLIC_` yang sampai ke browser, dan keduanya memang dirancang publik.

## Redirect dan middleware

`safeRedirectPath()` di `lib/validations/auth.ts` hanya menerima path relatif yang diawali satu garis miring, menutup open redirect lewat `?next=`. Middleware melindungi `/dashboard`, mengalihkan user yang sudah login menjauh dari `/login` dan `/register`, dan matcher-nya sengaja mengecualikan `letter/` serta aset statis agar halaman publik tetap ringan.

## Privasi konten

Halaman surat publik memakai `robots: noindex, nofollow`, dan `robots.ts` melarang `/letter/`, `/created/`, `/dashboard/`, dan `/create/`. Metadata halaman surat sengaja generik — judul dan isi surat tidak dimasukkan ke tag Open Graph agar tidak bocor lewat preview tautan atau cache mesin pencari.

## Header respons

`next.config.ts` memasang `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, dan `Permissions-Policy` yang mematikan kamera, mikrofon, dan geolokasi. `poweredByHeader` dimatikan.

## Pesan error

Kesalahan database tidak pernah ditampilkan mentah. Halaman error dan `ErrorNotice` menampilkan kalimat ramah beserta jalan keluar; detail teknis hanya masuk log server.

## Checklist

- [x] RLS aktif di semua tabel, tanpa policy publik ke `letters`
- [x] Baca publik hanya lewat RPC SECURITY DEFINER dengan kolom terbatas
- [x] Token acak kriptografis, unique, bukan id user atau id baris
- [x] `id` dan `user_id` tidak pernah dikirim ke halaman publik
- [x] Service role key tidak pernah masuk bundle klien
- [x] Semua input divalidasi ulang di server
- [x] Konten disanitasi, tanpa `dangerouslySetInnerHTML`
- [x] Kepemilikan diambil dari sesi, bukan dari form
- [x] Open redirect ditutup
- [x] Surat publik `noindex` dan metadata tidak membocorkan isi
- [x] Security header terpasang
- [x] Pesan error tidak membocorkan detail internal
