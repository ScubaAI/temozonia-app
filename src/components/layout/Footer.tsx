import { useTranslations } from "next-intl";
import { Globe, ExternalLink } from "lucide-react";

export function Footer({ locale }: { locale: string }) {
  const t = useTranslations("footer");

  return (
    <footer className="mt-24 border-t border-gold/30 bg-dark-wood text-cream">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <span className="font-script text-4xl font-bold italic text-gold">
              Temozonia
            </span>
            <p className="font-body text-sm leading-relaxed text-cream/70">
              {t("tagline")}
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-display text-xs uppercase tracking-widest text-gold">
              Explorar
            </h4>
            <ul className="space-y-2 font-body text-sm text-cream/70">
              <li><a href={`/${locale}/menu`} className="hover:text-gold transition-colors">Catálogo</a></li>
              <li><a href={`/${locale}/cart`} className="hover:text-gold transition-colors">Carrito</a></li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-display text-xs uppercase tracking-widest text-gold">
              Síguenos
            </h4>
            <div className="flex gap-4">
              <a href="#" className="glass-btn-dark p-2.5 hover:bg-gold/10" aria-label="Sitio web">
                <Globe size={18} className="text-gold" />
              </a>
              <a href="#" className="glass-btn-dark p-2.5 hover:bg-gold/10" aria-label="Red social">
                <ExternalLink size={18} className="text-gold" />
              </a>
              <a href="#" className="glass-btn-dark p-2.5 hover:bg-gold/10" aria-label="Canal">
                <ExternalLink size={18} className="text-gold" />
              </a>
            </div>
          </div>
        </div>

        <div className="gold-divider mt-12 mb-8 text-gold/50">
          <span aria-hidden>◆</span>
        </div>

        <p className="text-center font-body text-xs text-cream/50">
          © {new Date().getFullYear()} Temozonia. {t("rights")}
        </p>
      </div>
    </footer>
  );
}