import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Flame,
  Leaf,
  Hourglass,
  MapPin,
  Phone,
  Navigation,
  Clock,
  MessageCircle,
} from "lucide-react";
import { BRANCHES, getWhatsAppLink } from "@/lib/constants";
import type { Locale } from "@/lib/i18n/routing";

interface AboutPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
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

const PILLARS = [
  { id: "lena", icon: Flame },
  { id: "especias", icon: Leaf },
  { id: "paciencia", icon: Hourglass },
] as const;

const SPECIALTIES = ["carne", "costilla", "longanizaEspecial", "longanizaNegra"] as const;

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const t = await getTranslations("about");

  return (
    <div className="relative min-h-screen bg-cream">
      {/* Textura de papel sutil (Design System 3.3) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ══════════ HERO (estética nueva) ══════════ */}
      <section className="relative flex min-h-[55vh] items-center justify-center overflow-hidden bg-dark-wood px-6 py-14 text-center">
        <Image
          src="/images/about/hero-temozonia.jpg"
          alt={t("heroAlt")}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-wood/80 via-dark-wood/55 to-dark-wood" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,_rgba(245,158,11,0.22),_transparent_60%)]" />

        {/* Humo + brasas del ahumador */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="smoke left-[15%] top-[10%] h-56 w-56" />
          <div className="smoke right-[12%] top-[18%] h-72 w-72" style={{ animationDelay: "3s" }} />
          <span className="ember left-[14%] top-[26%]" />
          <span className="ember left-[30%] top-[16%]" style={{ animationDelay: "1.2s" }} />
          <span className="ember left-[52%] top-[12%]" style={{ animationDelay: "2.4s" }} />
          <span className="ember left-[70%] top-[20%]" style={{ animationDelay: "0.8s" }} />
          <span className="ember left-[86%] top-[28%]" style={{ animationDelay: "1.8s" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl animate-fade-up space-y-5">
          {/* Sello heritage */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-dark-wood/60 px-5 py-2 font-display text-[11px] font-bold uppercase tracking-[0.22em] text-gold-300 backdrop-blur-sm">
              <Flame size={14} className="text-brand-500" aria-hidden />
              {t("heroBadge")}
            </span>
          </div>

          <p className="font-display text-sm uppercase tracking-[0.3em] text-gold-300">
            {t("heroKicker")}
          </p>

          <h1 className="font-script text-6xl font-bold italic leading-[0.95] text-cream drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] md:text-8xl">
            {t("heroTitle")}
          </h1>

          <p className="mx-auto max-w-2xl font-body text-lg leading-relaxed text-cream/90 drop-shadow-md md:text-xl">
            {t("heroSubtitle")}
          </p>

          <div className="gold-divider mx-auto w-40">
            <span aria-hidden className="text-gold">◆</span>
          </div>
        </div>
      </section>

      {/* ══════════ PILARES: Leña, Especias, Paciencia ══════════ */}
      <section className="relative mx-auto max-w-7xl px-4 py-16">
        <div className="text-center">
          <span className="font-display text-xs font-bold uppercase tracking-[0.3em] text-warm-brown">
            {t("pillarsEyebrow")}
          </span>
          <h2 className="mt-3 font-script text-4xl text-dark-wood md:text-5xl">
            {t("pillarsTitle")}
          </h2>
          <div className="mx-auto mt-6 flex items-center justify-center gap-3">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-gold" aria-hidden="true">◆</span>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold" />
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PILLARS.map(({ id, icon: Icon }) => (
            <div
              key={id}
              className="liquid-glass group rounded-xl border border-gold/30 bg-parchment p-8 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-gold hover:shadow-xl"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold/50 bg-cream shadow-md transition-transform group-hover:scale-110">
                <Icon className="h-7 w-7 text-deep-red" aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-dark-wood">
                {t(`pillars.${id}.title`)}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-warm-brown">
                {t(`pillars.${id}.description`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ ESPECIALIDADES ══════════ */}
      <section className="relative bg-parchment py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <span className="font-display text-xs font-bold uppercase tracking-[0.3em] text-warm-brown">
              {t("specialtiesEyebrow")}
            </span>
            <h2 className="mt-3 font-script text-4xl text-dark-wood md:text-5xl">
              {t("specialtiesTitle")}
            </h2>
            <div className="mx-auto mt-6 flex items-center justify-center gap-3">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold" />
              <span className="text-gold" aria-hidden="true">◆</span>
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold" />
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {SPECIALTIES.map((id) => (
              <article
                key={id}
                className="group relative rounded-2xl border-2 border-deep-red bg-cream p-7 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                {/* Doble borde heritage (Design System 4.2) */}
                <div className="pointer-events-none absolute inset-2 rounded-xl border border-gold" aria-hidden="true" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span className="text-gold" aria-hidden="true">◆</span>
                    <h3 className="font-display text-xl font-bold text-dark-wood transition-colors group-hover:text-deep-red">
                      {t(`specialties.${id}.name`)}
                    </h3>
                  </div>
                  <p className="mt-3 font-body text-sm leading-relaxed text-warm-brown">
                    {t(`specialties.${id}.description`)}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Servicio de ahumado — banner heritage */}
          <div className="relative mt-8 overflow-hidden rounded-2xl border-2 border-gold bg-gradient-to-r from-deep-red to-brand-900 p-8 text-center shadow-xl md:p-10">
            <div className="pointer-events-none absolute inset-2 rounded-xl border border-gold/50" aria-hidden="true" />
            <span className="relative inline-block bg-gradient-to-r from-gold-500 to-gold px-4 py-1 font-display text-[11px] font-bold uppercase tracking-wide text-dark-wood [clip-path:polygon(0_0,100%_0,92%_50%,100%_100%,0_100%)]">
              {t("serviceBadge")}
            </span>
            <h3 className="relative mt-4 font-script text-3xl italic text-cream">
              {t("specialties.servicio.name")}
            </h3>
            <p className="relative mx-auto mt-3 max-w-2xl font-body text-cream/85">
              {t("specialties.servicio.description")}
            </p>
          </div>
        </div>
      </section>

      {/* ══════════ CITA: Yucatán es nuestro hogar ══════════ */}
      <section className="relative overflow-hidden bg-dark-wood py-16 text-center">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="smoke left-[20%] top-[15%] h-64 w-64" />
          <div className="smoke right-[18%] top-[20%] h-72 w-72" style={{ animationDelay: "4s" }} />
        </div>
        <div className="relative mx-auto max-w-3xl px-4">
          <span className="font-script text-6xl text-gold" aria-hidden="true">
            “
          </span>
          <p className="font-script text-3xl italic text-cream md:text-4xl">{t("homeQuote")}</p>
          <p className="mt-4 font-body leading-relaxed text-cream/75">{t("homeQuoteText")}</p>
        </div>
      </section>

      {/* ══════════ SUCURSALES (2 botones) ══════════ */}
      <section className="relative mx-auto max-w-7xl px-4 py-16">
        <div className="text-center">
          <span className="font-display text-xs font-bold uppercase tracking-[0.3em] text-warm-brown">
            {t("branchesEyebrow")}
          </span>
          <h2 className="mt-3 font-script text-4xl text-dark-wood md:text-5xl">
            {t("branchesTitle")}
          </h2>
          <div className="mx-auto mt-6 flex items-center justify-center gap-3">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-gold" aria-hidden="true">◆</span>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold" />
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {BRANCHES.map((branch) => (
            <div
              key={branch.id}
              className="group relative rounded-2xl border-2 border-deep-red bg-cream p-7 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="pointer-events-none absolute inset-2 rounded-xl border border-gold" aria-hidden="true" />
              <div className="relative space-y-4">
                <h3 className="font-script text-2xl font-bold italic text-dark-wood">
                  {branch.locality}
                </h3>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-deep-red" aria-hidden="true" />
                  <p className="font-body text-sm text-warm-brown">{branch.address}</p>
                </div>

                <a href={`tel:${branch.phoneRaw}`} className="group/phone flex items-center gap-3">
                  <Phone className="h-5 w-5 flex-shrink-0 text-deep-red" aria-hidden="true" />
                  <span className="font-body text-sm font-semibold text-dark-wood transition-colors group-hover/phone:text-deep-red">
                    {t("callToOrder")} {branch.phoneDisplay}
                  </span>
                </a>

                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-deep-red" aria-hidden="true" />
                  <p className="font-body text-sm text-warm-brown">{t(`schedule.${branch.id}`)}</p>
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${branch.mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-heritage flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 font-display text-xs font-bold uppercase tracking-widest"
                >
                  <Navigation size={14} aria-hidden="true" />
                  {t("getDirections")}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ CTA FINAL ══════════ */}
      <section className="relative bg-deep-red py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-cream md:text-4xl">
            {t("ctaTitle")}
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={`/${locale}/menu`}
              className="btn-heritage inline-flex items-center gap-2 px-8 py-4 font-display font-bold"
            >
              {t("ctaCatalog")}
            </Link>
            <a
              href={getWhatsAppLink(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn inline-flex items-center gap-2 px-8 py-4 font-display font-bold text-dark-wood"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              {t("ctaWhatsApp")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}