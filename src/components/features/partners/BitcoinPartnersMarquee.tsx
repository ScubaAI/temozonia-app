import partnersData from "@/data/bitcoin-partners.json";

export default function BitcoinPartnersMarquee() {
  const duplicatedPartners = [...partnersData, ...partnersData];

  return (
    <section className="bg-dark-wood border-t border-gold/30 overflow-hidden">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark-wood to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark-wood to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee whitespace-nowrap py-8">
          {duplicatedPartners.map((partner, index) => (
            <a
              key={`${partner.id}-${index}`}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 mx-8 group opacity-60 hover:opacity-100 transition-all duration-300"
              aria-label={`Visitar ${partner.name} - ${partner.description}`}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold/40 bg-cream/5 group-hover:border-gold group-hover:bg-gold/10 transition-all">
                <span className="font-display text-xs font-bold text-gold uppercase">
                  {partner.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-display text-sm font-bold text-cream group-hover:text-gold transition-colors">
                  {partner.name}
                </span>
                <span className="font-body text-[10px] text-cream/60">
                  {partner.location}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
