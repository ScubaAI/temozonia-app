import { setRequestLocale, getTranslations } from "next-intl/server";
import { ProductCard } from "@/components/features/product/ProductCard";
import { PRODUCTS, CATEGORIES } from "@/lib/constants";

export default async function MenuPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("menu");

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* Header de la página */}
      <div className="mb-12 text-center">
        <h1 className="font-script text-5xl font-bold italic text-deep-red md:text-6xl">
          {t("title")}
        </h1>
        <p className="mt-3 font-body text-base text-warm-brown">
          {t("subtitle")}
        </p>
        <div className="gold-divider mx-auto mt-6 w-40">
          <span aria-hidden>◆</span>
        </div>
      </div>

      {/* Filtros de categoría (visuales por ahora) */}
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className="glass-btn px-4 py-2 text-xs uppercase tracking-wider hover:bg-deep-red hover:text-cream transition-colors"
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Grid de productos */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} locale={locale} />
        ))}
      </div>

      {PRODUCTS.length === 0 && (
        <p className="py-20 text-center font-body text-warm-brown">{t("empty")}</p>
      )}
    </div>
  );
}