'use client';

import Link from "next/link";

export default function Restaurantes() {
  const listaRestaurantes = [
    { id: 1, nombre: "Asador Álvaro Juan", direccion: "Calle del Coso, 35, Zaragoza", mesasDisponibles: 5 },
    { id: 2, nombre: "Pizzería Apellanis", direccion: "Paseo de la Independencia, 22, Zaragoza", mesasDisponibles: 12 },
    { id: 3, nombre: "Bistró Los Solés", direccion: "Plaza de los Sitios, 10, Zaragoza", mesasDisponibles: 8 },
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
    <div className="flex flex-col space-y-10">
      <h1 className="text-4xl font-serif text-stone-900 border-b pb-6">Restaurantes Asociados</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {listaRestaurantes.map((r) => (
          <div key={r.id} className="bg-white p-8 border border-stone-200 shadow-sm">
            <h2 className="text-2xl font-serif text-rose-900 mb-2">{r.nombre}</h2>
            <p className="text-stone-500 text-sm mb-4">{r.direccion}</p>
            <button 
              onClick={() => manejarReserva(r.nombre)}
              className="w-full bg-stone-900 text-white py-3 uppercase text-xs tracking-widest hover:bg-stone-800"
            >
              Reservar Mesa
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}