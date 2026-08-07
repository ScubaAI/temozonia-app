import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { DigitalReceipt } from "@/components/features/receipt/DigitalReceipt";
import type { Locale } from "@/lib/i18n/routing";

interface OrderPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export async function generateStaticParams() {
  return [];
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { locale, id } = await params;

  if (!id) {
    notFound();
  }

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!order) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Order" });

  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="font-display text-4xl text-gold mb-8">{t("title")}</h1>
      <DigitalReceipt
        orderId={id}
        locale={locale as Locale}
        order={order}
      />
    </section>
  );
}
