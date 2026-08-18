"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Zap } from "lucide-react";
import partnersData from "@/data/bitcoin-partners.json";

interface Partner {
  id: string;
  name: string;
  description: string;
  website: string;
  logo: string;
  acceptsLightning: boolean;
}

const partners: Partner[] = partnersData.partners;

export function BitcoinPartnersMarquee() {
  const t = useTranslations("partners");

  return (
    <section
      aria-label={t("ariaLabel")}
      className="relative overflow-hidden bg-parchment py-16"
    >
      {/* Título de la sección */}
      <div className="mx-auto max-w-7xl px-4 text-center">
        <h2 className="font-script text-4xl text-dark-wood md:text-5xl">
          {t("marqueeTitle")}
        </h2>
        <p className="mt-3 font-body text-warm-brown">
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
          {[...partners, ...partners].map((partner, index) => (
            <a
              key={`${partner.id}-${index}`}
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass group flex min-w-[280px] flex-col items-center gap-4 rounded-xl border border-gold/30 bg-cream p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-gold hover:shadow-xl"
              aria-label={`${partner.name} - ${partner.description}`}
            >
              {/* ✅ CORREGIDO: Ahora sí se renderiza el logo SVG */}
              <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-gold/40">
                <Image
                  src={partner.logo}
                  alt={`Logo de ${partner.name}`}
                  fill
                  className="object-contain p-2"
                  sizes="64px"
                />
              </div>

              <h3 className="font-display text-lg font-bold text-dark-wood">
                {partner.name}
              </h3>

              <p className="text-center font-body text-sm text-warm-brown">
                {partner.description}
              </p>

              {/* Badge de Lightning si aplica */}
              {partner.acceptsLightning && (
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-gold-500 to-gold px-3 py-1 text-xs font-bold text-dark-wood">
                  <Zap className="h-3 w-3" aria-hidden="true" />
                  Lightning
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
