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
      const scrollAmount = current.clientWidth;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-cream py-20 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header de la sección */}
        <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <h2 className="font-script text-5xl font-bold italic text-deep-red md:text-6xl">
              {t("title")}
            </h2>
            <p className="mt-2 font-body text-base text-warm-brown">
              {t("subtitle")}
            </p>
          </div>
          
          {/* Controles de navegación (solo desktop/tablet) */}
          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="glass-btn p-3 hover:bg-deep-red hover:text-cream transition-colors"
              aria-label="Promoción anterior"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="glass-btn p-3 hover:bg-deep-red hover:text-cream transition-colors"
              aria-label="Siguiente promoción"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Carrusel con CSS Scroll Snap */}
        <div
          ref={scrollContainerRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {activePromos.map((promo) => (
            <div
              key={promo.id}
              className="snap-center shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
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
    </section>
  );
}
