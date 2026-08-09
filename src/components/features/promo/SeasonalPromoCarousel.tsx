"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import SeasonalPromoCard from "./SeasonalPromoCard";
import promosData from "@/data/seasonal-promos.json";

export default function SeasonalPromoCarousel() {
  const t = useTranslations("promos");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filtrar solo las promos activas
  const activePromos = promosData.filter((promo) => promo.active);

  if (activePromos.length === 0) return null;

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      // Scroll un poco menos del 100% para dejar ver un fragmento de la siguiente tarjeta
      const scrollAmount = current.clientWidth * 0.85; 
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section 
      className="relative bg-cream py-20 px-6 overflow-hidden" 
      role="region" 
      aria-label={t("ariaLabel")}
    >
      {/* Textura de papel sutil (Design System 3.3) */}
      <div 
        className="absolute inset-0 opacity-60 pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23p)' opacity='0.06'/%3E%3C/svg%3E")`,
        }} 
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Header de la sección - Diseño Centrado Premium */}
        <div className="mb-12 flex flex-col items-center justify-center gap-4 text-center">
          <p className="font-script text-2xl italic text-gold">
            {t("kicker")}
          </p>
          <h2 className="font-display text-4xl font-black text-dark-wood md:text-5xl lg:text-6xl tracking-tight">
            {t("title")}
          </h2>
          
          {/* Divider dorado centrado (Design System 3.2) */}
          <div className="gold-divider w-32 pt-2">
            <span aria-hidden className="text-gold">◆</span>
          </div>
          
          <p className="max-w-2xl font-body text-base text-warm-brown">
            {t("subtitle")}
          </p>
        </div>

        {/* Contenedor relativo para los degradados de borde */}
        <div className="relative">
          {/* Degradados suaves en los bordes (Responsivos para mejor visibilidad en desktop) */}
          <div className="absolute left-0 top-0 bottom-8 z-10 w-16 md:w-24 lg:w-32 bg-gradient-to-r from-cream to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-8 z-10 w-16 md:w-24 lg:w-32 bg-gradient-to-l from-cream to-transparent pointer-events-none" />

          {/* Carrusel con CSS Scroll Snap */}
          <div
            ref={scrollContainerRef}
            className="flex snap-x snap-mandatory gap-4 md:gap-6 overflow-x-auto pb-8 
              [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {activePromos.map((promo) => (
              <div
                key={promo.id}
                // w-[85vw] crea el efecto "peek" en móvil para invitar al swipe
                className="snap-center shrink-0 w-[85vw] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] transition-transform duration-300"
              >
                <SeasonalPromoCard
                  title={promo.title}
                  subtitle={promo.subtitle}
                  image={promo.image}
                  ctaText={promo.ctaText}
                  ctaLink={promo.ctaLink}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Controles de navegación (Debajo, alineados a la derecha en desktop) */}
        <div className="mt-8 flex justify-center md:justify-end gap-4">
          <button
            onClick={() => scroll("left")}
            className="group flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold/40 bg-parchment text-deep-red transition-all hover:bg-deep-red hover:text-cream hover:border-deep-red active:scale-95"
            aria-label={t("prevAria")}
          >
            <ChevronLeft size={24} className="transition-transform group-hover:-translate-x-0.5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="group flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold/40 bg-parchment text-deep-red transition-all hover:bg-deep-red hover:text-cream hover:border-deep-red active:scale-95"
            aria-label={t("nextAria")}
          >
            <ChevronRight size={24} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}