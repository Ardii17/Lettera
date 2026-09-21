import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Container } from "@/components/ui/container";
import { PaymentCheckout } from "@/components/payment/payment-checkout";
import { getLetterForPayment } from "@/services/letters.service";
import { getTemplate } from "@/templates/registry";
import { getMidtransConfig } from "@/lib/payment/midtrans";

export const metadata: Metadata = {
  title: "Pembayaran QRIS — Lettera",
  robots: { index: false, follow: false },
};

export default async function PaymentPage({
  params,
}: {
  params: Promise<{ template: string; token: string }>;
}) {
  const { template: templateSlug, token } = await params;
  const template = getTemplate(templateSlug);
  const letter = await getLetterForPayment(token);

  if (!template || !letter || letter.templateSlug !== templateSlug) {
    notFound();
  }

  // Jika surat sudah dibayar sebelumnya, langsung arahkan ke halaman siap dibagikan
  if (letter.paymentStatus === "paid") {
    redirect(`/created/${templateSlug}/${token}`);
  }

  const { snapScriptUrl, clientKey, isProduction } = getMidtransConfig();

  return (
    <Container className="py-6 sm:py-12">
      <PaymentCheckout
        token={letter.publicToken}
        templateSlug={templateSlug}
        templateName={letter.templateName}
        title={letter.title}
        recipient={letter.recipient}
        amount={letter.amount}
        snapScriptUrl={snapScriptUrl}
        clientKey={clientKey}
        isProduction={isProduction}
      />
    </Container>
  );
}
