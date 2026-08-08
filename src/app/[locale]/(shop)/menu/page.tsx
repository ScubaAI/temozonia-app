import { setRequestLocale, getTranslations } from "next-intl/server";
import { CATEGORIES, PRODUCTS } from "@/lib/constants";
import { ProductCard } from "@/components/features/product/ProductCard";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/routing";

interface MenuPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}

export default async function MenuPage({ params, searchParams }: MenuPageProps) {
  const { locale } = await params;
  const { category } = await searchParams;
  setRequestLocale(locale);
  
  const t = await getTranslations("menu");

  const filteredProducts = category
    ? PRODUCTS.filter((p) => p.category === category)
    : PRODUCTS;

  const getCategoryName = (name: string) => {
    if (locale === "en") {
      const translationMap: Record<string, string> = {
        "Miel": "Honey",
        "Vinos": "Wine",
        "Frutas": "Fruits",
        "Verduras": "Vegetables",
        "Flores": "Flowers",
        "Otros": "Others"
      };
      return translationMap[name] || name;
    }
    return name;
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-12 text-center">
        <h1 className="font-script text-5xl font-bold italic text-deep-red md:text-6xl">
          {t("title")}
        </h1>
        <p className="mt-3 font-body text-base text-warm-brown">{t("subtitle")}</p>
        <div className="gold-divider mx-auto mt-6 w-40"><span aria-hidden>◆</span></div>
      </div>

      {/* Barra de Filtros de Categorías */}
      <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
        <Link
          href={`/${locale}/menu`}
          className={`rounded-full px-5 py-2 text-sm font-display transition-all ${
            !category
              ? "btn-heritage"
              : "border border-gold/30 bg-parchment hover:border-gold/60 text-dark-wood"
          }`}
        >
          {locale === "es" ? "Todos" : "All"}
        </Link>
        {CATEGORIES.map((cat) => {
          const isActive = category === cat.slug;
          return (
            <Link
              key={cat.id}
              href={`/${locale}/menu?category=${cat.slug}`}
              className={`rounded-full px-5 py-2 text-sm font-display transition-all ${
                isActive
                  ? "btn-heritage"
                  : "border border-gold/30 bg-parchment hover:border-gold/60 text-dark-wood"
              }`}
            >
              {getCategoryName(cat.name)}
            </Link>
          );
        })}
      </div>

      {/* Listado de Productos */}
      {filteredProducts.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-body text-lg text-warm-brown/80">{t("empty")}</p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              locale={locale as Locale} 
            />
          ))}
        </div>
      )}
    </div>
  );
}