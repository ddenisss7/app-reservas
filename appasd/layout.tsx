"use client";

import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "./utils/supabase";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });
const dmSans   = DM_Sans({ subsets: ["latin"], variable: "--font-body", axes: ["opsz"] });

function UserMenu({ email }: { email: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div className="relative inline-block text-left">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:bg-white/10 text-white"
        style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)" }}
      >
        <span className="text-sm font-medium">{email.split('@')[0]}</span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 z-20 mt-2 w-48 rounded-xl shadow-2xl overflow-hidden"
               style={{ background: "#1a1513", border: "1px solid var(--border)", backdropFilter: "blur(10px)" }}>
            <div className="px-4 py-3 border-b border-white/5">
              <p className="text-[10px] uppercase tracking-widest text-rose-500 font-bold">Sesión iniciada</p>
              <p className="text-xs truncate text-white/60">{email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors font-medium"
            >
              Cerrar Sesión
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    checkUser();
  }, [supabase.auth]);

  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${playfair.variable} ${dmSans.variable} flex flex-col min-h-screen`} style={{ background: "var(--bg)", color: "var(--white)" }}>
        
        <nav className="sticky top-0 z-50 w-full" style={{ background: "rgba(10,7,5,0.82)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold tracking-wide" style={{ fontFamily: "var(--font-display)", color: "var(--white)" }}>
              Gourmet<span style={{ color: "var(--accent-lit)" }}>Reserve</span>
            </Link>

            {/* NAVEGACIÓN: "Mis Reservas" siempre visible */}
            <div className="hidden md:flex gap-8 text-sm" style={{ color: "var(--muted)" }}>
              <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
              <Link href="/restaurantes" className="hover:text-white transition-colors">Restaurantes</Link>
              <Link href="/reservas" className="hover:text-white transition-colors">Mis Reservas</Link>
            </div>

            <div className="flex items-center gap-4">
              {user ? (
                <UserMenu email={user.email} />
              ) : (
                <Link href="/login" className="text-xs font-bold px-6 py-2.5 rounded transition-all hover:bg-white/10" style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
                  INICIAR SESIÓN
                </Link>
              )}
            </div>
          </div>
        </nav>

        <main className="relative z-10 flex-grow w-full">{children}</main>

        <footer className="relative z-10 w-full py-10 text-center text-sm" style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", color: "var(--muted)" }}>
          <p style={{ fontFamily: "var(--font-display)" }}>© 2026 GourmetReserve — Todos los derechos reservados.</p>
        </footer>
      </body>
    </html>
  );
}