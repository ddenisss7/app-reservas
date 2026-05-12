'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase";

export default function Reservas() {
  const router = useRouter();
  const supabase = createClient();

  const [usuario, setUsuario] = useState<string>("");
  const [misReservas, setMisReservas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Primero verificar sesión Supabase
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setLoading(false);
    };

    // Obtener nombre de usuario desde la API
    async function obtenerUsuario() {
      try {
        const respuesta = await fetch('/api/usuarios');
        const datos = await respuesta.json();
        if (datos && datos.length > 0) {
          setUsuario(datos[0].nombre);
        }
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      }
    }

    // Cargar reservas desde localStorage
    const cargarReservasLocales = () => {
      const guardadas = localStorage.getItem('mis_reservas_locales');
      if (guardadas) {
        setMisReservas(JSON.parse(guardadas));
      } else {
        setMisReservas([{ 
          id: 101, restaurante: "Asador Álvaro Juan", fecha: "20 de Marzo, 2026", 
          hora: "21:00", personas: 2, cocina: "Carnes a la Brasa", estado: "Confirmada" 
        }]);
      }
    };

    checkAuth();
    obtenerUsuario();
    cargarReservasLocales();
  }, [router, supabase.auth]);


  const cancelarReserva = (id: number) => {
    if (confirm("¿Estás seguro de que deseas cancelar esta reserva?")) {
      const nuevaLista = misReservas.filter(reserva => reserva.id !== id);
      setMisReservas(nuevaLista);
      localStorage.setItem('mis_reservas_locales', JSON.stringify(nuevaLista));
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
        
        <div className="mb-12 anim-1 flex flex-col items-center text-center w-full">
          <p className="text-xs uppercase tracking-[0.3em] font-medium mb-4 text-gold">✦ Gestión Personal ✦</p>
          <h1 className="font-black leading-tight mb-4" style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', color: 'var(--white)' }}>
            Reservas del <span className="text-shimmer-heavy">{usuario || "Usuario"}</span>
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', maxWidth: '42rem', margin: '1rem'}}>
            Aquí puede ver las reservas realizadas mediante el método POST y consultadas por GET.
          </p>
        </div>

        <div className="anim-2 mx-auto" style={{ borderRadius: '1rem', overflow: 'hidden', width: '100%' }}>
          {misReservas.length > 0 ? (
            <table className="table-dark w-full">
              <thead>
                <tr>
                  <th>Restaurante</th>
                  <th>Cocina</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Pax</th>
                  <th>Estado</th>
                  <th style={{ textAlign: 'right' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {misReservas.map((reserva, idx) => (
                  <tr key={reserva.id} style={{ animation: `fadeUp 0.6s ${0.1 + idx * 0.08}s ease both` }}>
                    <td><span style={{ fontFamily: 'Playfair Display', fontSize: '1.1rem', fontWeight: 600, color: 'var(--white)' }}>{reserva.restaurante}</span></td>
                    <td><span className="badge" style={{ background: 'rgba(212,169,106,0.1)', color: 'var(--gold)', fontSize: '0.7rem' }}>{reserva.cocina}</span></td>
                    <td style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{reserva.fecha}</td>
                    <td style={{ fontWeight: 600, color: 'var(--accent-lit)' }}>{reserva.hora}</td>
                    <td style={{ fontSize: '1.2rem', fontWeight: 700 }}>{reserva.personas}</td>
                    <td><span className="badge badge-available" style={{ fontSize: '0.7rem' }}>{reserva.estado}</span></td>
                    <td style={{ textAlign: 'right' }}>
                      <button onClick={() => cancelarReserva(reserva.id)} className="text-sm opacity-60 hover:opacity-100 transition-opacity" style={{ color: 'var(--accent-lit)', textDecoration: 'underline' }}>Cancelar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-20" style={{ background: 'var(--surface)', borderRadius: '1rem' }}>
              <p className="mb-6 text-muted">No tienes reservas guardadas localmente.</p>
              <Link href="/restaurantes" className="badge badge-cuisine p-4">Ir a reservar →</Link>
            </div>
          )}
        </div>

        {/* ESTADÍSTICAS ORIGINALES */}
        {misReservas.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12 anim-3">
            <div className="flex flex-col items-center p-6 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' , padding:"1rem", margin:"1rem"}}>
              <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--gold)'}}>{misReservas.length}</p>
              <p className="text-xs text-muted uppercase tracking-widest">Total Reservas</p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding:"1rem", margin:"1rem" }}>
              <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--gold)' }}>{misReservas.reduce((acc, curr) => acc + (curr.personas || 0), 0)}</p>
              <p className="text-xs text-muted uppercase tracking-widest">Total Comensales</p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding:"1rem", margin:"1rem"}}>
              <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--gold)' }}>100%</p>
              <p className="text-xs text-muted uppercase tracking-widest">Confirmadas</p>
            </div>
          </div>
        )}

        <div className="pt-12 flex justify-center" style={{padding:"1rem"}}>
          <Link href="/" className="text-sm text-muted hover:text-white transition-colors">← Volver al Menú Principal</Link>
        </div>
      </div>
    </div>
  );
}
