import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { Bitcoin, Landmark, Flame, ChevronDown } from "lucide-react";

export async function Hero({ locale }: { locale: string }) {
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <section className="relative flex min-h-[72vh] items-center justify-center overflow-hidden bg-dark-wood px-6 py-14 text-center md:min-h-[78vh] md:py-16">
      {/* 1. Background Image: Iglesia Colonial cálida */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-dark-wood/80 via-dark-wood/55 to-dark-wood" />
      </div>

      {/* 2. Efecto de Luz Cálida (Sol de la tarde) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,_rgba(245,158,11,0.22),_transparent_60%)]" />

      {/* 3. NUEVO: Humo + brasas que dan vida al espacio superior */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="smoke left-[15%] top-[8%] h-56 w-56" />
        <div className="smoke right-[12%] top-[16%] h-72 w-72" style={{ animationDelay: "3s" }} />
        <span className="ember left-[12%] top-[24%]" />
        <span className="ember left-[26%] top-[14%]" style={{ animationDelay: "1.2s" }} />
        <span className="ember left-[48%] top-[10%]" style={{ animationDelay: "2.4s" }} />
        <span className="ember left-[68%] top-[18%]" style={{ animationDelay: "0.8s" }} />
        <span className="ember left-[84%] top-[26%]" style={{ animationDelay: "1.8s" }} />
      </div>

      {/* Contenido del Hero */}
      <div className="relative z-10 mx-auto max-w-5xl animate-fade-up space-y-5 md:space-y-6">
        {/* NUEVO: Sello heritage — aprovecha el espacio superior con identidad */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-dark-wood/60 px-5 py-2 font-display text-[11px] font-bold uppercase tracking-[0.22em] text-gold-300 backdrop-blur-sm md:text-xs">
            <Flame size={14} className="text-brand-500" aria-hidden />
            {t("heroBadge")}
          </span>
        </div>

        {/* Kicker */}
        <p className="font-display text-sm uppercase tracking-[0.3em] text-gold-300">
          {t("heroKicker")}
        </p>

        {/* Título principal */}
        <h1 className="font-script text-5xl font-bold italic leading-[0.95] text-cream drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] md:text-7xl lg:text-8xl">
          {t("heroTitle")}
        </h1>

        {/* Subtítulo */}
        <p className="mx-auto max-w-3xl font-body text-base leading-relaxed text-cream/90 drop-shadow-md md:text-xl">
          {t("heroSubtitle")}
        </p>

        {/* Divider dorado */}
        <div className="gold-divider mx-auto w-40">
          <span aria-hidden className="text-gold">◆</span>
        </div>

        {/* CTA Principal */}
        <div>
          <Link href={`/${locale}/menu`} className="btn-heritage px-12 py-4 text-lg">
            {t("ctaCatalog")}
          </Link>
        </div>

        {/* Métodos de pago (Liquid Glass) */}
        <div className="flex flex-col items-center justify-center gap-3">
          <p className="font-display text-xs uppercase tracking-widest text-cream/60">
            {t("heroPayments")}
          </p>

          <div className="glass-btn-dark flex flex-wrap items-center justify-center gap-3 rounded-full px-5 py-3">
            <span className="font-body text-xs font-semibold text-cream/80">Visa</span>
            <span className="h-4 w-px bg-cream/20" aria-hidden />
            <span className="font-body text-xs font-semibold text-cream/80">Mastercard</span>
            <span className="h-4 w-px bg-cream/20" aria-hidden />
            <span className="flex items-center gap-1.5 font-body text-xs font-semibold text-cream/80">
              <Landmark size={14} aria-hidden />
              {t("heroTransfer")}
            </span>
            <span className="h-4 w-px bg-cream/20" aria-hidden />
            <div className="flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1">
              <Bitcoin size={16} className="text-gold-300" aria-hidden />
              <span className="font-body text-xs font-bold text-gold-300">Bitcoin</span>
            </div>
          </div>
        </div>

        {/* Ubicación + indicador de scroll */}
        <div className="flex flex-col items-center gap-1.5 pt-1">
          <p className="font-display text-[11px] uppercase tracking-widest text-cream/60">
            {t("heroLocation")}
          </p>
          <ChevronDown className="h-5 w-5 animate-bounce text-gold/70" aria-hidden />
        </div>
      </div>
    </section>
  );
}