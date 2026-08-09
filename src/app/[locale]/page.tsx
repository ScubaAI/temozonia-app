import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/features/landing/Hero";
import { WhatsAppCTA } from "@/components/features/landing/WhatsAppCTA";
import SeasonalPromoCarousel from "@/components/features/promo/SeasonalPromoCarousel";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-col">
      {/* 1. Hero Section */}
      <Hero locale={locale} />

      {/* 2. WhatsApp CTA - Contacto Inmediato */}
      <WhatsAppCTA locale={locale} />

      {/* 3. Seasonal Promos Carousel */}
      <SeasonalPromoCarousel />
    </main>
  );
}