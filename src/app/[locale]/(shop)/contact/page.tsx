import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Navigation, MessageCircle } from "lucide-react";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations("contact");

  // URL de Google Maps embebido usando las coordenadas exactas del lugar
  const mapUrl = "https://maps.google.com/maps?q=20.9683501,-89.5879335&hl=es&z=16&output=embed";
  const mapsDirectionsUrl = "https://www.google.com/maps/dir/?api=1&destination=20.9683501,-89.5879335";

  return (
    <main className="flex flex-col">
      {/* ==========================================
          1. HERO SECTION
      ========================================== */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-dark-wood px-6 py-24 text-center">
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
          2. MAPA Y DATOS DE CONTACTO
      ========================================== */}
      <section className="bg-cream py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            
            {/* Columna Izquierda: Mapa */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <MapPin size={28} className="text-deep-red" />
                <h2 className="font-display text-3xl font-bold text-dark-wood">
                  {t("map.title")}
                </h2>
              </div>
              
              <div className="relative overflow-hidden rounded-2xl border-2 border-gold/30 shadow-gold-glow bg-parchment">
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="450"
                  style={{ border: 0, filter: "grayscale(20%) contrast(1.1)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de Temozonia Carnes Ahumadas"
                  className="w-full"
                />
                
                {/* Botón flotante sobre el mapa */}
                <a
                  href={mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-6 right-6 flex items-center gap-2 rounded-full border-2 border-gold bg-dark-wood px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-gold shadow-lg transition-all hover:bg-gold hover:text-dark-wood"
                >
                  <Navigation size={18} />
                  {t("map.directions")}
                </a>
              </div>
            </div>

            {/* Columna Derecha: Información de Contacto */}
            <div className="space-y-8">
              {/* Dirección */}
              <div className="receipt-gold p-8 transition-transform hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-gold bg-gold/10">
                    <MapPin size={24} className="text-deep-red" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-dark-wood mb-2">
                      {t("info.address_title")}
                    </h3>
                    <p className="font-body text-base leading-relaxed text-warm-brown">
                      {t("info.address")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Horario */}
              <div className="receipt-gold p-8 transition-transform hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-gold bg-gold/10">
                    <Clock size={24} className="text-deep-red" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-dark-wood mb-2">
                      {t("info.hours_title")}
                    </h3>
                    <p className="font-body text-base leading-relaxed text-warm-brown whitespace-pre-line">
                      {t("info.hours")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Teléfono y Email */}
              <div className="grid gap-4 sm:grid-cols-2">
                <a
                  href="https://wa.me/5219994918221"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="receipt-gold p-6 flex flex-col items-center text-center gap-3 transition-transform hover:-translate-y-1 hover:shadow-gold-glow group"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#25D366] bg-[#25D366]/10 group-hover:bg-[#25D366] transition-colors">
                    <Phone size={24} className="text-[#25D366] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="font-display text-xs uppercase tracking-widest text-warm-brown mb-1">WhatsApp</p>
                    <p className="font-mono text-xl font-bold text-deep-red">{t("info.phone")}</p>
                  </div>
                </a>

                <a
                  href="mailto:temozoniacarnesahumadas@gmail.com"
                  className="receipt-gold p-6 flex flex-col items-center text-center gap-3 transition-transform hover:-translate-y-1 hover:shadow-gold-glow group"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold bg-gold/10 group-hover:bg-gold transition-colors">
                    <Mail size={24} className="text-deep-red group-hover:text-dark-wood transition-colors" />
                  </div>
                  <div>
                    <p className="font-display text-xs uppercase tracking-widest text-warm-brown mb-1">Email</p>
                    <p className="font-body text-sm font-bold text-dark-wood break-all">{t("info.email")}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. CTA FINAL - MAYOREO / PEDIDOS
      ========================================== */}
      <section className="bg-dark-wood py-24 px-6 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-deep-red/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="font-script text-5xl font-bold italic text-cream md:text-6xl mb-6">
            {t("cta.title")}
          </h2>
          <p className="font-body text-lg leading-relaxed text-cream/80 mb-10 max-w-2xl mx-auto">
            {t("cta.subtitle")}
          </p>
          
          <a
            href="https://wa.me/5219994918221?text=Hola%20Temozonia!%20Me%20gustaría%20hacer%20una%20consulta%20sobre%20un%20pedido."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border-2 border-[#25D366] bg-[#25D366] px-8 py-4 font-display text-base font-bold uppercase tracking-wider text-white shadow-lg shadow-green-500/20 transition-all hover:bg-[#20bd5a] hover:scale-105"
          >
            <MessageCircle size={24} fill="white" />
            {t("cta.button")}
          </a>
        </div>
      </section>
    </main>
  );
}
