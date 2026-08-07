import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { Bitcoin, Zap, Wheat, ShieldCheck, Flame } from "lucide-react";
import type { Locale } from "@/lib/i18n/routing";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations("home");

  return (
    <main className="flex flex-col">
      {/* ==========================================
          1. HERO SECTION - TEMOZONIA CARNES AHUMADAS
      ========================================== */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-dark-wood px-6 py-24 text-center">
        {/* Background Image: Iglesia de Temozón con blur */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1564594349440-203fd1496690?w=1920&q=80')",
          }}
        >
          {/* Overlay oscuro con blur para que el texto sea legible */}
          <div className="absolute inset-0 bg-dark-wood/80 backdrop-blur-[4px]" />
        </div>
        
        {/* Gradiente radial dorado sutil */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-dark-wood pointer-events-none" />
        
        {/* Contenido del Hero */}
        <div className="relative z-10 mx-auto max-w-5xl space-y-8 animate-fade-up">
          {/* Kicker */}
          <p className="font-display text-sm uppercase tracking-[0.3em] text-gold-300">
            {t("heroKicker")}
          </p>
          
          {/* Título principal - Temozonia Carnes Ahumadas */}
          <h1 className="font-script text-6xl font-bold italic text-cream md:text-8xl lg:text-9xl leading-[0.9]">
            {t("heroTitle")}
          </h1>
          
          {/* Subtítulo con énfasis en 100% artesanal */}
          <p className="mx-auto max-w-3xl font-body text-lg leading-relaxed text-cream/90 md:text-xl">
            {t("heroSubtitle")}
          </p>

          {/* Divider dorado */}
          <div className="gold-divider mx-auto w-40 pt-4">
            <span aria-hidden className="text-gold">◆</span>
          </div>

          {/* Productos destacados */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <span className="glass-btn-dark px-4 py-2 text-xs">
              <Flame size={16} className="text-gold mr-2 inline" />
              {t("products.meat")}
            </span>
            <span className="glass-btn-dark px-4 py-2 text-xs">
              <Flame size={16} className="text-gold mr-2 inline" />
              {t("products.sausage")}
            </span>
            <span className="glass-btn-dark px-4 py-2 text-xs">
              <Flame size={16} className="text-gold mr-2 inline" />
              {t("products.ribs")}
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row">
            <Link href={`/${locale}/menu`} className="btn-heritage w-full sm:w-auto">
              {t("ctaCatalog")}
            </Link>
            <Link href={`/${locale}/checkout`} className="glass-btn-dark w-full sm:w-auto">
              <Bitcoin size={18} className="text-gold" aria-hidden />
              {t("ctaBitcoin")}
            </Link>
          </div>
          
          {/* Texto de ubicación */}
          <p className="pt-6 font-display text-xs uppercase tracking-widest text-cream/60">
            {t("heroLocation")}
          </p>
        </div>
      </section>

      {/* ==========================================
          2. VALUE PROPOSITION (FEATURES)
      ========================================== */}
      <section className="bg-parchment py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center font-display text-3xl font-bold text-dark-wood md:text-4xl">
            {t("features.title")}
          </h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1: 100% Artesanal */}
            <div className="rounded-2xl border-2 border-gold/30 bg-cream p-8 text-center shadow-sm transition-transform hover:-translate-y-2">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-deep-red/20 bg-deep-red/5">
                <Wheat size={32} className="text-deep-red" />
              </div>
              <h3 className="mb-3 font-display text-xl font-bold text-dark-wood">{t("features.artisanal.title")}</h3>
              <p className="font-body text-sm leading-relaxed text-warm-brown">
                {t("features.artisanal.desc")}
              </p>
            </div>

            {/* Feature 2: Tradición */}
            <div className="liquid-glass p-8 text-center text-cream transition-transform hover:-translate-y-2">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
                <Flame size={32} className="text-gold" />
              </div>
              <h3 className="mb-3 font-display text-xl font-bold text-gold">{t("features.tradition.title")}</h3>
              <p className="font-body text-sm leading-relaxed text-cream/80">
                {t("features.tradition.desc")}
              </p>
            </div>

            {/* Feature 3: Mayoreo y Menudeo */}
            <div className="rounded-2xl border-2 border-gold/30 bg-cream p-8 text-center shadow-sm transition-transform hover:-translate-y-2">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-deep-red/20 bg-deep-red/5">
                <ShieldCheck size={32} className="text-deep-red" />
              </div>
              <h3 className="mb-3 font-display text-xl font-bold text-dark-wood">{t("features.wholesale.title")}</h3>
              <p className="font-body text-sm leading-relaxed text-warm-brown">
                {t("features.wholesale.desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. BITCOIN BANNER (Liquid Glass Dark)
      ========================================== */}
      <section className="relative overflow-hidden bg-dark-wood py-16 px-6">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-deep-red/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <Bitcoin size={48} className="mx-auto mb-6 text-gold" />
          <h2 className="mb-6 font-display text-4xl font-bold text-cream md:text-5xl">
            {t("bitcoinBanner.title")}
          </h2>
          <p className="mb-10 font-body text-lg leading-relaxed text-cream/70">
            {t("bitcoinBanner.desc")}
          </p>
          <button className="glass-btn-dark px-8 py-4 text-base">
            {t("bitcoinBanner.cta")}
          </button>
        </div>
      </section>
    </main>
  );
}