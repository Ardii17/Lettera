import { NextResponse } from "next/server";
import { getLetterForPayment } from "@/services/letters.service";
import { checkMidtransStatus, getMidtransConfig } from "@/lib/payment/midtrans";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    const simulate = searchParams.get("simulate") === "true";

    if (!token) {
      return NextResponse.json(
        { ok: false, error: "Parameter token diperlukan." },
        { status: 400 },
      );
    }

    const letter = await getLetterForPayment(token);
    if (!letter) {
      return NextResponse.json(
        { ok: false, error: "Pesanan surat tidak ditemukan." },
        { status: 404 },
      );
    }

    // Jika sudah lunas di database
    if (letter.paymentStatus === "paid") {
      return NextResponse.json({
        ok: true,
        isPaid: true,
        status: "settlement",
        templateSlug: letter.templateSlug,
        token: letter.publicToken,
      });
    }

    const midtransConfig = getMidtransConfig();

    // Jika mode simulasi bayar (HANYA diizinkan saat Sandbox / Testing, dicegah di Production)
    if (simulate && !midtransConfig.isProduction) {
      const supabase = await createClient();
      await supabase
        .from("letters")
        .update({
          payment_status: "paid",
          status: "published",
        })
        .eq("public_token", token);

      return NextResponse.json({
        ok: true,
        isPaid: true,
        status: "settlement",
        templateSlug: letter.templateSlug,
        token: letter.publicToken,
        simulated: true,
      });
    }

    // Cek ke Midtrans Core API
    const midtransCheck = await checkMidtransStatus(token);

    if (midtransCheck.status === "settlement") {
      const supabase = await createClient();
      await supabase
        .from("letters")
        .update({
          payment_status: "paid",
          status: "published",
        })
        .eq("public_token", token);

      return NextResponse.json({
        ok: true,
        isPaid: true,
        status: "settlement",
        templateSlug: letter.templateSlug,
        token: letter.publicToken,
      });
    }

    return NextResponse.json({
      ok: true,
      isPaid: false,
      status: midtransCheck.status,
      templateSlug: letter.templateSlug,
      token: letter.publicToken,
    });
  } catch (err: unknown) {
    console.error("[api/payment/status] Error:", err);
    return NextResponse.json(
      { ok: false, error: "Gagal memeriksa status pembayaran." },
      { status: 500 },
    );
  }
}
