"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { type Locale } from "@/lib/i18n/routing";

interface HeaderProps {
  locale: Locale;
}

export function Header({ locale }: HeaderProps) {
  const t = useTranslations("navigation");
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const otherLocale = locale === "es" ? "en" : "es";
  const newPathname = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const navItems = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/menu`, label: t("products") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/recipes`, label: t("recipes") },
    { href: `/${locale}/wholesale`, label: t("wholesale") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b-2 border-gold/40 bg-cream shadow-xl">
      {/* Textura de papel sutil (Design System 3.3) */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23p)' opacity='1'/%3E%3C/svg%3E")`,
        }} 
      />
      
      {/* Línea degradado dorada en el borde inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Barra superior - Logo y acciones principales */}
        <div className="flex items-center justify-between py-5">
          {/* Logo + Título - Estilo Gourmet del HTML */}
          <Link href={`/${locale}`} className="flex items-center gap-5 group">
            {/* Logo SVG estilo sello/badge naranja */}
            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF8800] via-[#FD5C0D] to-[#C23006] shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
              {/* Borde dorado exterior */}
              <div className="absolute inset-0 rounded-2xl border-2 border-gold/60" />
              
              {/* Logo SVG - Ahumador de ladrillos */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 1000 1000" 
                className="w-[85%] h-[85%] drop-shadow-lg"
              >
                <defs>
                  <filter id="header-parchment" x="0" y="0" width="100%" height="100%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
                    <feDiffuseLighting in="noise" lighting-color="#FFFDF5" surfaceScale="2" result="light">
                      <feDistantLight azimuth="60" elevation="50" />
                    </feDiffuseLighting>
                    <feBlend mode="multiply" in="SourceGraphic" in2="light" />
                  </filter>
                  <linearGradient id="header-gold" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#D4AF37" />
                    <stop offset="50%" stopColor="#FDE047" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                  <radialGradient id="header-smoke" cx="50%" cy="80%" r="70%">
                    <stop offset="0%" stopColor="#FDE047" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#8B1E1E" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="header-brick" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#A52A2A" />
                    <stop offset="100%" stopColor="#8B1E1E" />
                  </linearGradient>
                  <linearGradient id="header-glass" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
                    <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
                  </linearGradient>
                </defs>

                <circle cx="500" cy="500" r="450" fill="#F9F3E9" filter="url(#header-parchment)" />
                <circle cx="500" cy="500" r="440" fill="none" stroke="#8B1E1E" strokeWidth="16" />
                <circle cx="500" cy="500" r="418" fill="none" stroke="url(#header-gold)" strokeWidth="4" />

                <path d="M 490 160 C 470 120, 530 90, 510 50 C 535 75, 550 110, 520 160 Z" fill="url(#header-smoke)" />
                <path d="M 510 160 C 530 110, 480 80, 540 30 C 560 70, 530 120, 530 160 Z" fill="url(#header-gold)" opacity="0.7" />
                
                <rect x="450" y="160" width="100" height="110" fill="url(#header-brick)" rx="3" />
                <rect x="440" y="150" width="120" height="20" fill="#7E1D0F" rx="2" />
                <path d="M 450 185 H 550 M 450 210 H 550 M 450 235 H 550 M 500 160 V 185 M 475 185 V 210 M 525 185 V 210 M 500 210 V 235" stroke="#F9F3E9" strokeWidth="2" opacity="0.4" />
                
                <rect x="270" y="270" width="460" height="230" fill="url(#header-brick)" rx="6" />
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
                <path d="M 300 500 A 200 200 0 0 1 700 500" fill="none" stroke="url(#header-gold)" strokeWidth="3" />
                
                <g>
                  <path d="M 350 500 A 150 150 0 0 1 650 500 Z" fill="#1A0D05" />
                  <text x="500" y="445" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="600" fill="#FFFCF5" fontSize="26" letterSpacing="4">DESDE</text>
                  <text x="500" y="480" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="bold" fill="#FFFCF5" fontSize="32">2013</text>
                  <path d="M 350 500 A 150 150 0 0 1 650 500 Z" fill="url(#header-glass)" />
                  <line x1="350" y1="500" x2="650" y2="500" stroke="url(#header-gold)" strokeWidth="4" />
                </g>

                <g textAnchor="middle">
                  <text x="500" y="600" fontFamily="Playfair Display, serif" fontWeight="900" fill="#2A1A0A" fontSize="82" letterSpacing="2">TEMOZÓN</text>
                  <text x="500" y="665" fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontWeight="600" fill="#2A1A0A" fontSize="52">Carnes ahumadas</text>
                  <text x="506" y="735" fontFamily="Inter, sans-serif" fontWeight="600" fill="#4A3A2A" fontSize="38" letterSpacing="12">CAUCEL</text>
                </g>

                <path d="M 280 840 L 470 840 M 530 840 L 720 840" stroke="url(#header-gold)" strokeWidth="3" strokeLinecap="round" />
                <polygon points="500,832 508,840 500,848 492,840" fill="url(#header-gold)" />
                <path d="M 335 838 C 330 838 325 830 328 820 C 330 812 338 808 338 800 C 336 792 330 790 332 782 C 334 778 340 782 342 788 C 345 782 350 780 350 786 C 348 794 344 798 346 806 C 350 810 358 812 360 820 C 362 828 358 838 350 838 Z" fill="#2A1A0A" />
                <path d="M 490 838 C 480 838 465 825 465 808 C 465 795 475 790 472 780 C 478 782 482 788 485 795 C 490 792 495 788 500 788 C 512 788 522 798 520 812 C 518 828 505 838 490 838 Z M 480 838 L 478 844 M 492 838 L 494 844" fill="#2A1A0A" />
                <path d="M 505 790 C 518 780 535 790 530 810 C 525 820 515 828 505 825 Z" fill="#2A1A0A" />
                <path d="M 620 838 C 615 838 615 830 618 822 C 615 818 615 808 625 802 C 635 796 655 796 670 800 C 680 804 690 802 695 808 C 700 814 698 822 692 826 C 690 832 682 838 675 838 C 670 838 668 830 662 830 C 656 830 652 838 645 838 C 640 838 638 830 632 830 C 626 830 625 838 620 838 Z" fill="#2A1A0A" />
                <path d="M 618 812 C 612 810 610 815 614 818" fill="none" stroke="#2A1A0A" strokeWidth="2" strokeLinecap="round" />
              </svg>
              
              {/* Badge circular "Desde 2013" */}
              <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-dark-wood border-2 border-gold shadow-md">
                <span className="font-display text-[8px] font-bold text-gold">2013</span>
              </div>
            </div>

            {/* Tipografía premium estilo gourmet */}
            <div className="flex flex-col">
              {/* Título principal - Playfair Display style */}
              <span className="font-display text-3xl font-black text-dark-wood leading-none tracking-tight transition-colors group-hover:text-deep-red">
                Temozonia
              </span>
              {/* Subtítulo italic - Cormorant Garamond style */}
              <span className="font-script text-lg italic text-deep-red leading-tight mt-0.5">
                Carnes Ahumadas
              </span>
              {/* Tagline pequeño */}
              <span className="font-display text-[9px] font-bold uppercase tracking-[0.25em] text-warm-brown mt-1">
                Caucel · Mérida · 100% Tradicional
              </span>
            </div>
          </Link>

          {/* Acciones Desktop */}
          <div className="hidden items-center gap-3 md:flex">
            {/* Selector de Idioma - Estilo más compacto */}
            <Link 
              href={newPathname}
              className="flex items-center gap-2 rounded-full border-2 border-gold/50 bg-parchment px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-warm-brown transition-all hover:border-gold hover:bg-gold/10 hover:shadow-md"
              aria-label="Change language"
            >
              <span className="text-base">{otherLocale === "es" ? "🇲🇽" : "🇺🇸"}</span>
              <span>{otherLocale.toUpperCase()}</span>
            </Link>

            {/* Botón de WhatsApp - Estilo Heritage mejorado */}
            <a
              href="https://wa.me/5219994918221"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-2 rounded-full border-2 border-deep-red bg-gradient-to-r from-deep-red to-brand-700 px-6 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-cream transition-all hover:shadow-xl hover:scale-105 overflow-hidden"
            >
              {/* Efecto de brillo al hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              
              <MessageCircle size={16} className="relative z-10" />
              <span className="relative z-10">999 491 8221</span>
            </a>
          </div>

          {/* Menú Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative rounded-xl border-2 border-gold bg-parchment p-3 text-deep-red transition-all hover:bg-gold/10 hover:shadow-lg"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navegación Desktop - Estilo más elegante */}
        <nav className="hidden md:block border-t border-gold/20">
          <ul className="flex items-center justify-center gap-10 py-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`group relative font-display text-sm uppercase tracking-[0.15em] transition-all duration-300 ${
                      isActive 
                        ? "text-deep-red font-bold" 
                        : "text-warm-brown hover:text-deep-red"
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    
                    {/* Línea dorada animada con diamante (Design System 3.2) */}
                    <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center transition-all duration-300 ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}>
                      <span className="h-0.5 w-8 bg-gold rounded-full" />
                      <span className="mx-1 text-gold text-xs">◆</span>
                      <span className="h-0.5 w-8 bg-gold rounded-full" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Menú Mobile - Diseño más pulido */}
      {isMobileMenuOpen && (
        <div className="relative border-t-2 border-gold/30 bg-parchment md:hidden animate-fade-up shadow-2xl">
          <nav className="px-6 py-5">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`group flex items-center justify-between rounded-xl px-5 py-4 font-display text-sm uppercase tracking-widest transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-deep-red/10 to-transparent text-deep-red font-bold border-l-4 border-deep-red shadow-md"
                          : "text-warm-brown hover:bg-gold/10 hover:text-deep-red border-l-4 border-transparent"
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="text-gold">◆</span>
                      )}
                    </Link>
                  </li>
                );
              })}
              
              {/* Selector de idioma mobile */}
              <li className="pt-4 mt-4 border-t-2 border-gold/20">
                <Link
                  href={newPathname}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-3 rounded-xl border-2 border-gold/50 bg-cream px-5 py-4 font-display text-sm font-bold uppercase tracking-wider text-dark-wood transition-all hover:border-gold hover:shadow-md"
                >
                  <span className="text-xl">{otherLocale === "es" ? "🇲🇽" : "🇺🇸"}</span>
                  <span>{otherLocale === "es" ? "Cambiar a Español" : "Switch to English"}</span>
                </Link>
              </li>

              {/* WhatsApp mobile - Diseño heritage mejorado */}
              <li className="pt-3">
                <a
                  href="https://wa.me/5219994918221"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center gap-3 rounded-xl btn-heritage px-5 py-4 font-display text-sm font-bold uppercase tracking-wider w-full overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <Phone size={18} className="relative z-10" />
                  <span className="relative z-10">Escríbenos al 999 491 8221</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
