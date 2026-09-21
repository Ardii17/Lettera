import { NextResponse } from "next/server";
import { verifyMidtransSignature } from "@/lib/payment/midtrans";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const orderId = payload.order_id;
    const statusCode = payload.status_code;
    const grossAmount = payload.gross_amount;
    const signatureKey = payload.signature_key;
    const transactionStatus = payload.transaction_status;
    const fraudStatus = payload.fraud_status;

    if (!orderId) {
      return NextResponse.json({ ok: false, message: "Missing order_id" }, { status: 400 });
    }

    // Validasi Signature Key jika ada
    if (signatureKey) {
      const isValid = verifyMidtransSignature({
        orderId,
        statusCode,
        grossAmount,
        signatureKey,
      });

      if (!isValid && process.env.MIDTRANS_SERVER_KEY) {
        console.warn("[Webhook Midtrans] Invalid signature key for order:", orderId);
        return NextResponse.json({ ok: false, message: "Invalid signature" }, { status: 403 });
      }
    }

    const isPaid =
      transactionStatus === "settlement" ||
      (transactionStatus === "capture" && fraudStatus === "accept");

    if (isPaid) {
      const supabase = createAdminClient();
      const { error } = await supabase
        .from("letters")
        .update({
          payment_status: "paid",
          status: "published",
        })
        .eq("public_token", orderId);

      if (error) {
        console.error("[Webhook Midtrans] Gagal mengupdate status surat:", error.message);
        return NextResponse.json({ ok: false, message: "Database update failed" }, { status: 500 });
      }

      console.log(`[Webhook Midtrans] Pembayaran lunas untuk surat token: ${orderId}`);
    }

    return NextResponse.json({ status: "OK", orderId });
  } catch (err: unknown) {
    console.error("[Webhook Midtrans] Error processing notification:", err);
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 });
  }
}
