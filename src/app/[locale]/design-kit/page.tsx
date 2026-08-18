import { setRequestLocale } from "next-intl/server";
import { Bitcoin } from "lucide-react";
import { CartTester } from "@/components/ui/CartTester";
import { PRODUCTS } from "@/lib/constants";

export const metadata = { title: "Design Kit (QA interno)" };

export default async function DesignKitPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="mx-auto max-w-4xl space-y-16 px-6 py-16">
      {/* Tipografía */}
      <section className="space-y-2">
        <h1 className="font-display text-6xl font-black text-dark-wood md:text-7xl">H1 Display</h1>
        <h2 className="font-script text-5xl text-dark-wood md:text-6xl">H2 Script itálica</h2>
        <h3 className="font-display text-2xl font-bold text-dark-wood">H3 Subsección</h3>
        <p className="font-body text-base leading-relaxed text-warm-brown">Body Inter para texto corrido y UI.</p>
        <p className="font-display text-xs uppercase tracking-widest text-warm-brown">Caption / Label</p>
      </section>

      {/* Botones */}
      <section className="flex flex-wrap items-center gap-4">
        <button className="btn-heritage">btn-heritage</button>
        <button className="glass-btn">glass-btn</button>
        <button className="glass-btn-dark">
          <Bitcoin size={16} className="text-gold" aria-hidden />
          Pagar con Bitcoin
        </button>
      </section>

      {/* Tarjeta de producto */}
      <section className="grid gap-8 sm:grid-cols-2">
        <article className="product-card-heritage p-6">
          <span className="badge-ribbon">Más Vendido</span>
          <div className="mb-4 h-40 rounded-lg bg-parchment" />
          <h3 className="font-display text-2xl font-bold text-dark-wood">Miel de Abeja Criolla</h3>
          <p className="mt-1 font-body text-sm text-warm-brown">Cosecha artesanal de Los Tuxtlas.</p>
          <p className="mt-3 font-display text-lg font-bold text-deep-red">$185.00</p>
        </article>

        {/* Recibo + cúpula de resina */}
        <div className="receipt-gold space-y-3">
          <p className="font-display text-xs uppercase tracking-widest text-warm-brown">Recibo digital</p>
          <div className="flex justify-between font-body text-sm text-warm-brown">
            <span>Subtotal</span><span>$185.00</span>
          </div>
          <div className="receipt-divider" />
          <div className="flex justify-between font-body text-sm text-warm-brown">
            <span>Envío</span><span>$60.00</span>
          </div>
          <div className="payment-total-glass mt-2">
            <span className="total-amount">$245.00</span>
          </div>
        </div>
      </section>

      {/* Panel liquid glass + divisor */}
      <section className="liquid-glass p-8 text-cream">
        <p className="font-body text-sm">Panel .liquid-glass con backdrop-blur sobre fondo oscuro.</p>
      </section>
      <div className="gold-divider"><span aria-hidden>◆</span></div>

      {/* QA carrito (Fase 2) */}
      {PRODUCTS.length > 0 && <CartTester />}
    </main>
  );
}
