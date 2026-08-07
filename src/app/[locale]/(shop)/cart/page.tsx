import { getTranslations } from "next-intl/server";
import { CartDrawer } from "@/components/features/cart/CartDrawer";

export default async function CartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Cart" });

  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="font-display text-4xl text-gold mb-8">{t("title")}</h1>
      <CartDrawer />
    </section>
  );
}
