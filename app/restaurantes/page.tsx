'use client';

import { useState } from "react";
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

  const [valoresReservas, setValoresReservas] = useState<Record<number, number>>({});

  const manejarReserva = async (r: any) => {
    const numPax = valoresReservas[r.id] || 1;
    try {
      const res = await fetch('/api/disponibilidad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurante: r.nombre, personas: numPax }),
      });
      
      const nuevaReserva = {
        id: Date.now(),
        restaurante: r.nombre,
        fecha: "02 de Abril, 2026",
        hora: "21:00",
        personas: numPax,
        cocina: r.cocina,
        estado: "Confirmada"
      };
      
      const guardadas = JSON.parse(localStorage.getItem('mis_reservas_locales') || '[]');
      localStorage.setItem('mis_reservas_locales', JSON.stringify([...guardadas, nuevaReserva]));

      alert(`Reserva en ${r.nombre} confirmada para ${numPax} personas.`);
    } catch (error) {
      alert("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center" style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '4rem', paddingBottom: '6rem' }}>
      <div className="flex flex-col items-center w-full" style={{ maxWidth: '1100px', padding: '0 2rem' }}>
        
        {/* Header Original */}
        <div className="mb-16 anim-1 flex flex-col items-center text-center w-full">
          <p className="text-xs uppercase tracking-[0.3em] font-medium mb-4 text-gold">✦ Selección Curada ✦</p>
          <h1 className="font-black leading-tight mb-4" style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', letterSpacing: '-0.02em', color: 'var(--white)' }}>
            Restaurantes <span className="text-shimmer-heavy">Asociados</span>
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', maxWidth: '42rem', padding:"1rem" }}>
            Descubra nuestra selección exclusiva de los mejores restaurantes de Zaragoza. Disponibilidad en tiempo real.
          </p>
        </div>

        {/* Grid de Restaurantes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12 items-stretch w-full">
          {listaRestaurantes.map((r, idx) => (
            <div key={r.id} className="rest-card anim-2 flex flex-col" style={{ animationDelay: `${0.1 + idx * 0.12}s` }}>
              
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 pr-3">
                  <h2 className="font-bold leading-tight mb-1" style={{ fontFamily: 'Playfair Display', fontSize: '1.65rem', color: 'var(--white)', minHeight: '4.4rem', display: 'flex', alignItems: 'flex-start' }}>{r.nombre}</h2>
                  <p style={{ color: 'var(--muted2)', fontSize: '0.8rem', minHeight: '2.6rem', display: 'flex', alignItems: 'flex-start' }}>{r.direccion}</p>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg flex-shrink-0" style={{ background: 'rgba(212,169,106,0.15)', border: '1px solid rgba(212,169,106,0.25)' }}>
                  <span style={{ fontSize: '0.9rem' }}>⭐</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gold)' }}>{r.valoracion}</span>
                </div>
              </div>

              {/* Badges: Cocina y Disponibilidad con Precio debajo */}
              <div className="flex flex-col gap-2 mb-2" style={{ minHeight: '5.5rem' }}>
                <div className="flex flex-wrap gap-2">
                  <span className="badge badge-cuisine">{r.cocina}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="badge badge-available w-fit">
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10b981', display: 'inline-block', marginRight: '5px' }} />
                    {r.mesasDisponibles} mesas disponibles
                  </span>
                  <span className="badge w-fit" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
                    {r.precio}
                  </span>
                </div>
              </div>

              <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)', margin: '1.5rem 0' }} />

              {/* Selector de Comensales */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/10 relative z-10">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold" >Comensales</span>
                <div className="flex items-center gap-3">
                  <input 
                    type="number"
                    min="1"
                    max="10"
                    defaultValue="1"
                    onChange={(e) => {
                      const v = parseInt(e.target.value);
                      setValoresReservas(prev => ({ ...prev, [r.id]: isNaN(v) ? 1 : v }));
                    }}
                    className="w-16 bg-black/40 text-center text-white font-bold text-lg rounded-lg border border-gold/30 outline-none py-1 relative z-20"
                    style={{ cursor: 'text' }}
                  />
                  <span className="text-muted text-[10px] uppercase font-bold tracking-tighter">pax</span>
                </div>
              </div>

              <div className="mt-16" style={{padding:"1rem"}} > 
                <button 
                  onClick={() => manejarReserva(r)}
                  className="shimmer-effect w-full font-semibold rounded-lg text-white text-sm tracking-wide transition-all hover:-translate-y-0.5"
                  style={{ 
                    background: 'var(--accent)', 
                    boxShadow: '0 4px 16px var(--accent-glow)', 
                    padding: '1.3rem 2rem', 
                    position: 'relative', 
                    overflow: 'hidden' 
                  }}
                >
                  Reservar Mesa →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-8 anim-3 flex justify-center w-full">
          <Link href="/" className="text-sm tracking-wide transition-all hover:text-accent-lit text-muted">← Volver al inicio</Link>
        </div>
      </div>
    </div>
  );
}
