"use client";

import { forwardRef } from "react";
import { X } from "lucide-react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ isOpen, onClose, title, children }, ref) => {
    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          ref={ref}
          className="relative mx-4 max-w-2xl rounded-xl border border-gold-500/30 bg-liquid-bg p-6 shadow-gold"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-1 text-gold-400 hover:bg-foreground/10"
          >
            <X size={20} />
          </button>
          {title && (
            <h3 className="font-display text-2xl text-gold mb-4">{title}</h3>
          )}
          {children}
        </div>
      </div>
    );
  }
);
Modal.displayName = "Modal";
