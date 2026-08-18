import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { BUSINESS, getWhatsAppLink } from "@/lib/constants";
import type { Locale } from "@/lib/i18n/routing";

interface AboutPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      type: "website",
      locale: locale === "es" ? "es_MX" : "en_US",
    },
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const t = await getTranslations("about");
  const tCommon = await getTranslations("common");

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src="/images/about/hero-temozonia.jpg"
          alt="Temozonia Carnes Ahumadas - Tradición Yucateca"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-wood/60 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="font-display text-6xl font-black text-cream md:text-7xl">
            {t("heroTitle")}
          </h1>
        </div>
      </section>

      {/* Historic Temples Section */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="text-center">
          <h2 className="font-script text-5xl text-dark-wood md:text-6xl">
            {t("historicTemples")}
          </h2>
          
          {/* Divisor dorado con diamante */}
          <div className="mx-auto mt-6 flex items-center justify-center gap-3">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-gold" aria-hidden="true">◆</span>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold" />
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Ek Balam Card */}
          <div className="liquid-glass overflow-hidden rounded-xl border border-gold/30 bg-parchment shadow-lg">
            <div className="relative h-64">
              <Image
                src="/images/about/ek-balam.jpg"
                alt={t("ekBalam")}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="font-display text-2xl font-bold text-dark-wood">
                {t("ekBalam")}
              </h3>
              <p className="mt-3 font-body text-warm-brown leading-relaxed">
                {t("ekBalamDescription")}
              </p>
            </div>
          </div>

          {/* Additional content card */}
          <div className="liquid-glass overflow-hidden rounded-xl border border-gold/30 bg-parchment shadow-lg">
            <div className="relative h-64">
              <Image
                src="/images/about/tradition.jpg"
                alt={t("traditionTitle")}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="font-display text-2xl font-bold text-dark-wood">
                {t("traditionTitle")}
              </h3>
              <p className="mt-3 font-body text-warm-brown leading-relaxed">
                {t("traditionDescription")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Us CTA Section */}
      <section className="bg-deep-red py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-display text-4xl font-bold text-cream md:text-5xl">
            {t("visitTemozon")}
          </h2>
          <p className="mt-4 font-body text-cream/90 text-lg">
            {t("visitTemozonSubtitle")}
          </p>

          {/* Contact Info */}
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={getWhatsAppLink(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-heritage inline-flex items-center gap-2 px-8 py-4 font-display font-bold text-cream"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              {BUSINESS.phone.display}
            </a>
            <a
              href={`mailto:${BUSINESS.email}`}
              className="glass-btn inline-flex items-center gap-2 px-8 py-4 font-display font-bold text-dark-wood"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
              {BUSINESS.email}
            </a>
          </div>

          {/* Location */}
          <div className="mt-8 flex items-center justify-center gap-2 text-cream/80">
            <MapPin className="h-5 w-5" aria-hidden="true" />
            <span className="font-body">
              {BUSINESS.address.city}, {BUSINESS.address.state}, {BUSINESS.address.country}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
