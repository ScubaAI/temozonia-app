import { getTranslations } from "next-intl/server";

export async function WhatsAppCTA({ locale }: { locale: string }) {
  const t = await getTranslations("home");

  return (
    <section className="relative overflow-hidden bg-dark-wood py-20 px-6">
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-deep-red/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-500/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="liquid-glass rounded-3xl border-2 border-gold/40 p-8 md:p-12 lg:p-16 shadow-gold-glow">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-gold-500/20 px-4 py-2 border border-gold/40">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-300 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-gold-500"></span>
                </span>
                <span className="font-display text-xs font-bold uppercase tracking-widest text-gold-300">
                  Respuesta en minutos
                </span>
              </div>

              <h2 className="font-script text-4xl font-bold italic text-cream md:text-5xl lg:text-6xl">
                {t("whatsappCta.title")}
              </h2>

              <p className="font-body text-base leading-relaxed text-cream/80 md:text-lg">
                {t("whatsappCta.subtitle")}
              </p>

              <ul className="space-y-3 text-left">
                <li className="flex items-start gap-3">
                  <span className="text-gold-500 mt-1">✓</span>
                  <span className="font-body text-sm text-cream/70">
                    {t("whatsappCta.benefits.personal")}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold-500 mt-1">✓</span>
                  <span className="font-body text-sm text-cream/70">
                    {t("whatsappCta.benefits.fast")}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold-500 mt-1">✓</span>
                  <span className="font-body text-sm text-cream/70">
                    {t("whatsappCta.benefits.wholesale")}
                  </span>
                </li>
              </ul>

              <div className="payment-total-glass inline-block px-8 py-4">
                <p className="font-display text-xs uppercase tracking-widest text-warm-brown mb-1 block text-center">
                  {t("whatsappCta.phoneLabel")}
                </p>
                <a 
                  href="https://wa.me/5219994918221" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="total-amount text-3xl md:text-4xl font-black text-dark-wood hover:text-brand-600 transition-colors block text-center"
                >
                  999 491 8221
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-[#25D366] rounded-full blur-2xl opacity-30 animate-pulse" />
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-[#25D366] shadow-2xl shadow-green-500/30 border-4 border-gold/40">
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="white" 
                    className="h-16 w-16"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
              </div>

              <a
                href="https://wa.me/5219994918221?text=Hola%20Temozonia%20Carnes%20Ahumadas!%20Me%20interesa%20hacer%20un%20pedido.%20Quiero%20saber%20precios%20y%20disponibilidad."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-heritage w-full max-w-sm justify-center text-lg py-4 px-8 animate-fade-up"
                style={{ animationDelay: '0.2s' }}
              >
                <svg 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t("whatsappCta.ctaButton")}
              </a>

              <p className="font-display text-xs uppercase tracking-widest text-gold-300/80 animate-pulse">
                {t("whatsappCta.urgency")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
