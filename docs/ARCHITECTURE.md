# Arsitektur

## Lapisan

```
app/            route, layout, metadata — tipis, hanya merangkai
components/     presentasi; Server Component kecuali butuh state
services/       akses data (query) dan Server Actions (mutasi)
templates/      registry + definisi field + komponen render
lib/            supabase client, auth helper, validasi, utility
types/          tipe database dan domain
hooks/          state sisi klien (draft, copy, share)
```

Aturan yang dipegang: halaman tidak memanggil Supabase langsung, melainkan lewat `services/`. Komponen tidak tahu bentuk baris database, hanya tipe domain di `types/letter.ts`.

## Sistem template

Tiap template punya dua sisi yang dijembatani oleh `slug`:

| Sisi | Tempat | Isi |
| --- | --- | --- |
| Data | tabel `templates` | id, name, slug, description, category, is_active, sort_order |
| Kode | `src/templates/<slug>/` | `definition.ts` (meta, daftar field, contoh data) + `XTemplate.tsx` (komponen render) |

`src/templates/registry.ts` mengekspor `TEMPLATES`, `getTemplate(slug)`, dan `isValidTemplateSlug(slug)`. `src/templates/renderer.tsx` menyediakan `<TemplateRenderer template={slug} data={content} />` yang dipakai di tiga tempat berbeda: thumbnail, live preview di builder, dan halaman publik. Konsekuensinya preview selalu identik dengan hasil akhir tanpa usaha tambahan.

`templates.service.ts` membaca tabel `templates` dan menggabungkannya dengan registry. Bila tabel belum di-seed, service jatuh kembali ke registry sehingga aplikasi tetap bisa dijelajahi sebelum migrasi dijalankan.

### Menambah template baru

1. Buat folder `src/templates/thankyou/` berisi `definition.ts` dan `ThankYouTemplate.tsx`.
2. Daftarkan di `registry.ts`.
3. Tambahkan satu baris `insert` di seed SQL.

Tidak ada perubahan lain: form, validasi, builder, dashboard, dan halaman publik semuanya generik.

## Form dari konfigurasi

`definition.ts` mendeklarasikan field (`name`, `label`, `type`, `required`, `maxLength`, `placeholder`, `helpText`). Dari daftar itu:

- `buildContentSchema(fields)` menyusun schema Zod.
- `buildDefaultValues(fields, sample)` menyiapkan nilai awal.
- `DynamicForm` merender input yang sesuai tipe field.
- `deriveTitle()` menyusun judul surat untuk dashboard.

Schema yang sama dipanggil ulang di Server Action, jadi satu definisi field menghasilkan validasi klien dan server sekaligus.

## Alur pembuatan surat

1. `/create/[slug]` memuat definisi template, memulihkan draft dari localStorage bila ada.
2. React Hook Form `watch()` mengalirkan nilai ke `PreviewPanel` — live preview tanpa refresh.
3. Draft disimpan ke localStorage dengan debounce 700 ms.
4. Tombol "Buat Digital Letter" memanggil `createLetterAction`. Bila user belum login, draft disimpan lebih dulu lalu user diarahkan ke `/login?next=/create/{slug}`.
5. Server Action memvalidasi ulang, menyanitasi teks, membuat token acak (retry bila bentrok unique), menyimpan baris, lalu mengembalikan token.
6. Redirect ke `/created/{slug}/{token}` — halaman "surat kamu siap" dengan Copy Link, Web Share, Open Letter, Create Another.

## Client Supabase

Empat client dengan tanggung jawab berbeda, tidak pernah dipakai silang:

| File | Untuk | Catatan |
| --- | --- | --- |
| `lib/supabase/client.ts` | browser | auth, form login/register |
| `lib/supabase/server.ts` | Server Component & Action | membaca cookie sesi |
| `lib/supabase/middleware.ts` | middleware | menyegarkan sesi |
| `lib/supabase/anon.ts` | halaman publik | tanpa cookie sama sekali, hanya memanggil RPC |
| `lib/supabase/admin.ts` | server saja | service role, dipagari `import "server-only"` |

## Rendering & performa

Hampir semua halaman adalah Server Component. Client Component dibatasi pada builder, form auth, dan tombol interaktif (copy, share, konfirmasi hapus). `/templates/[slug]` di-prerender lewat `generateStaticParams`. Halaman surat publik memakai `dynamic = "force-dynamic"` agar isi tidak ikut ter-cache. Helper sesi dibungkus `cache()` supaya satu request tidak memanggil Supabase berulang kali.

Thumbnail template dirender tanpa JavaScript: `.thumb-frame` memakai `container-type: inline-size` dan `.thumb-canvas` menskalakan kanvas 760 px dengan `transform: scale(calc(100cqw / 760))`.

## Desain

Palet "stationery" didefinisikan sebagai token `@theme` Tailwind v4 di `globals.css`: latar `#f3f1f7`, kertas putih, tinta `#241d33`, aksen wax seal `#c03a52`, ditambah sage dan gold untuk template tertentu. Tiga keluarga huruf: Inter untuk antarmuka, Fraunces untuk display, Caveat untuk tanda tangan. Animasi dibatasi pada satu momen `animate-settle` di hero.

## Aksesibilitas

Skip link di layout root, HTML semantik, label terhubung ke input, pesan error terkait lewat `aria-describedby` dan `role="alert"`, focus ring terlihat di semua kontrol, serta target sentuh yang lega di mobile.
