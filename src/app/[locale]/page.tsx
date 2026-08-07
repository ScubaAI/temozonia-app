import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { Bitcoin, Zap, Wheat, ShieldCheck } from "lucide-react";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations("home");

  return (
    <main className="flex flex-col">
      {/* HERO SECTION */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-cream px-6 py-24 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-300/10 via-cream to-cream pointer-events-none" />
        
        <div className="relative z-10 mx-auto max-w-4xl space-y-8 animate-fade-up">
          <p className="font-display text-sm uppercase tracking-[0.2em] text-warm-brown">
            {t("heroKicker")}
          </p>
          
          <h1 className="font-script text-6xl font-bold italic text-deep-red md:text-8xl lg:text-9xl leading-[0.9]">
            {t("heroTitle")}
          </h1>
          
          <p className="mx-auto max-w-2xl font-body text-lg leading-relaxed text-warm-brown md:text-xl">
            {t("heroSubtitle")}
          </p>

          <div className="gold-divider mx-auto w-40 pt-4">
            <span aria-hidden>◆</span>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
            <Link href={`/${locale}/menu`} className="btn-heritage w-full sm:w-auto">
              {t("ctaCatalog")}
            </Link>
            <Link href={`/${locale}/checkout`} className="glass-btn-dark w-full sm:w-auto">
              <Bitcoin size={18} className="text-gold" aria-hidden />
              {t("ctaBitcoin")}
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES (Por qué Temozonia) */}
      <section className="bg-parchment py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center font-display text-3xl font-bold text-dark-wood md:text-4xl">
            {t("features.title")}
          </h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="liquid-glass p-8 text-center text-cream transition-transform hover:-translate-y-2">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
                <Zap size={32} className="text-gold" />
              </div>
              <h3 className="mb-3 font-display text-xl font-bold text-gold">{t("features.btc.title")}</h3>
              <p className="font-body text-sm leading-relaxed text-cream/80">{t("features.btc.desc")}</p>
            </div>

            <div className="rounded-2xl border border-gold/30 bg-cream p-8 text-center shadow-sm transition-transform hover:-translate-y-2">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-deep-red/20 bg-deep-red/5">
                <Wheat size={32} className="text-deep-red" />
              </div>
              <h3 className="mb-3 font-display text-xl font-bold text-dark-wood">{t("features.craft.title")}</h3>
              <p className="font-body text-sm leading-relaxed text-warm-brown">{t("features.craft.desc")}</p>
            </div>

            <div className="rounded-2xl border border-gold/30 bg-cream p-8 text-center shadow-sm transition-transform hover:-translate-y-2">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-deep-red/20 bg-deep-red/5">
                <ShieldCheck size={32} className="text-deep-red" />
              </div>
              <h3 className="mb-3 font-display text-xl font-bold text-dark-wood">{t("features.secure.title")}</h3>
              <p className="font-body text-sm leading-relaxed text-warm-brown">{t("features.secure.desc")}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}