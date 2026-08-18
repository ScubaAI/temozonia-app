import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, MessageCircle, Navigation, Globe } from "lucide-react";
import { BUSINESS, getWhatsAppLink } from "@/lib/constants";
import type { Locale } from "@/lib/i18n/routing";

interface ContactPageProps {
  params: Promise<{ locale: Locale }>;
}

// Datos de las sucursales
const BRANCHES = [
  {
    id: "caucel",
    address: "Av. Principal Calle 23 entre 12 y 14 (Esquina)",
    locality: "Caucel Pueblo",
    phone: "999 491 8221",
    phoneRaw: "+529994918221",
    mapsQuery: "Temozonia+Carnes+Ahumadas+Caucel+Merida",
    schedule: [
      { days: "martesDomingo", hours: "10:30 am - 4:30 pm" },
    ],
  },
  {
    id: "parque",
    address: "Calle 16 entre 55 y 57 #657",
    addressHint: "Entrando al pasillo del lado derecho",
    locality: "Fraccionamiento del Parque",
    phone: "999 231 0619",
    phoneRaw: "+529992310619",
    mapsQuery: "Temozonia+Fraccionamiento+del+Parque+Merida",
    schedule: [
      { days: "martesViernes", hours: "1:00 pm - 5:30 pm" },
      { days: "sabadoDomingo", hours: "12:30 pm - 4:30 pm" },
    ],
  },
];

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
    <div className="relative min-h-screen bg-cream py-16">
      {/* Textura de papel sutil (Design System 3.3) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="text-center">
          <span className="font-display text-xs font-bold uppercase tracking-[0.3em] text-warm-brown">
            {t("eyebrow")}
          </span>
          <h1 className="mt-3 font-display text-5xl font-black text-dark-wood md:text-6xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-warm-brown">
            {t("subtitle")}
          </p>

          {/* Divisor dorado */}
          <div className="mx-auto mt-6 flex items-center justify-center gap-3">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-gold" aria-hidden="true">◆</span>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold" />
          </div>
        </div>

        {/* ══════════ SECCIÓN 1: MÉTODOS DE CONTACTO ══════════ */}
        <div className="mt-14">
          <h2 className="mb-6 text-center font-display text-sm font-bold uppercase tracking-widest text-gold">
            {t("contactMethodsTitle")}
          </h2>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {/* WhatsApp */}
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

            {/* Email */}
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

            {/* Teléfono */}
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

            {/* Redes Sociales */}
            <div className="liquid-glass rounded-xl border border-gold/30 bg-parchment p-6 shadow-md">
              <div className="flex gap-2">
                <Globe className="h-5 w-5 text-deep-red" aria-hidden="true" />
                <Globe className="h-5 w-5 text-deep-red" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-dark-wood">
                {t("socialTitle")}
              </h3>
              <div className="mt-2 space-y-1">
                <a
                  href="https://www.instagram.com/temozoniacarnesahumadas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-body text-sm text-warm-brown hover:text-deep-red transition-colors"
                >
                  @temozoniacarnesahumadas
                </a>
                <a
                  href="https://www.facebook.com/temozoniacarnesahumadas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-body text-sm text-warm-brown hover:text-deep-red transition-colors"
                >
                  /temozoniacarnesahumadas
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════ SECCIÓN 2: SUCURSALES ══════════ */}
        <div className="mt-20">
          <div className="text-center">
            <span className="font-display text-xs font-bold uppercase tracking-[0.3em] text-warm-brown">
              {t("branchesEyebrow")}
            </span>
            <h2 className="mt-3 font-script text-4xl text-dark-wood md:text-5xl">
              {t("branchesTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl font-body text-warm-brown">
              {t("branchesSubtitle")}
            </p>

            {/* Divisor dorado */}
            <div className="mx-auto mt-6 flex items-center justify-center gap-3">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold" />
              <span className="text-gold" aria-hidden="true">◆</span>
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold" />
            </div>
          </div>

          {/* Cards de sucursales */}
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {BRANCHES.map((branch, index) => (
              <div
                key={branch.id}
                className="group relative overflow-hidden rounded-2xl border-2 border-deep-red bg-cream shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                {/* Borde dorado interior (Design System 4.2: doble borde heritage) */}
                <div className="pointer-events-none absolute inset-2 rounded-xl border border-gold" aria-hidden="true" />

                {/* Header de sucursal con badge */}
                <div className="relative border-b border-dashed border-gold/40 bg-gradient-to-r from-dark-wood to-dark-wood/90 px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-500 to-gold shadow-md">
                      <span className="font-display text-sm font-black text-dark-wood">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-script text-2xl font-bold italic text-cream">
                        {t(`branches.${branch.id}.name`)}
                      </h3>
                      <p className="font-display text-[10px] font-bold uppercase tracking-widest text-gold-300">
                        {branch.locality}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contenido */}
                <div className="relative space-y-5 p-6">
                  {/* Dirección */}
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-deep-red" aria-hidden="true" />
                    <div>
                      <p className="font-body text-sm font-semibold text-dark-wood">
                        {branch.address}
                      </p>
                      {branch.addressHint && (
                        <p className="mt-0.5 font-body text-xs italic text-warm-brown">
                          {branch.addressHint}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Teléfono */}
                  <a
                    href={`tel:${branch.phoneRaw}`}
                    className="group/phone flex items-center gap-3 transition-colors"
                  >
                    <Phone className="h-5 w-5 flex-shrink-0 text-deep-red transition-transform group-hover/phone:scale-110" aria-hidden="true" />
                    <div>
                      <p className="font-body text-sm font-semibold text-dark-wood group-hover/phone:text-deep-red transition-colors">
                        {branch.phone}
                      </p>
                      <p className="font-body text-xs text-warm-brown">
                        {t("callToOrder")}
                      </p>
                    </div>
                  </a>

                  {/* Horarios */}
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-deep-red" aria-hidden="true" />
                    <div className="space-y-1">
                      {branch.schedule.map((slot) => (
                        <div key={slot.days} className="flex items-baseline gap-2">
                          <span className="font-display text-[10px] font-bold uppercase tracking-wider text-warm-brown">
                            {t(`schedule.${slot.days}`)}:
                          </span>
                          <span className="font-body text-sm text-dark-wood">
                            {slot.hours}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Botón "Cómo llegar" */}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${branch.mapsQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-heritage mt-2 flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 font-display text-xs font-bold uppercase tracking-widest"
                  >
                    <Navigation size={14} aria-hidden="true" />
                    {t("getDirections")}
                  </a>
                </div>

                {/* Mapa embebido */}
                <div className="relative h-64 w-full overflow-hidden border-t-2 border-gold/40">
                  <iframe
                    title={t(`branches.${branch.id}.mapTitle`)}
                    src={`https://www.google.com/maps?q=${branch.mapsQuery}&output=embed`}
                    className="h-full w-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════ SECCIÓN 3: PEDIDOS ESPECIALES / MAYOREO ══════════ */}
        <div className="mt-20">
          <div className="relative overflow-hidden rounded-2xl border-2 border-gold bg-parchment p-8 text-center shadow-xl md:p-12">
            {/* Decoración dorada */}
            <div className="pointer-events-none absolute inset-4 rounded-xl border border-gold/40" aria-hidden="true" />

            <div className="relative">
              <span className="font-display text-xs font-bold uppercase tracking-[0.3em] text-gold">
                {t("wholesaleEyebrow")}
              </span>
              <h2 className="mt-3 font-script text-3xl text-dark-wood md:text-4xl">
                {t("wholesaleTitle")}
              </h2>
              <p className="mx-auto mt-3 max-w-xl font-body text-warm-brown">
                {t("wholesaleSubtitle")}
              </p>
              <Link
                href={`/${locale}/wholesale`}
                className="btn-heritage mt-6 inline-flex items-center gap-2 rounded-full px-8 py-3 font-display text-sm font-bold uppercase tracking-widest"
              >
                {t("wholesaleCta")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}