import { NextResponse } from "next/server";
import { getLetterForPayment } from "@/services/letters.service";
import { createSnapTransaction } from "@/lib/payment/midtrans";

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

    const snapResult = await createSnapTransaction({
      orderId: letter.publicToken,
      amount: letter.amount,
      templateName: letter.templateName,
    });

    return NextResponse.json({
      ok: snapResult.ok,
      isPaid: false,
      snapToken: snapResult.snapToken,
      redirectUrl: snapResult.redirectUrl,
      clientKey: snapResult.clientKey,
      snapScriptUrl: snapResult.snapScriptUrl,
      isMock: snapResult.isMock,
      error: snapResult.error,
      warning: snapResult.warning,
    });
  } catch (err: unknown) {
    console.error("[api/payment/create] Error:", err);
    return NextResponse.json(
      {
        ok: false,
        error: "Terjadi kesalahan saat memproses pembuatan pembayaran QRIS.",
      },
      { status: 500 },
    );
  }
}
