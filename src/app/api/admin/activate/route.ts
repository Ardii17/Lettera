import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_DEFAULT_SECRET, getUniqueAmount } from "@/lib/payment/qris-static";
import { getTemplateRowsById } from "@/services/templates.service";
import { getTemplate } from "@/templates/registry";

function isAuthorized(secret: string | null): boolean {
  if (!secret) return false;
  const expectedSecret =
    process.env.ADMIN_SECRET_KEY || ADMIN_DEFAULT_SECRET;
  return secret === expectedSecret;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");
    const token = searchParams.get("token");
    const action = searchParams.get("action");

    if (!isAuthorized(secret)) {
      return NextResponse.json(
        { ok: false, error: "Kunci rahasia admin tidak valid atau tidak disediakan." },
        { status: 401 },
      );
    }

    const supabase = await createClient();

    // 1. Aksi: Mengambil daftar surat pending untuk Admin Dashboard
    if (action === "list" || !token) {
      const { data, error } = await supabase
        .from("letters")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) {
        return NextResponse.json(
          { ok: false, error: error.message },
          { status: 500 },
        );
      }

      const templateRows = await getTemplateRowsById();

      const letters = (data ?? []).map((row) => {
        const templateRow = templateRows.get(row.template_id);
        const slug = templateRow?.slug ?? "";
        const meta = slug ? getTemplate(slug) : null;
        const amount = getUniqueAmount(row.amount ?? 15000, row.public_token);
        const contentObj =
          row.content && typeof row.content === "object" && !Array.isArray(row.content)
            ? (row.content as Record<string, unknown>)
            : {};
        const recipient = String(contentObj.recipient ?? contentObj.recipientName ?? "");

        return {
          id: row.id,
          publicToken: row.public_token,
          title: row.title ?? meta?.name ?? "Surat Digital",
          templateName: meta?.name ?? templateRow?.name ?? "Template",
          templateSlug: slug,
          recipient,
          payerName: row.payer_name ?? "",
          amount,
          status: row.status,
          paymentStatus: row.payment_status,
          createdAt: row.created_at,
        };
      });

      return NextResponse.json({ ok: true, letters });
    }

    // 2. Aksi: Aktivasi 1-Klik melalui tautan langsung (GET)
    const { data: letter, error: findError } = await supabase
      .from("letters")
      .select("*")
      .eq("public_token", token)
      .maybeSingle();

    if (findError || !letter) {
      return new Response(
        `<!DOCTYPE html>
        <html lang="id">
        <head><meta charset="UTF-8"><title>Aktivasi Gagal - Lettera Admin</title><meta name="viewport" content="width=device-width, initial-scale=1"></head>
        <body style="font-family: system-ui, sans-serif; background: #F4EEE2; color: #4A3527; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px;">
          <div style="background: white; border-radius: 20px; padding: 32px; max-width: 440px; text-align: center; border: 1px solid #E4D7C3; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            <div style="font-size: 40px; margin-bottom: 12px;">❌</div>
            <h1 style="font-size: 20px; margin: 0 0 8px;">Surat Tidak Ditemukan</h1>
            <p style="font-size: 14px; color: #6E533F; margin-bottom: 24px;">Token surat <code>${token}</code> tidak ditemukan di sistem.</p>
            <a href="/admin/activate" style="display: inline-block; background: #A87550; color: white; padding: 10px 20px; border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 13px;">Buka Panel Admin</a>
          </div>
        </body>
        </html>`,
        { headers: { "Content-Type": "text/html; charset=utf-8" } },
      );
    }

    // Update status menjadi paid dan published
    const { error: updateError } = await supabase
      .from("letters")
      .update({
        payment_status: "paid",
        status: "published",
        updated_at: new Date().toISOString(),
      })
      .eq("public_token", token);

    if (updateError) {
      return NextResponse.json(
        { ok: false, error: "Gagal memperbarui status surat." },
        { status: 500 },
      );
    }

    const templateRows = await getTemplateRowsById();
    const templateRow = templateRows.get(letter.template_id);
    const slug = templateRow?.slug ?? "romantic";

    return new Response(
      `<!DOCTYPE html>
      <html lang="id">
      <head><meta charset="UTF-8"><title>Surat Berhasil Diaktifkan! - Lettera Admin</title><meta name="viewport" content="width=device-width, initial-scale=1"></head>
      <body style="font-family: system-ui, sans-serif; background: #F4EEE2; color: #4A3527; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px;">
        <div style="background: white; border-radius: 20px; padding: 32px; max-width: 480px; text-align: center; border: 2px solid #10b981; box-shadow: 0 10px 25px rgba(16, 185, 129, 0.1);">
          <div style="font-size: 48px; margin-bottom: 12px;">🎉</div>
          <h1 style="font-size: 22px; font-weight: bold; margin: 0 0 8px; color: #065f46;">Pembayaran Berhasil Diaktifkan!</h1>
          <p style="font-size: 14px; color: #6E533F; margin-bottom: 20px;">Surat digital kini telah aktif dan berstatus <strong>PAID & PUBLISHED</strong>. Layar pembeli akan otomatis berpindah dalam 3 detik.</p>
          <div style="background: #FBF7F0; border: 1px solid #E4D7C3; border-radius: 12px; padding: 14px; text-align: left; font-size: 13px; margin-bottom: 24px;">
            <div style="margin-bottom: 6px;"><strong>Token:</strong> <code>${token}</code></div>
            <div style="margin-bottom: 6px;"><strong>Judul:</strong> ${letter.title || "Surat Digital"}</div>
            <div><strong>Nominal:</strong> Rp ${getUniqueAmount(letter.amount ?? 15000, token).toLocaleString("id-ID")}</div>
          </div>
          <div style="display: flex; gap: 10px; justify-content: center;">
            <a href="/letter/${slug}/${token}" target="_blank" style="background: #A87550; color: white; padding: 10px 18px; border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 13px;">Buka Surat Hasil</a>
            <a href="/admin/activate" style="background: #EAE0D0; color: #4A3527; padding: 10px 18px; border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 13px;">Panel Admin</a>
          </div>
        </div>
      </body>
      </html>`,
      { headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  } catch (err) {
    console.error("[api/admin/activate] Error:", err);
    return NextResponse.json(
      { ok: false, error: "Terjadi kesalahan internal pada server admin." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token, secret } = body ?? {};

    if (!isAuthorized(secret)) {
      return NextResponse.json(
        { ok: false, error: "Kunci rahasia admin tidak valid." },
        { status: 401 },
      );
    }

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { ok: false, error: "Token surat diperlukan." },
        { status: 400 },
      );
    }

    const supabase = await createClient();

    const { data: letter, error: findError } = await supabase
      .from("letters")
      .select("*")
      .eq("public_token", token)
      .maybeSingle();

    if (findError || !letter) {
      return NextResponse.json(
        { ok: false, error: "Surat tidak ditemukan." },
        { status: 404 },
      );
    }

    const { error: updateError } = await supabase
      .from("letters")
      .update({
        payment_status: "paid",
        status: "published",
        updated_at: new Date().toISOString(),
      })
      .eq("public_token", token);

    if (updateError) {
      return NextResponse.json(
        { ok: false, error: "Gagal memperbarui status surat." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Surat berhasil diaktifkan menjadi PAID & PUBLISHED.",
      token,
    });
  } catch (err) {
    console.error("[api/admin/activate:POST] Error:", err);
    return NextResponse.json(
      { ok: false, error: "Terjadi kesalahan pada server." },
      { status: 500 },
    );
  }
}
