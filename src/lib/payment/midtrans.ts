import crypto from "crypto";

export interface MidtransConfig {
  serverKey: string;
  clientKey: string;
  isProduction: boolean;
  baseUrl: string;
}

export function getMidtransConfig(): MidtransConfig {
  const serverKey = process.env.MIDTRANS_SERVER_KEY ?? "";
  const clientKey = process.env.MIDTRANS_CLIENT_KEY ?? "";
  const isProduction = process.env.MIDTRANS_IS_PRODUCTION === "true";
  const baseUrl = isProduction
    ? "https://api.midtrans.com"
    : "https://api.sandbox.midtrans.com";

  return { serverKey, clientKey, isProduction, baseUrl };
}

export interface CreateQrisParams {
  orderId: string;
  amount: number;
  templateName?: string;
  customerName?: string;
  customerEmail?: string;
}

export interface QrisTransactionResult {
  ok: boolean;
  orderId: string;
  qrUrl: string;
  qrString?: string;
  expiresAt?: string;
  isMock: boolean;
  error?: string;
}

/**
 * Membuat transaksi QRIS Dinamis ke Midtrans Core API.
 * Jika MIDTRANS_SERVER_KEY belum diisi di environment, sistem otomatis masuk ke
 * mode demo/simulasi agar pengembangan dan pengujian lokal tetap dapat berjalan.
 */
export async function createQrisCharge(
  params: CreateQrisParams,
): Promise<QrisTransactionResult> {
  const config = getMidtransConfig();

  // Mode Fallback / Mock jika Server Key belum dikonfigurasi
  if (!config.serverKey) {
    return {
      ok: true,
      orderId: params.orderId,
      qrUrl: "/images/qris-code.jpeg",
      qrString: "00020101021226570011ID.LETTERA.MOCK.QRIS5405150005802ID5914LETTERA STUDIO6007JAKARTA6304ABCD",
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
      isMock: true,
    };
  }

  try {
    const authHeader = `Basic ${Buffer.from(`${config.serverKey}:`).toString("base64")}`;

    const payload = {
      payment_type: "qris",
      transaction_details: {
        order_id: params.orderId,
        gross_amount: params.amount,
      },
      customer_details: {
        first_name: params.customerName?.trim() || "Pelanggan Lettera",
        email: params.customerEmail?.trim() || "pembeli@lettera.my.id",
      },
      item_details: [
        {
          id: params.orderId,
          price: params.amount,
          quantity: 1,
          name: `Penerbitan Surat ${params.templateName || "Digital"}`,
        },
      ],
      qris: {
        acquirer: "gopay",
      },
    };

    const response = await fetch(`${config.baseUrl}/v2/charge`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok || (data.status_code !== "201" && data.status_code !== "200")) {
      // Jika order ID sudah pernah dibuat, coba ambil statusnya
      if (data.status_code === "406" || data.status_message?.toLowerCase().includes("duplicate")) {
        const qrUrl = data.actions?.find((a: { name: string; url: string }) => a.name === "generate-qr-code")?.url;
        if (qrUrl) {
          return {
            ok: true,
            orderId: params.orderId,
            qrUrl,
            qrString: data.qr_string,
            expiresAt: data.expiry_time,
            isMock: false,
          };
        }
      }

      console.error("[Midtrans charge error]", data);
      return {
        ok: false,
        orderId: params.orderId,
        qrUrl: "/images/qris-code.jpeg",
        isMock: false,
        error: data.status_message || "Gagal membuat barcode QRIS di Midtrans.",
      };
    }

    const qrUrl =
      data.actions?.find((a: { name: string; url: string }) => a.name === "generate-qr-code")?.url ||
      data.qr_url ||
      "/images/qris-code.jpeg";

    return {
      ok: true,
      orderId: params.orderId,
      qrUrl,
      qrString: data.qr_string,
      expiresAt: data.expiry_time,
      isMock: false,
    };
  } catch (error: unknown) {
    console.error("[Midtrans connection error]", error);
    return {
      ok: false,
      orderId: params.orderId,
      qrUrl: "/images/qris-code.jpeg",
      isMock: false,
      error: error instanceof Error ? error.message : "Gagal terhubung ke server Midtrans.",
    };
  }
}

/**
 * Memeriksa status transaksi dari Midtrans Core API berdasarkan Order ID / Token.
 */
export async function checkMidtransStatus(orderId: string): Promise<{
  status: "settlement" | "pending" | "expire" | "cancel" | "unknown";
  raw?: Record<string, unknown>;
}> {
  const config = getMidtransConfig();

  if (!config.serverKey) {
    return { status: "unknown" };
  }

  try {
    const authHeader = `Basic ${Buffer.from(`${config.serverKey}:`).toString("base64")}`;

    const response = await fetch(`${config.baseUrl}/v2/${orderId}/status`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: authHeader,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return { status: "unknown" };
    }

    const data = await response.json();
    const transactionStatus = data.transaction_status as string;

    if (transactionStatus === "settlement" || transactionStatus === "capture") {
      return { status: "settlement", raw: data };
    }
    if (transactionStatus === "pending") {
      return { status: "pending", raw: data };
    }
    if (transactionStatus === "expire") {
      return { status: "expire", raw: data };
    }
    if (transactionStatus === "cancel" || transactionStatus === "deny") {
      return { status: "cancel", raw: data };
    }

    return { status: "unknown", raw: data };
  } catch (err) {
    console.error("[Midtrans check status error]", err);
    return { status: "unknown" };
  }
}

/**
 * Memvalidasi SHA512 Signature Key dari notifikasi Webhook Midtrans.
 * signature = SHA512(order_id + status_code + gross_amount + ServerKey)
 */
export function verifyMidtransSignature(params: {
  orderId: string;
  statusCode: string;
  grossAmount: string;
  signatureKey: string;
}): boolean {
  const config = getMidtransConfig();
  if (!config.serverKey) return false;

  const payload = `${params.orderId}${params.statusCode}${params.grossAmount}${config.serverKey}`;
  const expectedHash = crypto.createHash("sha512").update(payload).digest("hex");

  return expectedHash.toLowerCase() === params.signatureKey.toLowerCase();
}
