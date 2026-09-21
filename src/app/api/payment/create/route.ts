import { NextResponse } from "next/server";
import { getLetterForPayment } from "@/services/letters.service";
import { createQrisCharge } from "@/lib/payment/midtrans";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = body?.token;

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { ok: false, error: "Token surat tidak valid." },
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

    if (letter.paymentStatus === "paid") {
      return NextResponse.json({
        ok: true,
        isPaid: true,
        templateSlug: letter.templateSlug,
        token: letter.publicToken,
      });
    }

    const chargeResult = await createQrisCharge({
      orderId: letter.publicToken,
      amount: letter.amount,
      templateName: letter.templateName,
      customerName: letter.payerName || "Pelanggan Lettera",
      customerEmail: letter.payerEmail || "pembeli@lettera.my.id",
    });

    return NextResponse.json({
      ok: chargeResult.ok,
      isPaid: false,
      qrUrl: chargeResult.qrUrl,
      qrString: chargeResult.qrString,
      expiresAt: chargeResult.expiresAt,
      isMock: chargeResult.isMock,
      error: chargeResult.error,
    });
  } catch (err: unknown) {
    console.error("[api/payment/create] Error:", err);
    return NextResponse.json(
      {
        ok: false,
        error: "Terjadi kesalahan saat memproses pembuatan QRIS.",
      },
      { status: 500 },
    );
  }
}
