"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface PromoCardProps {
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

export default function SeasonalPromoCard({ title, subtitle, image, ctaText, ctaLink }: PromoCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-deep-red bg-parchment transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover">
      {/* Borde interior dorado decorativo */}
      <div className="pointer-events-none absolute inset-1.5 rounded-xl border border-gold/60 z-10" />

      {/* Imagen de la promo */}
      <div className="relative h-64 w-full overflow-hidden bg-dark-wood/10">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        {/* Overlay sutil para asegurar legibilidad si el texto se superpusiera, aunque aquí va abajo */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-wood/40 to-transparent" />
      </div>

      {/* Contenido */}
      <div className="relative z-20 flex flex-1 flex-col justify-between p-6 md:p-8">
        <div className="space-y-3">
          <h3 className="font-script text-3xl font-bold italic text-deep-red md:text-4xl">
            {title}
          </h3>
          <p className="font-body text-sm leading-relaxed text-warm-brown">
            {subtitle}
          </p>
        </div>

        <Link 
          href={ctaLink} 
          className="btn-heritage mt-6 w-full justify-center gap-2"
        >
          {ctaText}
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
