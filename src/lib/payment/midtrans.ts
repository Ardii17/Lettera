import crypto from "crypto";

export interface MidtransConfig {
  serverKey: string;
  clientKey: string;
  isProduction: boolean;
  baseUrl: string;
  snapBaseUrl: string;
  snapScriptUrl: string;
}

export function getMidtransConfig(): MidtransConfig {
  const serverKey = process.env.MIDTRANS_SERVER_KEY ?? "";
  const clientKey = process.env.MIDTRANS_CLIENT_KEY ?? "";

  // Otomatis deteksi mode Production jika serverKey berawalan 'Mid-server-' atau env bernilai 'true'
  const isProduction =
    process.env.MIDTRANS_IS_PRODUCTION === "true" ||
    (serverKey.startsWith("Mid-server-") && !serverKey.startsWith("SB-"));

  const baseUrl = isProduction
    ? "https://api.midtrans.com"
    : "https://api.sandbox.midtrans.com";

  const snapBaseUrl = isProduction
    ? "https://app.midtrans.com"
    : "https://app.sandbox.midtrans.com";

  const snapScriptUrl = isProduction
    ? "https://app.midtrans.com/snap/snap.js"
    : "https://app.sandbox.midtrans.com/snap/snap.js";

  return { serverKey, clientKey, isProduction, baseUrl, snapBaseUrl, snapScriptUrl };
}

export interface CreateSnapParams {
  orderId: string;
  amount: number;
  templateName?: string;
}

export interface SnapTransactionResult {
  ok: boolean;
  orderId: string;
  snapToken?: string;
  redirectUrl?: string;
  clientKey: string;
  snapScriptUrl: string;
  isMock: boolean;
  error?: string;
}

/**
 * Membuat transaksi QRIS resmi di Midtrans melalui Snap API.
 * Snap API aktif secara bawaan untuk semua akun Midtrans (Sandbox maupun Production)
 * dengan nominal tagihan otomatis terkunci (tanpa bisa diketik manual oleh pembeli).
 */
export async function createSnapTransaction(
  params: CreateSnapParams,
): Promise<SnapTransactionResult> {
  const config = getMidtransConfig();

  // Mode Fallback / Mock jika Server Key belum dikonfigurasi
  if (!config.serverKey) {
    return {
      ok: true,
      orderId: params.orderId,
      snapToken: "mock-snap-token",
      redirectUrl: "",
      clientKey: config.clientKey,
      snapScriptUrl: config.snapScriptUrl,
      isMock: true,
    };
  }

  try {
    const authHeader = `Basic ${Buffer.from(`${config.serverKey}:`).toString("base64")}`;

    const payload = {
      transaction_details: {
        order_id: params.orderId,
        gross_amount: params.amount,
      },
      item_details: [
        {
          id: params.orderId,
          price: params.amount,
          quantity: 1,
          name: `Penerbitan Surat ${params.templateName || "Digital"}`,
        },
      ],
      enabled_payments: ["qris", "gopay", "shopeepay"],
    };

    const response = await fetch(`${config.snapBaseUrl}/snap/v1/transactions`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok || !data.token) {
      console.error("[Midtrans Snap error]", data);
      return {
        ok: false,
        orderId: params.orderId,
        clientKey: config.clientKey,
        snapScriptUrl: config.snapScriptUrl,
        isMock: false,
        error: data.error_messages?.join(", ") || "Gagal membuat transaksi di Midtrans.",
      };
    }

    return {
      ok: true,
      orderId: params.orderId,
      snapToken: data.token,
      redirectUrl: data.redirect_url,
      clientKey: config.clientKey,
      snapScriptUrl: config.snapScriptUrl,
      isMock: false,
    };
  } catch (err: unknown) {
    console.error("[Midtrans Snap connection error]", err);
    return {
      ok: false,
      orderId: params.orderId,
      clientKey: config.clientKey,
      snapScriptUrl: config.snapScriptUrl,
      isMock: false,
      error: err instanceof Error ? err.message : "Gagal terhubung ke Midtrans.",
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
