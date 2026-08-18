import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { BUSINESS, getWhatsAppLink } from "@/lib/constants";
import type { Locale } from "@/lib/i18n/routing";

interface ContactPageProps {
  params: Promise<{ locale: Locale }>;
}

// ✅ SEO METADATA
export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

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

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const t = await getTranslations("contact");
  const tCommon = await getTranslations("common");

  return (
    <div className="min-h-screen bg-cream py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="text-center">
          <h1 className="font-display text-5xl font-black text-dark-wood md:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-4 font-body text-lg text-warm-brown">
            {t("subtitle")}
          </p>

          {/* Divisor dorado */}
          <div className="mx-auto mt-6 flex items-center justify-center gap-3">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-gold" aria-hidden="true">◆</span>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold" />
          </div>
        </div>

        {/* Contact Cards Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* WhatsApp Card */}
          <a
            href={getWhatsAppLink(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass group rounded-xl border border-gold/30 bg-parchment p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-gold hover:shadow-xl"
          >
            <MessageCircle className="h-10 w-10 text-deep-red transition-transform group-hover:scale-110" aria-hidden="true" />
            <h3 className="mt-4 font-display text-lg font-bold text-dark-wood">
              {t("whatsappTitle")}
            </h3>
            <p className="mt-2 font-body text-sm text-warm-brown">
              {BUSINESS.phone.display}
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-xs text-gold">
              <Clock className="h-3 w-3" aria-hidden="true" />
              {tCommon("whatsapp.responseBadge")}
            </p>
          </a>

          {/* Email Card */}
          <a
            href={`mailto:${BUSINESS.email}`}
            className="liquid-glass group rounded-xl border border-gold/30 bg-parchment p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-gold hover:shadow-xl"
          >
            <Mail className="h-10 w-10 text-deep-red transition-transform group-hover:scale-110" aria-hidden="true" />
            <h3 className="mt-4 font-display text-lg font-bold text-dark-wood">
              {t("emailTitle")}
            </h3>
            <p className="mt-2 font-body text-sm text-warm-brown break-all">
              {BUSINESS.email}
            </p>
          </a>

          {/* Phone Card */}
          <a
            href={`tel:+${BUSINESS.phone.raw}`}
            className="liquid-glass group rounded-xl border border-gold/30 bg-parchment p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-gold hover:shadow-xl"
          >
            <Phone className="h-10 w-10 text-deep-red transition-transform group-hover:scale-110" aria-hidden="true" />
            <h3 className="mt-4 font-display text-lg font-bold text-dark-wood">
              {t("phoneTitle")}
            </h3>
            <p className="mt-2 font-body text-sm text-warm-brown">
              {BUSINESS.phone.display}
            </p>
          </a>

          {/* Location Card */}
          <div className="liquid-glass rounded-xl border border-gold/30 bg-parchment p-6 shadow-md">
            <MapPin className="h-10 w-10 text-deep-red" aria-hidden="true" />
            <h3 className="mt-4 font-display text-lg font-bold text-dark-wood">
              {t("locationTitle")}
            </h3>
            <p className="mt-2 font-body text-sm text-warm-brown">
              {BUSINESS.address.city}, {BUSINESS.address.state}
            </p>
            <p className="font-body text-sm text-warm-brown">
              {BUSINESS.address.country}
            </p>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 overflow-hidden rounded-xl border border-gold/30 shadow-lg">
          <iframe
            title={t("mapTitle")}
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${BUSINESS.coordinates.lat},${BUSINESS.coordinates.lng}&zoom=15`}
            className="h-96 w-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Business Hours */}
        <div className="mt-12 text-center">
          <h2 className="font-display text-2xl font-bold text-dark-wood">
            {t("hoursTitle")}
          </h2>
          <div className="mt-4 space-y-2 font-body text-warm-brown">
            <p>{t("hoursWeekdays")}</p>
            <p>{t("hoursWeekends")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
