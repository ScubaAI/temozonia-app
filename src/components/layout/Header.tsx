"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Menu, X, Phone } from "lucide-react";
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
    { href: `/${locale}/process`, label: t("process") },
    { href: `/${locale}/wholesale`, label: t("wholesale") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b-2 border-gold/30 bg-cream shadow-lg">
      {/* Textura de papel sutil */}
      <div className="absolute inset-0 opacity-60 pointer-events-none" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23p)' opacity='0.06'/%3E%3C/svg%3E")`,
           }} 
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Barra superior - Logo y acciones principales */}
        <div className="flex items-center justify-between py-4">
          {/* Logo + Título */}
          <Link href={`/${locale}`} className="flex items-center gap-4 group">
            {/* SVG Logo Placeholder - Reemplaza con tu SVG real */}
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold bg-dark-wood shadow-gold-glow transition-transform group-hover:scale-105">
              {/* Icono de fuego/ahumado placeholder */}
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5"
                className="h-8 w-8 text-gold"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
                />
              </svg>
              
              {/* Círculo dorado exterior decorativo */}
              <div className="absolute -inset-1 rounded-full border border-gold/40 pointer-events-none" />
            </div>

            {/* Título principal con tipografía cursiva */}
            <div className="flex flex-col">
              <span className="font-script text-3xl font-bold italic text-deep-red leading-none group-hover:text-brand-600 transition-colors">
                Temozonia
              </span>
              <span className="font-display text-[10px] uppercase tracking-[0.2em] text-gold mt-0.5">
                Carnes Ahumadas
              </span>
            </div>
          </Link>

          {/* Acciones Desktop */}
          <div className="hidden items-center gap-6 md:flex">
            {/* Selector de Idioma */}
            <Link 
              href={newPathname}
              className="flex items-center gap-2 rounded-full border-2 border-gold/40 bg-parchment px-4 py-2 font-display text-xs font-bold uppercase tracking-wider text-dark-wood transition-all hover:border-gold hover:bg-gold/10 hover:shadow-gold-glow"
            >
              <span>{otherLocale === "es" ? "🇸 ES" : "🇸 EN"}</span>
            </Link>

            {/* Botón WhatsApp */}
            <a
              href="https://wa.me/5219994918221"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border-2 border-[#25D366] bg-[#25D366]/10 px-4 py-2 font-display text-xs font-bold uppercase tracking-wider text-[#25D366] transition-all hover:bg-[#25D366] hover:text-white hover:shadow-lg"
            >
              <Phone size={16} />
              <span>999 491 8221</span>
            </a>
          </div>

          {/* Menú Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden rounded-lg border-2 border-gold p-2 text-deep-red transition-colors hover:bg-gold/10"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navegación Desktop */}
        <nav className="hidden md:block">
          <ul className="flex items-center justify-center gap-8 py-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`relative font-display text-sm uppercase tracking-widest transition-colors duration-200 ${
                      isActive 
                        ? "text-deep-red font-bold" 
                        : "text-warm-brown hover:text-deep-red"
                    }`}
                  >
                    {item.label}
                    {/* Línea dorada animada para item activo */}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
                    )}
                    {/* Hover effect */}
                    <span className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-gold transition-transform duration-200 ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Menú Mobile */}
      {isMobileMenuOpen && (
        <div className="relative border-t-2 border-gold/30 bg-parchment md:hidden">
          <nav className="px-6 py-4">
            <ul className="space-y-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block rounded-lg px-4 py-3 font-display text-sm uppercase tracking-widest transition-all ${
                        isActive
                          ? "bg-deep-red/10 text-deep-red font-bold border-l-4 border-deep-red"
                          : "text-warm-brown hover:bg-gold/10 hover:text-deep-red border-l-4 border-transparent"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              
              {/* Selector de idioma mobile */}
              <li className="pt-3 border-t border-gold/30">
                <Link
                  href={newPathname}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg border-2 border-gold/40 bg-cream px-4 py-3 font-display text-sm font-bold uppercase tracking-wider text-dark-wood"
                >
                  <span>{otherLocale === "es" ? "🇸 Español" : "🇸 English"}</span>
                </Link>
              </li>

              {/* WhatsApp mobile */}
              <li>
                <a
                  href="https://wa.me/5219994918221"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg border-2 border-[#25D366] bg-[#25D366] px-4 py-3 font-display text-sm font-bold uppercase tracking-wider text-white"
                >
                  <Phone size={18} />
                  <span>Escríbenos al 999 491 8221</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}