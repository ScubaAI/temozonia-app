import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DigitalReceipt } from "@/components/features/receipt/DigitalReceipt";
import { OrderStatusBadge } from "@/components/features/receipt/OrderStatusBadge";
import { WhatsAppNotification } from "@/components/features/receipt/WhatsAppNotification";
import type { Locale } from "@/lib/i18n/routing";

interface OrderPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { locale, id } = await params;
  const t = await getTranslations({ locale, namespace: "order" });

  // 1. Buscar la orden en la base de datos
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!order) {
    notFound();
  }

  // 2. Mapear a formato del frontend
  const formattedOrder = {
    id: order.id,
    items: order.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      name: item.name,
      description: item.description,
      price: item.price,
      quantity: item.quantity,
      image: item.image ?? undefined,
      currency: item.currency,
    })),
    subtotal: order.subtotal,
    tax: order.tax,
    deliveryFee: order.deliveryFee,
    total: order.total,
    currency: order.currency,
    discount: order.discount ?? undefined,
    payment: {
      method: order.paymentMethod as "btc" | "mercadopago" | "stripe",
      status: order.paymentStatus as any,
      provider: order.paymentProvider || "",
      providerOrderId: order.providerOrderId ?? undefined,
      txId: order.txId ?? undefined,
      invoiceId: order.invoiceId ?? undefined,
    },
    customer: {
      name: order.customerName,
      email: order.customerEmail,
      phone: order.customerPhone,
      address: order.customerAddress,
    },
    delivery: {
      zone: order.deliveryZone,
      fee: order.deliveryFee,
      eta: order.deliveryEta,
      address: order.deliveryAddress,
    },
    locale: order.locale as Locale,
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
    notes: order.notes ?? undefined,
  };

  return (
    <main className="min-h-screen bg-cream relative overflow-hidden">
      {/* Textura de papel sutil */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-noise" />

      {/* Glow decorativo superior */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-12 md:py-16">
        {/* ─── Encabezado Heritage ─── */}
        <header className="text-center mb-10">
          {/* Sello dorado */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-gold bg-parchment shadow-lg mb-4">
            <span className="text-2xl">🥩</span>
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-black text-dark-wood mb-2">
            {order.paymentStatus === "paid"
              ? t("title.success")
              : t("title.pending")}
          </h1>

          {/* Divisor dorado con diamante */}
          <div className="relative w-48 mx-auto my-4">
            <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gold text-[8px] bg-cream px-2">
              ◆
            </span>
          </div>

          <p className="font-script text-lg italic text-warm-brown">
            {order.paymentStatus === "paid"
              ? t("subtitle.success")
              : t("subtitle.pending")}
          </p>
        </header>

        {/* ─── Badge de Estado ─── */}
        <div className="flex justify-center mb-8">
          <OrderStatusBadge status={order.paymentStatus} method={order.paymentMethod} />
        </div>

        {/* ─── Recibo Digital ─── */}
        <DigitalReceipt order={formattedOrder} locale={locale} />

        {/* ─── Notificación WhatsApp ─── */}
        <WhatsAppNotification
          order={formattedOrder}
          locale={locale}
        />

        {/* ─── Footer de la página ─── */}
        <footer className="text-center mt-12">
          <p className="font-body text-sm text-warm-brown/60 mb-4">
            {t("footer.thanks")}
          </p>
          <a
            href={`/${locale}/menu`}
            className="inline-block font-body text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors underline underline-offset-4"
          >
            {t("footer.backToMenu")}
          </a>
        </footer>
      </div>
    </main>
  );
}
