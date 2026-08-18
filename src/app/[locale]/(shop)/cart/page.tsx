import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { CartView } from "@/components/features/cart/CartView";
import type { Locale } from "@/lib/i18n/routing";

interface CartPageProps {
  params: Promise<{ locale: Locale }>;
}

// ✅ SEO METADATA
export async function generateMetadata({
  params,
}: CartPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cart" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function CartPage({ params }: CartPageProps) {
  const { locale } = await params;

  // ✅ CORREGIDO: Inicializar el contexto de locale para next-intl
  setRequestLocale(locale);

  const t = await getTranslations("cart");

  return (
    <div className="min-h-screen bg-cream py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="font-display text-4xl font-black text-dark-wood text-center">
          {t("title")}
        </h1>

        {/* Divisor dorado */}
        <div className="mx-auto mt-6 flex items-center justify-center gap-3">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold" />
          <span className="text-gold" aria-hidden="true">◆</span>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold" />
        </div>

        <CartView locale={locale} />
      </div>
    </div>
  );
}
