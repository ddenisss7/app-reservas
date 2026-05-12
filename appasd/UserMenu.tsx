"use client";
import { useState } from "react";
import { createClient } from "./utils/supabase";
import { useRouter } from "next/navigation";

export default function UserMenu({ email }: { email: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload(); // Recarga para limpiar el estado de la página
  };

  return (
    <div className="relative inline-block text-left">
      {/* Botón con el nombre del usuario */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:bg-white/10"
        style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)" }}
      >
        <span className="text-sm font-medium text-white">{email.split('@')[0]}</span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Menú Desplegable */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 z-20 mt-2 w-48 rounded-xl shadow-2xl overflow-hidden"
               style={{ background: "#1a1513", border: "1px solid var(--border)", backdropFilter: "blur(10px)" }}>
            <div className="px-4 py-3 border-b border-white/5">
              <p className="text-[10px] uppercase tracking-widest text-gold opacity-70">Sesión iniciada</p>
              <p className="text-xs truncate text-white/60">{email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2"
            >
              <span>🚪</span> Cerrar Sesión
            </button>
          </div>
        </>
      )}
    </div>
  );
}