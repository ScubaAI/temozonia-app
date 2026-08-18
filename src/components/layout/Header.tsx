"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Menu, X, Phone, MessageCircle, Flame } from "lucide-react";
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
              
              {/* Ícono de fuego estilizado */}
              <Flame 
                size={40} 
                className="text-cream drop-shadow-lg transition-transform duration-300 group-hover:rotate-12" 
                strokeWidth={1.5}
                fill="currentColor"
              />
              
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
