"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, ArrowRight } from "lucide-react";

interface Recipe {
  id: string;
  image: string;
  time: string;
  featured: boolean;
}

// Recetas típicas de Yucatán que usan los productos Temozonia
const RECIPES: Recipe[] = [
  { id: "cochinita", image: "/images/recipes/cochinita.jpg", time: "4h", featured: true },
  { id: "panuchos", image: "/images/recipes/panuchos.jpg", time: "45m", featured: false },
  { id: "tacos", image: "/images/recipes/tacos-longaniza.jpg", time: "20m", featured: true },
  { id: "salbutes", image: "/images/recipes/salbutes.jpg", time: "30m", featured: false },
  { id: "relleno", image: "/images/recipes/relleno-blanco.jpg", time: "3h", featured: false },
  { id: "queso", image: "/images/recipes/queso-relleno.jpg", time: "1h", featured: true },
];

/**
 * NOTA: Se mantiene el nombre `BitcoinPartnersMarquee` para no romper importaciones existentes.
 * Ahora muestra recetas típicas de la región que usan nuestros productos,
 * y funciona como teaser con enlace a la página de recetas (/recipes).
 */
export function BitcoinPartnersMarquee() {
  const t = useTranslations("recipes");
  const locale = useLocale();
  const recipesUrl = `/${locale}/recipes`;

  return (
    <section
      aria-label={t("ariaLabel")}
      className="relative overflow-hidden bg-parchment py-16"
    >
      {/* Textura de papel sutil (Design System 3.3) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Título de la sección */}
      <div className="relative mx-auto max-w-7xl px-4 text-center">
        <span className="font-display text-xs font-bold uppercase tracking-[0.28em] text-warm-brown">
          {t("eyebrow")}
        </span>
        <h2 className="mt-2 font-script text-4xl text-dark-wood md:text-5xl">
          {t("marqueeTitle")}
        </h2>
        <p className="mx-auto mt-3 max-w-xl font-body text-warm-brown">
          {t("marqueeDescription")}
        </p>

        {/* Divisor dorado con diamante (regla del design system) */}
        <div className="mx-auto mt-6 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
          <span className="text-gold" aria-hidden="true">◆</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
        </div>
      </div>

      {/* Marquee animado */}
      <div className="relative mt-12">
        {/* Máscaras de desvanecido en los bordes */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-parchment to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-parchment to-transparent" />

        <div className="animate-marquee flex gap-8">
          {/* Duplicamos la lista para lograr el loop infinito */}
          {[...RECIPES, ...RECIPES].map((recipe, index) => (
            <Link
              key={`${recipe.id}-${index}`}
              href={recipesUrl}
              className="group flex min-w-[280px] flex-col overflow-hidden rounded-xl border-2 border-deep-red bg-cream shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-gold hover:shadow-xl"
              aria-label={`${t(`items.${recipe.id}.name`)} — ${t("usesProduct")} ${t(`items.${recipe.id}.product`)}`}
            >
              {/* Imagen de la receta */}
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={recipe.image}
                  alt={t(`items.${recipe.id}.name`)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="280px"
                  loading="lazy"
                />
                {/* Badge "Destacada" */}
                {recipe.featured && (
                  <span className="absolute left-0 top-4 bg-gradient-to-r from-gold-500 to-gold px-4 py-1 font-display text-[11px] font-bold uppercase tracking-wide text-dark-wood shadow-md [clip-path:polygon(0_0,100%_0,92%_50%,100%_100%,0_100%)]">
                    {t("badgeFeatured")}
                  </span>
                )}
              </div>

              {/* Contenido */}
              <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="font-display text-lg font-bold text-dark-wood transition-colors group-hover:text-deep-red">
                  {t(`items.${recipe.id}.name`)}
                </h3>

                {/* Producto Temozonia que usa la receta */}
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4 flex-shrink-0 text-brand-600" aria-hidden="true" />
                  <span className="font-body text-xs text-warm-brown">
                    {t("usesProduct")}{" "}
                    <strong className="text-deep-red">{t(`items.${recipe.id}.product`)}</strong>
                  </span>
                </div>

                {/* Tiempo + CTA */}
                <div className="mt-auto flex items-center justify-between border-t border-dashed border-gold/40 pt-3">
                  <span className="flex items-center gap-1.5 font-body text-xs text-warm-brown">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {recipe.time}
                  </span>
                  <span className="flex items-center gap-1 font-display text-xs font-bold uppercase tracking-wider text-deep-red transition-transform group-hover:translate-x-1">
                    {t("cardCta")}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA central hacia la página de recetas */}
      <div className="relative mt-12 text-center">
        <Link
          href={recipesUrl}
          className="btn-heritage inline-flex items-center gap-3 rounded-full px-8 py-3.5 font-display text-sm font-bold uppercase tracking-wider"
        >
          {t("cta")}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}