import partnersData from "@/data/bitcoin-partners.json";
import { UtensilsCrossed, Bitcoin } from "lucide-react";

export default function BitcoinPartnersMarquee() {
  // Duplicamos los partners para crear el efecto de loop infinito suave
  const duplicatedPartners = [...partnersData, ...partnersData];

  return (
    <section className="relative bg-dark-wood border-t-2 border-gold/30 overflow-hidden py-16 md:py-20">
      {/* Efecto de luz dorada superior sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(245,158,11,0.08),_transparent_60%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 mb-10 text-center">
        {/* Kicker */}
        <p className="font-script text-xl italic text-gold mb-2">
          Experiencia Gastronómica
        </p>
        {/* Título Principal */}
        <h2 className="font-display text-3xl md:text-4xl font-black text-cream tracking-tight">
          Encuéntranos en las mejores mesas
        </h2>
        {/* Prueba Social */}
        <p className="mx-auto mt-4 max-w-2xl font-body text-base text-cream/70">
          Selección de restaurantes de alto nivel que sirven nuestras carnes ahumadas artesanales. Visítalos y vive la experiencia Temozonia.
        </p>
      </div>

      <div className="relative">
        {/* Degradados para difuminar los bordes del carrusel */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-dark-wood to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-dark-wood to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee whitespace-nowrap py-4">
          {duplicatedPartners.map((partner, index) => (
            <a
              key={`${partner.id}-${index}`}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 mx-8 group"
              aria-label={`Visitar ${partner.name} - ${partner.description}`}
            >
              {/* Monograma del Restaurante */}
              <div className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-2 border-gold/30 bg-cream/5 transition-all duration-300 group-hover:border-gold group-hover:bg-gold/10">
                <span className="font-display text-xs font-bold text-gold uppercase opacity-80 group-hover:opacity-0 transition-opacity">
                  {partner.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </span>
                <UtensilsCrossed 
                  size={20} 
                  className="absolute text-gold opacity-0 group-hover:opacity-100 transition-opacity" 
                  aria-hidden
                />
              </div>

              {/* Información del Partner */}
              <div className="flex flex-col flex-shrink-0">
                <div className="flex items-center gap-2">
                  <span className="font-display text-sm font-bold text-cream/80 group-hover:text-gold transition-colors">
                    {partner.name}
                  </span>
                  {/* Badge Bitcoin sutil que aparece en hover */}
                  <span className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Bitcoin size={12} className="text-gold" aria-hidden />
                  </span>
                </div>
                <span className="font-body text-[11px] text-cream/50 uppercase tracking-widest">
                  {partner.location}
                </span>
              </div>

              {/* Separador visual entre items */}
              <span className="ml-8 text-gold/20 group-hover:text-gold/40 transition-colors flex-shrink-0" aria-hidden>◆</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}