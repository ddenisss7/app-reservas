import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reservas | Alta cocina",
  description: "Sistema de reservas de restaurantes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} flex flex-col min-h-screen bg-stone-50`}>
        
        {/* NAVBAR SUPERIOR */}
        <nav className="bg-stone-900 text-stone-100 shadow-md border-b border-stone-700">
          <div className="max-w-6xl mx-auto px-4 py-5 flex justify-between items-center">
            <Link href="/" className="text-2xl font-serif tracking-wider font-semibold">
              ReservaApp
            </Link>
            <div className="space-x-8 text-sm uppercase tracking-widest font-medium">
              <Link href="/" className="hover:text-amber-500 transition-colors">Inicio</Link>
              <Link href="/restaurantes" className="hover:text-amber-500 transition-colors">Restaurantes</Link>
              <Link href="/reservas" className="hover:text-amber-500 transition-colors">Mis Reservas</Link>
            </div>
          </div>
        </nav>

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-grow max-w-6xl mx-auto px-4 py-12 w-full">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="bg-stone-950 text-stone-300 py-8 mt-auto border-t border-stone-800">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="font-serif tracking-wide">© 2026 - GourmetReserve.</p>
            <p className="text-xs text-stone-500 mt-3 uppercase tracking-widest">Gestión de Alta Cocina</p>
          </div>
        </footer>

      </body>
    </html>
  );
}