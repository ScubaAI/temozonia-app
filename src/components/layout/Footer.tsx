import { useTranslations } from "next-intl";
import Link from "next/link";
import { MapPin, Phone, Mail, Camera, Users, Clock, Bitcoin } from "lucide-react";

export function Footer({ locale }: { locale: string }) {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-dark-wood text-cream border-t-2 border-gold/30">
      {/* Textura de papel */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23p)' opacity='1'/%3E%3C/svg%3E")`,
        }} 
      />

      <div className="relative mx-auto max-w-7xl px-6 py-12">
        {/* Grid principal: 4 columnas en desktop, 2 en tablet, 1 en mobile */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* 1. Branding + Logo */}
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              {/* Logo SVG compacto del HTML */}
              <div className="w-24 h-24 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" className="w-full h-full drop-shadow-lg">
                  <defs>
                    <style>
                      {`
                        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,600&family=Inter:wght@400;600&family=Playfair+Display:wght@900&display=swap');
                        .brand-title { font-family: 'Playfair Display', serif; font-weight: 900; fill: #2A1A0A; font-size: 82px; letter-spacing: 2px; }
                        .brand-subtitle { font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 600; fill: #2A1A0A; font-size: 52px; }
                        .brand-location { font-family: 'Inter', sans-serif; font-weight: 600; fill: #4A3A2A; font-size: 38px; letter-spacing: 12px; }
                        .brand-year { font-family: 'Inter', sans-serif; font-weight: 600; fill: #FFFCF5; font-size: 26px; letter-spacing: 4px; }
                      `}
                    </style>
                    <filter id="parchment-texture" x="0" y="0" width="100%" height="100%">
                      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
                      <feDiffuseLighting in="noise" lighting-color="#FFFDF5" surfaceScale="2" result="light">
                        <feDistantLight azimuth="60" elevation="50" />
                      </feDiffuseLighting>
                      <feBlend mode="multiply" in="SourceGraphic" in2="light" />
                    </filter>
                    <linearGradient id="gold-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#D4AF37" />
                      <stop offset="50%" stopColor="#FDE047" />
                      <stop offset="100%" stopColor="#F59E0B" />
                    </linearGradient>
                    <radialGradient id="smoke-gold" cx="50%" cy="80%" r="70%">
                      <stop offset="0%" stopColor="#FDE047" stopOpacity="0.9" />
                      <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#8B1E1E" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="brick-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#A52A2A" />
                      <stop offset="100%" stopColor="#8B1E1E" />
                    </linearGradient>
                    <linearGradient id="glass-specular" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
                      <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.05" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
                    </linearGradient>
                    <filter id="glass-shadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#000000" floodOpacity="0.4" />
                    </filter>
                  </defs>
                  <g>
                    <circle cx="500" cy="500" r="450" fill="#F9F3E9" filter="url(#parchment-texture)" />
                    <circle cx="500" cy="500" r="440" fill="none" stroke="#8B1E1E" strokeWidth="16" />
                    <circle cx="500" cy="500" r="418" fill="none" stroke="url(#gold-gradient)" strokeWidth="4" />
                  </g>
                  <g id="horno-emblema">
                    <path d="M 490 160 C 470 120, 530 90, 510 50 C 535 75, 550 110, 520 160 Z" fill="url(#smoke-gold)" />
                    <path d="M 510 160 C 530 110, 480 80, 540 30 C 560 70, 530 120, 530 160 Z" fill="url(#gold-gradient)" opacity="0.7" />
                    <rect x="450" y="160" width="100" height="110" fill="url(#brick-gradient)" rx="3" />
                    <rect x="440" y="150" width="120" height="20" fill="#7E1D0F" rx="2" />
                    <path d="M 450 185 H 550 M 450 210 H 550 M 450 235 H 550 M 500 160 V 185 M 475 185 V 210 M 525 185 V 210 M 500 210 V 235" stroke="#F9F3E9" strokeWidth="2" opacity="0.4" />
                    <rect x="270" y="270" width="460" height="230" fill="url(#brick-gradient)" rx="6" />
                    <rect x="260" y="260" width="480" height="20" fill="#7E1D0F" rx="3" />
                    <g stroke="#F9F3E9" strokeWidth="2.5" opacity="0.35" fill="none">
                      <line x1="270" y1="310" x2="730" y2="310" />
                      <line x1="270" y1="350" x2="730" y2="350" />
                      <line x1="270" y1="390" x2="730" y2="390" />
                      <line x1="270" y1="430" x2="730" y2="430" />
                      <line x1="270" y1="470" x2="730" y2="470" />
                      <path d="M 320 270 V 310 M 420 270 V 310 M 580 270 V 310 M 680 270 V 310" />
                      <path d="M 370 310 V 350 M 630 310 V 350" />
                      <path d="M 320 350 V 390 M 680 350 V 390" />
                      <path d="M 370 390 V 430 M 630 390 V 430" />
                      <path d="M 320 430 V 470 M 680 430 V 470" />
                    </g>
                    <path d="M 315 500 A 185 185 0 0 1 685 500 Z" fill="#2A1A0A" />
                    <path d="M 315 500 A 185 185 0 0 1 685 500" fill="none" stroke="#7E1D0F" strokeWidth="35" />
                    <path d="M 300 500 A 200 200 0 0 1 700 500" fill="none" stroke="url(#gold-gradient)" strokeWidth="3" />
                    <g filter="url(#glass-shadow)">
                      <path d="M 350 500 A 150 150 0 0 1 650 500 Z" fill="#1A0D05" />
                      <text x="500" y="445" textAnchor="middle" className="brand-year">DESDE</text>
                      <text x="500" y="480" textAnchor="middle" className="brand-year" fontSize="32" fontWeight="bold">2013</text>
                      <path d="M 350 500 A 150 150 0 0 1 650 500 Z" fill="url(#glass-specular)" />
                      <line x1="350" y1="500" x2="650" y2="500" stroke="url(#gold-gradient)" strokeWidth="4" />
                    </g>
                  </g>
                  <g id="tipografia" textAnchor="middle">
                    <text x="500" y="600" className="brand-title">TEMOZÓN</text>
                    <text x="500" y="665" className="brand-subtitle">Carnes ahumadas</text>
                    <text x="506" y="735" className="brand-location">CAUCEL</text>
                  </g>
                  <g id="pedigri-animales">
                    <path d="M 280 840 L 470 840 M 530 840 L 720 840" stroke="url(#gold-gradient)" strokeWidth="3" strokeLinecap="round" />
                    <polygon points="500,832 508,840 500,848 492,840" fill="url(#gold-gradient)" />
                    <path d="M 335 838 C 330 838 325 830 328 820 C 330 812 338 808 338 800 C 336 792 330 790 332 782 C 334 778 340 782 342 788 C 345 782 350 780 350 786 C 348 794 344 798 346 806 C 350 810 358 812 360 820 C 362 828 358 838 350 838 Z" fill="#2A1A0A" />
                    <path d="M 490 838 C 480 838 465 825 465 808 C 465 795 475 790 472 780 C 478 782 482 788 485 795 C 490 792 495 788 500 788 C 512 788 522 798 520 812 C 518 828 505 838 490 838 Z M 480 838 L 478 844 M 492 838 L 494 844" fill="#2A1A0A" />
                    <path d="M 505 790 C 518 780 535 790 530 810 C 525 820 515 828 505 825 Z" fill="#2A1A0A" />
                    <path d="M 620 838 C 615 838 615 830 618 822 C 615 818 615 808 625 802 C 635 796 655 796 670 800 C 680 804 690 802 695 808 C 700 814 698 822 692 826 C 690 832 682 838 675 838 C 670 838 668 830 662 830 C 656 830 652 838 645 838 C 640 838 638 830 632 830 C 626 830 625 838 620 838 Z" fill="#2A1A0A" />
                    <path d="M 618 812 C 612 810 610 815 614 818" fill="none" stroke="#2A1A0A" strokeWidth="2" strokeLinecap="round" />
                  </g>
                </svg>
              </div>
              <div>
                <h3 className="font-script text-3xl italic text-gold leading-none">Temozonia</h3>
                <p className="font-display text-[10px] uppercase tracking-[0.2em] text-cream/60 mt-1">
                  Carnes Ahumadas · Desde 2013
                </p>
              </div>
            </div>
            <p className="font-body text-sm leading-relaxed text-cream/70">
              {t("tagline")}
            </p>
            {/* Badge de pagos Bitcoin */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gold/10 border border-gold/30 w-fit">
              <Bitcoin size={16} className="text-gold" />
              <span className="font-body text-xs text-cream/80">
                Aceptamos Bitcoin Lightning
              </span>
            </div>
          </div>

          {/* 2. Sucursales (nueva sección) */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-gold flex items-center gap-2">
              <MapPin size={14} />
              Sucursales
            </h4>
            
            {/* Sucursal Caucel */}
            <div className="space-y-2 pb-4 border-b border-gold/20">
              <div className="font-body text-sm font-semibold text-cream flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold"></span>
                Caucel Pueblo
              </div>
              <div className="font-body text-xs text-cream/70 leading-snug">
                Av. Principal Calle 23 entre 12 y 14 (Esquina)
              </div>
              <a 
                href="tel:+529994918221" 
                className="flex items-center gap-2 font-body text-xs text-gold hover:text-gold-300 transition-colors"
              >
                <Phone size={12} />
                999 491 8221
              </a>
              <div className="flex items-start gap-2 font-body text-xs text-cream/60">
                <Clock size={12} className="mt-0.5 flex-shrink-0" />
                <span>Mar-Dom: 10:30 am - 4:30 pm</span>
              </div>
            </div>

            {/* Sucursal Fracc. del Parque */}
            <div className="space-y-2">
              <div className="font-body text-sm font-semibold text-cream flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold"></span>
                Fracc. del Parque
              </div>
              <div className="font-body text-xs text-cream/70 leading-snug">
                Calle 16 entre 55 y 57 #657
                <span className="block text-[10px] text-cream/50 italic mt-0.5">
                  (Entrando al pasillo del lado derecho)
                </span>
              </div>
              <a 
                href="tel:+529992310619" 
                className="flex items-center gap-2 font-body text-xs text-gold hover:text-gold-300 transition-colors"
              >
                <Phone size={12} />
                999 231 0619
              </a>
              <div className="flex items-start gap-2 font-body text-xs text-cream/60">
                <Clock size={12} className="mt-0.5 flex-shrink-0" />
                <span>
                  Mar-Vie: 1:00 pm - 5:30 pm<br />
                  Sáb-Dom: 12:30 pm - 4:30 pm
                </span>
              </div>
            </div>
          </div>

          {/* 3. Enlaces rápidos + Contacto */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-gold">
              {t("links.title")}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}`} className="font-body text-sm text-cream/70 hover:text-gold transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/0 group-hover:bg-gold transition-all" />
                  {t("links.home")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/menu`} className="font-body text-sm text-cream/70 hover:text-gold transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/0 group-hover:bg-gold transition-all" />
                  {t("links.products")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/wholesale`} className="font-body text-sm text-cream/70 hover:text-gold transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/0 group-hover:bg-gold transition-all" />
                  {t("links.wholesale")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="font-body text-sm text-cream/70 hover:text-gold transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/0 group-hover:bg-gold transition-all" />
                  {t("links.about")}
                </Link>
              </li>
            </ul>

            {/* Contacto rápido */}
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-gold pt-4">
              {t("contact.title")}
            </h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://wa.me/5219994918221" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <Phone size={16} className="text-gold group-hover:scale-110 transition-transform" />
                  <span className="font-body text-sm text-cream/70 group-hover:text-gold transition-colors">
                    WhatsApp
                  </span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:temozoniacarnesahumadas@gmail.com" 
                  className="flex items-center gap-3 group"
                >
                  <Mail size={16} className="text-gold group-hover:scale-110 transition-transform" />
                  <span className="font-body text-sm text-cream/70 group-hover:text-gold transition-colors">
                    Email
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* 4. Redes sociales + AceptaBitcoin */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-gold">
              {t("social.title")}
            </h4>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/temozoniacarnesahumadas"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-cream/5 text-gold transition-all hover:bg-gold hover:text-dark-wood hover:shadow-gold-glow"
                aria-label={t("social.instagram")}
              >
                <Camera size={18} />
              </a>
              <a
                href="https://www.facebook.com/temozoniacarnesahumadas/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-cream/5 text-gold transition-all hover:bg-gold hover:text-dark-wood hover:shadow-gold-glow"
                aria-label={t("social.facebook")}
              >
                <Users size={18} />
              </a>
            </div>

            {/* Badge de AceptaBitcoin más compacto */}
            <a 
              href="https://aceptabitcoin.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block p-4 rounded-lg border border-gold/30 bg-cream/5 hover:bg-cream/10 transition-all hover:border-gold/60"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" className="w-full h-full">
                    <circle cx="500" cy="500" r="450" fill="#F9F3E9" />
                    <circle cx="500" cy="500" r="440" fill="none" stroke="#8B1E1E" strokeWidth="16" />
                    <circle cx="500" cy="500" r="418" fill="none" stroke="url(#gold-gradient)" strokeWidth="4" />
                    <text x="500" y="500" textAnchor="middle" dominantBaseline="middle" className="brand-title" fontSize="200">AB</text>
                  </svg>
                </div>
                <div>
                  <span className="font-display text-[9px] uppercase tracking-widest text-cream/50 group-hover:text-gold transition-colors block">
                    {t("designedBy")}
                  </span>
                  <span className="text-gold font-bold text-sm group-hover:text-gold-300 transition-colors">
                    AceptaBitcoin.org
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Divisor de oro */}
        <div className="gold-divider my-8 text-gold/40">
          <span aria-hidden>◆</span>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="font-body text-xs text-cream/40">
            © {currentYear} Temozonia Carnes Ahumadas. {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}