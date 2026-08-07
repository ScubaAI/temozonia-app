import { setRequestLocale, getTranslations } from "next-intl/server";
import { PRODUCTS } from "@/lib/constants";

export default async function MenuPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("menu");

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-12 text-center">
        <h1 className="font-script text-5xl font-bold italic text-deep-red md:text-6xl">
          {t("title")}
        </h1>
        <p className="mt-3 font-body text-base text-warm-brown">{t("subtitle")}</p>
        <div className="gold-divider mx-auto mt-6 w-40"><span aria-hidden>◆</span></div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((product) => (
          <article key={product.id} className="product-card-heritage p-6">
            <div className="mb-4 h-40 rounded-lg bg-parchment" />
            <h3 className="font-display text-2xl font-bold text-dark-wood">{product.name}</h3>
            <p className="mt-1 font-body text-sm text-warm-brown">{product.description}</p>
            <p className="mt-3 font-display text-lg font-bold text-deep-red">
              {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(product.price / 100)}
            </p>
            <button className="glass-btn-dark mt-4 w-full justify-center">
              Agregar al carrito
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}