'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase";

export default function Reservas() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  
  // Datos de ejemplo (Luego podrás traerlos de Supabase)
  const [misReservas, setMisReservas] = useState([
    { 
      id: 101, 
      restaurante: "Asador Álvaro Juan", 
      fecha: "20 de Marzo, 2026", 
      hora: "21:00", 
      personas: 2,
      cocina: "Carnes a la Brasa",
      estado: "Confirmada"
    },
    { 
      id: 102, 
      restaurante: "Pizzería Apellaniz", 
      fecha: "25 de Marzo, 2026", 
      hora: "14:30", 
      personas: 4,
      cocina: "Italiana",
      estado: "Confirmada"
    },
  ]);

  // PROTECCIÓN DE RUTA: Redirigir si no hay sesión
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router, supabase.auth]);

  const cancelarReserva = (id: number) => {
    if (confirm("¿Estás seguro de que deseas cancelar esta reserva?")) {
      const nuevaLista = misReservas.filter(reserva => reserva.id !== id);
      setMisReservas(nuevaLista);
      alert("Reserva cancelada exitosamente");
    }
  };

  // Pantalla de carga mientras verifica sesión
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <p className="text-gold animate-pulse uppercase tracking-widest text-xs">Verificando credenciales...</p>
      </div>
    );
  }

  return (
    <div className="w-full" style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '4rem', paddingBottom: '6rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem', width: '100%' }}>
        
        {/* HEADER */}
        <div className="mb-12 anim-1 flex flex-col items-center text-center w-full">
          <p className="text-xs uppercase tracking-[0.3em] font-medium mb-4 text-gold" style={{ display: 'block', width: '100%' }}>
            ✦ Gestión Personal ✦
          </p>
          <h1 
            className="font-black leading-tight mb-4"
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
              letterSpacing: '-0.02em',
              color: 'var(--white)',
              width: '100%'
            }}
          >
            Mis <span style={{ color: 'var(--accent-lit)' }}>Reservas</span>
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', maxWidth: '42rem', marginLeft: 'auto', marginRight: 'auto' }}>
            Gestione y realice seguimiento de todas sus próximas experiencias gastronómicas.
          </p>
        </div>

        {/* Table Container */}
        <div className="anim-2 mx-auto" style={{ borderRadius: '1rem', overflow: 'hidden', width: '100%' }}>
          {misReservas.length > 0 ? (
            <div className="overflow-x-auto shadow-2xl" style={{ border: '1px solid var(--border)', borderRadius: '1rem' }}>
              <table className="table-dark w-full">
                <thead>
                  <tr>
                    <th>Restaurante</th>
                    <th>Cocina</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Comensales</th>
                    <th>Estado</th>
                    <th style={{ textAlign: 'right' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {misReservas.map((reserva, idx) => (
                    <tr 
                      key={reserva.id}
                      style={{ 
                        animation: `fadeUp 0.6s ${0.1 + idx * 0.08}s ease both`,
                        opacity: 0
                      }}
                    >
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 600, color: 'var(--white)' }}>
                            {reserva.restaurante}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--muted2)' }}>
                            ID: {reserva.id}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="badge" style={{ background: 'rgba(212,169,106,0.12)', color: 'var(--gold)', border: '1px solid rgba(212,169,106,0.2)', fontSize: '0.7rem' }}>
                          {reserva.cocina}
                        </span>
                      </td>
                      <td><span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{reserva.fecha}</span></td>
                      <td>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(159,18,57,0.15)', border: '1px solid rgba(159,18,57,0.25)' }}>
                          <span style={{ fontSize: '0.9rem' }}>🕐</span>
                          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, color: 'var(--accent-lit)' }}>{reserva.hora}</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--white)', lineHeight: 1 }}>{reserva.personas}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--muted2)' }}>{reserva.personas === 1 ? 'persona' : 'personas'}</span>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-available" style={{ fontSize: '0.7rem' }}>
                          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10b981', display: 'inline-block', marginRight: '5px' }} />
                          {reserva.estado}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={() => cancelarReserva(reserva.id)}
                          className="text-sm font-medium tracking-wide transition-all hover:text-rose-500 underline underline-offset-4"
                          style={{ color: 'var(--muted2)' }}
                        >
                          Cancelar →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '5rem 2rem' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem', opacity: 0.3 }}>📅</div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontStyle: 'italic', color: 'var(--muted)', marginBottom: '2rem' }}>
                No tienes reservas activas en este momento
              </p>
              <Link href="/restaurantes" className="inline-block font-semibold rounded-lg text-white text-sm tracking-wide transition-all hover:-translate-y-px" style={{ background: 'var(--accent)', boxShadow: '0 4px 16px var(--accent-glow)', padding: '0.95rem 2rem' }}>
                Explorar Restaurantes →
              </Link>
            </div>
          )}
        </div>

        {/* STATS */}
        {misReservas.length > 0 && (
          <div className="flex justify-center w-full mt-12 anim-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl w-full" style={{ padding: "1rem" }}>
              <div className="flex flex-col items-center justify-center text-center rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '2rem' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--accent-lit)', marginBottom: '0.5rem' }}>{misReservas.length}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Reservas Activas</p>
              </div>
              <div className="flex flex-col items-center justify-center text-center rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '2rem' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--accent-lit)', marginBottom: '0.5rem' }}>{misReservas.reduce((sum, r) => sum + r.personas, 0)}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Comensales Totales</p>
              </div>
              <div className="flex flex-col items-center justify-center text-center rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '2rem' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--accent-lit)', marginBottom: '0.5rem' }}>100%</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Confirmación</p>
              </div>
            </div>
          </div>
        )}

        <div className="pt-12 anim-4 flex justify-center">
          <Link href="/" className="text-sm tracking-wide transition-all hover:text-white" style={{ color: 'var(--muted)' }}>
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}