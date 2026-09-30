import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const IMAGE_BUCKET = "lettera-gallery";
const AUDIO_BUCKET = "lettera-audio";
const MAX_UPLOAD_SIZE = 25 * 1024 * 1024; // 25MB max

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { ok: false, error: "File tidak ditemukan dalam permintaan." },
        { status: 400 },
      );
    }

    const rawExt = file.name.split(".").pop()?.toLowerCase() || "";
    const isImage =
      file.type.startsWith("image/") ||
      ["jpg", "jpeg", "png", "webp", "gif", "avif"].includes(rawExt);
    const isAudio =
      file.type.startsWith("audio/") ||
      ["mp3", "wav", "m4a", "ogg", "aac", "flac", "webm"].includes(rawExt);

    if (!isImage && !isAudio) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Format file tidak didukung. Harap pilih gambar (JPG, PNG, WebP) atau file musik audio (MP3, WAV, M4A, OGG).",
        },
        { status: 400 },
      );
    }

    if (file.size > MAX_UPLOAD_SIZE) {
      return NextResponse.json(
        { ok: false, error: "Ukuran file melebihi batas maksimal (25MB)." },
        { status: 400 },
      );
    }

    const targetBucket = isAudio ? AUDIO_BUCKET : IMAGE_BUCKET;
    const supabase = createAdminClient();

    // Pastikan bucket tujuan tersedia dan berstatus public
    try {
      const { data: buckets } = await supabase.storage.listBuckets();
      const exists = buckets?.some((b) => b.name === targetBucket);
      if (!exists) {
        await supabase.storage.createBucket(targetBucket, {
          public: true,
          fileSizeLimit: MAX_UPLOAD_SIZE,
          ...(isAudio
            ? {
                allowedMimeTypes: [
                  "audio/mpeg",
                  "audio/mp3",
                  "audio/wav",
                  "audio/wave",
                  "audio/x-wav",
                  "audio/ogg",
                  "audio/m4a",
                  "audio/x-m4a",
                  "audio/mp4",
                  "audio/aac",
                  "audio/flac",
                  "audio/webm",
                ],
              }
            : {
                allowedMimeTypes: [
                  "image/jpeg",
                  "image/png",
                  "image/webp",
                  "image/gif",
                  "image/avif",
                ],
              }),
        });
      }
    } catch (bucketErr) {
      console.warn(`[upload] Gagal memeriksa/membuat bucket ${targetBucket}:`, bucketErr);
    }

    // Buat nama file unik
    const ext = rawExt && /^[a-z0-9]+$/.test(rawExt) ? rawExt : isAudio ? "mp3" : "jpg";
    const fileName = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const contentType =
      file.type ||
      (isAudio
        ? ext === "mp3"
          ? "audio/mpeg"
          : ext === "wav"
            ? "audio/wav"
            : ext === "m4a"
              ? "audio/m4a"
              : "audio/mpeg"
        : "image/jpeg");

    const { error: uploadError } = await supabase.storage
      .from(targetBucket)
      .upload(fileName, buffer, {
        contentType,
        cacheControl: "31536000",
        upsert: true,
      });

    if (uploadError) {
      console.error(`[upload] Error uploading to ${targetBucket}:`, uploadError.message);
      return NextResponse.json(
        { ok: false, error: `Gagal mengunggah file: ${uploadError.message}` },
        { status: 500 },
      );
    }

    const { data: urlData } = supabase.storage.from(targetBucket).getPublicUrl(fileName);

    return NextResponse.json({
      ok: true,
      url: urlData.publicUrl,
      fileName,
      fileType: isAudio ? "audio" : "image",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Terjadi kesalahan internal saat unggah.";
    console.error("[upload] Unexpected error:", message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
