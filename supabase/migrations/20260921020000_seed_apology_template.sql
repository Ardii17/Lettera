-- =============================================================================
-- Seed template baru: Sincere Apology & Reconciliation (Kategori Permintaan Maaf)
-- =============================================================================
insert into public.templates (id, slug, name, description, category, is_active, sort_order)
values (
  '00000000-0000-4000-8000-000000000006',
  'apology',
  'Sincere Apology & Reconciliation',
  'Surat permintaan maaf yang tulus dan mendalam dengan pengakuan jujur, komitmen perbaikan diri nyata, serta tombol rekonsiliasi ke WhatsApp pengirim.',
  'Permintaan Maaf',
  true,
  6
)
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  category = excluded.category,
  is_active = excluded.is_active,
  sort_order = excluded.sort_order,
  updated_at = now();
