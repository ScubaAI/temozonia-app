import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { Flame, Users, Award, MapPin, Clock, ChevronRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/routing";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations("about");

  return (
    <main className="flex flex-col">
      {/* ==========================================
          1. HERO SECTION - Historia de Temozón
      ========================================== */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-dark-wood px-6 py-24 text-center">
        {/* Background: Iglesia de Temozón */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1564594349440-203fd1496690?w=1920&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-dark-wood/85 backdrop-blur-[3px]" />
        </div>
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-dark-wood pointer-events-none" />
        
        <div className="relative z-10 mx-auto max-w-4xl space-y-8 animate-fade-up">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-gold-300">
            {t("hero.kicker")}
          </p>
          
          <h1 className="font-script text-6xl font-bold italic text-cream md:text-8xl leading-[0.9]">
            {t("hero.title")}
          </h1>
          
          <p className="mx-auto max-w-3xl font-body text-lg leading-relaxed text-cream/90 md:text-xl">
            {t("hero.subtitle")}
          </p>

          <div className="gold-divider mx-auto w-40 pt-4">
            <span aria-hidden className="text-gold">◆</span>
          </div>
        </div>
      </section>

      {/* ==========================================
          2. HISTORIA - Tres Secciones
      ========================================== */}
      <section className="bg-cream py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-16 text-center font-display text-4xl font-bold text-dark-wood md:text-5xl">
            {t("history.title")}
          </h2>

          <div className="grid gap-12 md:grid-cols-3">
            {/* Sección 1: El Origen */}
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold bg-gold/10">
                <Clock size={36} className="text-deep-red" />
              </div>
              <h3 className="font-display text-xl font-bold text-deep-red">
                {t("history.section1.subtitle")}
              </h3>
              <p className="font-body text-sm leading-relaxed text-warm-brown">
                {t("history.section1.text")}
              </p>
            </div>

            {/* Sección 2: Tradición Familiar */}
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold bg-gold/10">
                <Users size={36} className="text-deep-red" />
              </div>
              <h3 className="font-display text-xl font-bold text-deep-red">
                {t("history.section2.subtitle")}
              </h3>
              <p className="font-body text-sm leading-relaxed text-warm-brown">
                {t("history.section2.text")}
              </p>
            </div>

            {/* Sección 3: El Secreto */}
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold bg-gold/10">
                <Award size={36} className="text-deep-red" />
              </div>
              <h3 className="font-display text-xl font-bold text-deep-red">
                {t("history.section3.subtitle")}
              </h3>
              <p className="font-body text-sm leading-relaxed text-warm-brown">
                {t("history.section3.text")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. PROCESO - 4 Pasos del Ahumado
      ========================================== */}
      <section className="bg-parchment py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-16 text-center font-display text-4xl font-bold text-dark-wood md:text-5xl">
            {t("process.title")}
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Award, key: "selection" },
              { icon: Flame, key: "marinade" },
              { icon: Flame, key: "smoking" },
              { icon: Award, key: "quality" },
            ].map((step, index) => (
              <div key={step.key} className="relative">
                {/* Conector entre pasos (desktop) */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-gold/40 to-transparent z-0" />
                )}
                
                <div className="relative z-10 rounded-2xl border-2 border-gold/30 bg-cream p-8 text-center transition-transform hover:-translate-y-2 hover:shadow-gold-glow">
                  <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-gold bg-dark-wood">
                    <step.icon size={40} className="text-gold" />
                  </div>
                  <h3 className="mb-3 font-display text-lg font-bold text-dark-wood">
                    {t(`process.steps.${step.key}.title`)}
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-warm-brown">
                    {t(`process.steps.${step.key}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          4. VALORES - Grid 2x2
      ========================================== */}
      <section className="bg-dark-wood py-20 px-6 text-cream">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-16 text-center font-display text-4xl font-bold text-gold md:text-5xl">
            {t("values.title")}
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            {[
              { key: "tradition", icon: Users },
              { key: "quality", icon: Award },
              { key: "family", icon: Users },
              { key: "community", icon: MapPin },
            ].map((value) => (
              <div
                key={value.key}
                className="liquid-glass rounded-2xl border-2 border-gold/40 p-8 transition-transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-6">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border-2 border-gold bg-gold/10">
                    <value.icon size={32} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="mb-3 font-display text-2xl font-bold text-gold">
                      {t(`values.items.${value.key}.title`)}
                    </h3>
                    <p className="font-body text-sm leading-relaxed text-cream/80">
                      {t(`values.items.${value.key}.desc`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          5. PATRIMONIO CULTURAL - Temozón
      ========================================== */}
      <section className="bg-cream py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="font-script text-5xl font-bold italic text-deep-red md:text-6xl">
              {t("heritage.title")}
            </h2>
            <p className="mt-4 font-body text-lg text-warm-brown">
              {t("heritage.subtitle")}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Iglesia */}
            <div className="rounded-2xl border-2 border-gold/30 bg-parchment p-8">
              <div className="mb-6 h-48 rounded-lg bg-dark-wood/10 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1564594349440-203fd1496690?w=800&q=80"
                  alt="Iglesia de Temozón"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-display text-xl font-bold text-dark-wood mb-3">
                Templos Históricos
              </h3>
              <p className="font-body text-sm leading-relaxed text-warm-brown">
                {t("heritage.church")}
              </p>
            </div>

            {/* Ek Balam */}
            <div className="rounded-2xl border-2 border-gold/30 bg-parchment p-8">
              <div className="mb-6 h-48 rounded-lg bg-dark-wood/10 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1518638151327-7f25d2382554?w=800&q=80"
                  alt="Zona Arqueológica Ek Balam"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-display text-xl font-bold text-dark-wood mb-3">
                Ek Balam
              </h3>
              <p className="font-body text-sm leading-relaxed text-warm-brown">
                {t("heritage.ekbalam")}
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href="https://maps.google.com/?q=Temozón,Yucatán"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-heritage inline-flex items-center gap-2"
            >
              <MapPin size={20} />
              {t("heritage.cta")}
            </a>
          </div>
        </div>
      </section>

      {/* ==========================================
          6. ESPECIALIDADES - Lista de Productos
      ========================================== */}
      <section className="bg-parchment py-20 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-script text-5xl font-bold italic text-deep-red md:text-6xl mb-12">
            {t("products.title")}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.raw("products.items").map((product: string, index: number) => (
              <div
                key={index}
                className="rounded-xl border-2 border-gold/30 bg-cream px-6 py-4 font-display text-sm font-bold uppercase tracking-wider text-dark-wood shadow-sm"
              >
                {product}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          7. CTA FINAL - Contacto
      ========================================== */}
      <section className="bg-dark-wood py-24 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-script text-5xl font-bold italic text-cream md:text-6xl mb-6">
            {t("cta.title")}
          </h2>
          <p className="font-body text-lg leading-relaxed text-cream/80 mb-10">
            {t("cta.subtitle")}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${locale}/menu`}
              className="btn-heritage w-full sm:w-auto justify-center"
            >
              {t("cta.button")}
            </Link>
            <a
              href="https://wa.me/5219994918221"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn-dark w-full sm:w-auto justify-center"
            >
              <MapPin size={18} className="text-gold" />
              Visítanos en Temozón
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
