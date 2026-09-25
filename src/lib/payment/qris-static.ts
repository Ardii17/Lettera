/**
 * Modul Utilitas Pembayaran QRIS Statis & Kode Unik Lettera
 */

export const ADMIN_WHATSAPP_NUMBER = "085210358521";
export const ADMIN_WHATSAPP_INTERNATIONAL = "6285210358521";
export const ADMIN_DEFAULT_SECRET =
  process.env.ADMIN_SECRET_KEY || "lettera_admin_secret_2026";

/**
 * Menghasilkan nominal unik dengan kode 3 digit (Rp 15.101 - Rp 15.999).
 * Jika nominal sudah berupa kode unik (> 15000 dan < 16000), gunakan apa adanya.
 * Jika masih 15000 atau default, hasilkan secara deterministik dari token agar nominal tidak berubah-ubah saat di-refresh.
 */
export function getUniqueAmount(baseAmount: number, token: string): number {
  if (baseAmount > 15000 && baseAmount < 16000) {
    return baseAmount;
  }

  // Gunakan algoritma hashing sederhana dari token untuk menghasilkan kode 101 - 999
  let hash = 0;
  for (let i = 0; i < token.length; i++) {
    hash = (hash * 31 + token.charCodeAt(i)) % 899;
  }
  const uniqueCode = 101 + Math.abs(hash); // Rentang 101 s/d 999
  return 15000 + uniqueCode;
}

/**
 * Memisahkan nominal menjadi bagian ribuan dan 3 digit kode unik untuk tampilan visual
 */
export function splitAmountForDisplay(amount: number): {
  prefix: string;
  uniqueCode: string;
  formatted: string;
} {
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);

  const amountStr = amount.toString();
  const uniqueCode = amountStr.slice(-3);
  const prefix = amountStr.slice(0, -3);

  return {
    prefix,
    uniqueCode,
    formatted,
  };
}

/**
 * Menghasilkan tautan chat WhatsApp konfirmasi pembayaran dengan format pesan terisi otomatis
 */
export function generateWhatsAppConfirmationUrl(params: {
  token: string;
  amount: number;
  templateName: string;
  title: string;
  recipient?: string;
}): string {
  const formattedAmount = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(params.amount);

  const message = [
    `Halo Admin Lettera, saya telah menyelesaikan pembayaran via QRIS:`,
    ``,
    `• Kode Pesanan: ${params.token}`,
    `• Nominal Transfer: ${formattedAmount}`,
    `• Template: ${params.templateName}`,
    `• Judul: ${params.title}`,
    params.recipient ? `• Penerima: ${params.recipient}` : ``,
    ``,
    `(Berikut saya lampirkan tangkapan layar bukti transfer QRIS).`,
    `Mohon bantuannya untuk mengaktifkan surat digital saya ya Admin. Terima kasih! 🙏`,
  ]
    .filter(Boolean)
    .join("\n");

  return `https://wa.me/${ADMIN_WHATSAPP_INTERNATIONAL}?text=${encodeURIComponent(
    message,
  )}`;
}
