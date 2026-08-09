import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { Bitcoin, Flame } from "lucide-react";

export async function Hero({ locale }: { locale: string }) {
  const t = await getTranslations("home");

  return (
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
  );
}