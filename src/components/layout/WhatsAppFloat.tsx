"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  // Número formateado para la API de WhatsApp (52 + 10 dígitos)
  const phoneNumber = "5219994918221";
  const message = encodeURIComponent("Hola Temozonia Carnes Ahumadas! Me interesa hacer un pedido.");
  const waLink = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-500/30 transition-transform hover:scale-110 hover:shadow-xl"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={28} fill="white" />
    </a>
  );
}