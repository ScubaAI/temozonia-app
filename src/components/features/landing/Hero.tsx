import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link"; // ⚠️ CORREGIDO: era "next-link"
import { Bitcoin, Landmark } from "lucide-react";

export async function Hero({ locale }: { locale: string }) {
  // ✅ RECOMENDADO: Mantener activo para optimización de routing estático en Next.js 15
  setRequestLocale(locale);
  
  const t = await getTranslations("home");

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-dark-wood px-6 py-24 text-center">
      
      {/* 1. Background Image: Iglesia Colonial cálida */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=1920&q=80')",
        }}
      >
        {/* Overlay oscuro inferior para legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-wood/70 via-dark-wood/60 to-dark-wood" />
      </div>
      
      {/* 2. Efecto de Luz Cálida (Sol de la tarde entrando) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,_rgba(245,158,11,0.25),_transparent_60%)] pointer-events-none" />
      
      {/* Contenido del Hero */}
      <div className="relative z-10 mx-auto max-w-5xl space-y-8 animate-fade-up">
        {/* Kicker */}
        <p className="font-display text-sm uppercase tracking-[0.3em] text-gold-300">
          {t("heroKicker")}
        </p>
        
        {/* Título principal */}
        <h1 className="font-script text-6xl font-bold italic text-cream md:text-8xl lg:text-9xl leading-[0.9] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          {t("heroTitle")}
        </h1>
        
        {/* Subtítulo */}
        <p className="mx-auto max-w-3xl font-body text-lg leading-relaxed text-cream/90 md:text-xl drop-shadow-md">
          {t("heroSubtitle")}
        </p>

        {/* Divider dorado */}
        <div className="gold-divider mx-auto w-40 pt-4">
          <span aria-hidden className="text-gold">◆</span>
        </div>

        {/* CTA Principal */}
        <div className="pt-4">
          <Link href={`/${locale}/menu`} className="btn-heritage w-full sm:w-auto text-lg px-12 py-4">
            {t("ctaCatalog")}
          </Link>
        </div>

        {/* 3. Botón unificado de métodos de pago (Estilo Liquid Glass) */}
        <div className="flex flex-col items-center justify-center gap-3 pt-6">
          <p className="font-display text-xs uppercase tracking-widest text-cream/60">
            {t("heroPayments")}
          </p>
          
          <div className="glass-btn-dark flex flex-wrap items-center justify-center gap-3 px-5 py-3 rounded-full">
            {/* Tarjetas */}
            <span className="font-body text-xs font-semibold text-cream/80">Visa</span>
            <span className="w-px h-4 bg-cream/20" aria-hidden />
            <span className="font-body text-xs font-semibold text-cream/80">Mastercard</span>
            <span className="w-px h-4 bg-cream/20" aria-hidden />
            
            {/* Transferencia */}
            <span className="flex items-center gap-1.5 font-body text-xs font-semibold text-cream/80">
              <Landmark size={14} aria-hidden />
              {t("heroTransfer")}
            </span>
            
            <span className="w-px h-4 bg-cream/20" aria-hidden />
            
            {/* Bitcoin Preferente */}
            <div className="flex items-center gap-1.5 bg-gold/10 border border-gold/40 rounded-full px-3 py-1">
              <Bitcoin size={16} className="text-gold-300" aria-hidden />
              <span className="font-body text-xs font-bold text-gold-300">Bitcoin</span>
            </div>
          </div>
        </div>
        
        {/* Texto de ubicación */}
        <p className="pt-6 font-display text-xs uppercase tracking-widest text-cream/60">
          {t("heroLocation")}
        </p>
      </div>
    </section>
  );
}