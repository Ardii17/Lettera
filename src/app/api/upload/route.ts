import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const BUCKET_NAME = "lettera-gallery";
const MAX_UPLOAD_SIZE = 15 * 1024 * 1024; // 15MB max

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { ok: false, error: "File foto tidak ditemukan dalam permintaan." },
        { status: 400 },
      );
    }

    // Validasi tipe file
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { ok: false, error: "File harus berupa gambar (JPG, PNG, WebP, atau GIF)." },
        { status: 400 },
      );
    }

    if (file.size > MAX_UPLOAD_SIZE) {
      return NextResponse.json(
        { ok: false, error: "Ukuran file melebihi batas maksimal (15MB)." },
        { status: 400 },
      );
    }

    const supabase = createAdminClient();

    // Pastikan bucket tersedia dan berstatus public
    try {
      const { data: buckets } = await supabase.storage.listBuckets();
      const exists = buckets?.some((b) => b.name === BUCKET_NAME);
      if (!exists) {
        await supabase.storage.createBucket(BUCKET_NAME, {
          public: true,
          fileSizeLimit: MAX_UPLOAD_SIZE,
          allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"],
        });
      }
    } catch (bucketErr) {
      console.warn("[upload] Gagal memeriksa/membuat bucket, mencoba melanjutkan:", bucketErr);
    }

    // Buat nama file unik dan aman
    const rawExt = file.name.split(".").pop()?.toLowerCase();
    const ext = rawExt && /^[a-z0-9]+$/.test(rawExt) ? rawExt : "jpg";
    const fileName = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, buffer, {
        contentType: file.type || "image/jpeg",
        cacheControl: "31536000",
        upsert: true,
      });

    if (uploadError) {
      console.error("[upload] Error uploading to Supabase Storage:", uploadError.message);
      return NextResponse.json(
        { ok: false, error: `Gagal mengunggah foto: ${uploadError.message}` },
        { status: 500 },
      );
    }

    const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);

    return NextResponse.json({
      ok: true,
      url: urlData.publicUrl,
      fileName,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Terjadi kesalahan internal saat unggah.";
    console.error("[upload] Unexpected error:", message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
