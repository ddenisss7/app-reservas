'use client';

import Link from "next/link";

export default function Restaurantes() {
  const listaRestaurantes = [
    { 
      id: 1, 
      nombre: "Asador Álvaro Juan", 
      direccion: "Calle del Coso, 35, Zaragoza", 
      mesasDisponibles: 5,
      cocina: "Carnes a la Brasa",
      valoracion: "4.8",
      precio: "€€€"
    },
    { 
      id: 2, 
      nombre: "Pizzería Apellaniz", 
      direccion: "Paseo de la Independencia, 22, Zaragoza", 
      mesasDisponibles: 12,
      cocina: "Italiana",
      valoracion: "4.6",
      precio: "€€"
    },
    { 
      id: 3, 
      nombre: "Bistró Los Solés", 
      direccion: "Plaza de los Sitios, 10, Zaragoza", 
      mesasDisponibles: 8,
      cocina: "Francesa",
      valoracion: "4.9",
      precio: "€€€€"
    },
  ];

  const manejarReserva = async (nombre: string) => {
    try {
      const res = await fetch('/api/disponibilidad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurante: nombre, fecha: "2026-04-02" }),
      });
      const data = await res.json();
      alert("Respuesta de la API (POST): " + data.mensaje);
    } catch (error) {
      alert("Error al conectar con la API");
    }
  };

  return (
    <div className="w-full" style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '4rem', paddingBottom: '6rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem', width: '100%' }}>
        
        {/* Header */}
        <div className="mb-16 anim-1 flex flex-col items-center text-center w-full">
          <p className="text-xs uppercase tracking-[0.3em] font-medium mb-4 text-gold">
            ✦ Selección Curada ✦
          </p>
          <h1 
            className="font-black leading-tight mb-4"
            style={{ 
              fontFamily: 'Playfair Display', 
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
              letterSpacing: '-0.02em',
              color: 'var(--white)',
            }}
          >
            Restaurantes <span style={{ color: 'var(--accent-lit)' }}>Asociados</span>
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', maxWidth: '42rem' }}>
            Descubra nuestra selección exclusiva de los mejores restaurantes de Zaragoza. Disponibilidad en tiempo real.
          </p>
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12 items-stretch">
          {listaRestaurantes.map((r, idx) => (
            <div 
              key={r.id} 
              className="rest-card anim-2 flex flex-col"
              style={{ animationDelay: `${0.1 + idx * 0.12}s` }}
            >
              {/* Header with rating — altura fija para que el nombre nunca desplace el resto */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 pr-3">
                  <h2 
                    className="font-bold leading-tight mb-1"
                    style={{ 
                      fontFamily: 'Playfair Display',
                      fontSize: '1.65rem',
                      color: 'var(--white)',
                      letterSpacing: '-0.01em',
                      /* Reserva siempre 2 líneas de título */
                      minHeight: '4.4rem',
                      display: 'flex',
                      alignItems: 'flex-start',
                    }}
                  >
                    {r.nombre}
                  </h2>
                  {/* Reserva siempre 2 líneas de dirección */}
                  <p style={{
                    color: 'var(--muted2)',
                    fontSize: '0.8rem',
                    letterSpacing: '0.02em',
                    minHeight: '2.6rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                  }}>
                    {r.direccion}
                  </p>
                </div>
                <div 
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg flex-shrink-0"
                  style={{ background: 'rgba(212,169,106,0.15)', border: '1px solid rgba(212,169,106,0.25)' }}
                >
                  <span style={{ fontSize: '0.9rem' }}>⭐</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gold)' }}>
                    {r.valoracion}
                  </span>
                </div>
              </div>

              {/* Badges — altura fija para 2 filas, evita que el botón suba/baje */}
              <div
                className="flex flex-wrap gap-2 mb-2"
                style={{ minHeight: '5.5rem', alignContent: 'flex-start' }}
              >
                <span className="badge badge-cuisine">
                  {r.cocina}
                </span>
                <span className="badge badge-available">
                  <span style={{ 
                    width: '5px', 
                    height: '5px', 
                    borderRadius: '50%', 
                    background: '#10b981',
                    display: 'inline-block',
                  }} />
                  {r.mesasDisponibles} mesas disponibles
                </span>
                <span 
                  className="badge"
                  style={{ 
                    background: 'rgba(255,255,255,0.05)', 
                    color: 'var(--muted)',
                    border: '1px solid var(--border)'
                  }}
                >
                  {r.precio}
                </span>
              </div>

              {/* Divider */}
              <div style={{ 
                height: '1px', 
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                margin: '1.5rem 0'
              }} />

              {/* Botón anclado al fondo gracias a mt-auto */}
              <div className="mt-auto">
                <button 
                  onClick={() => manejarReserva(r.nombre)}
                  className="w-full font-semibold rounded-lg text-white text-sm tracking-wide transition-all hover:-translate-y-0.5"
                  style={{ 
                    background: 'var(--accent)', 
                    boxShadow: '0 4px 16px var(--accent-glow)',
                    padding: '0.95rem 1.5rem'
                  }}
                >
                  Reservar Mesa →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Back link */}
        <div className="pt-8 anim-3 flex justify-center">
          <Link 
            href="/" 
            className="text-sm tracking-wide transition-all hover:text-accent-lit"
            style={{ color: 'var(--muted)' }}
          >
            ← Volver al inicio
          </Link>
        </div>

      </div>
    </div>
  );
}
