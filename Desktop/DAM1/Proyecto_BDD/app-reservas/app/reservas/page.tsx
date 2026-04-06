'use client'; // Importante para usar interactividad

import { useState } from "react";
import Link from "next/link";

export default function Reservas() {
  // Convertimos la lista estática en un estado dinámico
  const [misReservas, setMisReservas] = useState([
    { id: 101, restaurante: "Asador Álvaro Juan", fecha: "20 de Marzo, 2026", hora: "21:00", personas: 2 },
    { id: 102, restaurante: "Pizzería Apellanis", fecha: "25 de Marzo, 2026", hora: "14:30", personas: 4 },
  ]);

  // Función para eliminar una reserva de la vista
  const cancelarReserva = (id: number) => {
    if (confirm("¿Estás seguro de que deseas cancelar esta reserva?")) {
      // Filtramos la lista para quitar la que tenga ese ID
      const nuevaLista = misReservas.filter(reserva => reserva.id !== id);
      setMisReservas(nuevaLista);
      alert("Reserva cancelada visualmente.");
    }
  };

  return (
    <div className="flex flex-col space-y-10 max-w-4xl mx-auto">
      <div className="border-b border-stone-300 pb-6">
        <h1 className="text-4xl font-serif text-stone-900">Mis Reservas</h1>
        <p className="text-stone-500 mt-3 font-light">Historial y gestión de sus próximas visitas.</p>
      </div>

      <div className="bg-white shadow-sm border border-stone-200">
        {misReservas.length > 0 ? (
          <table className="min-w-full divide-y divide-stone-200">
            <thead className="bg-stone-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-stone-600 uppercase tracking-widest">Restaurante</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-stone-600 uppercase tracking-widest">Fecha y Hora</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-stone-600 uppercase tracking-widest">Comensales</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-stone-600 uppercase tracking-widest">Gestión</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-stone-100">
              {misReservas.map((reserva) => (
                <tr key={reserva.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-5 whitespace-nowrap font-serif text-stone-900 text-lg">{reserva.restaurante}</td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-stone-600">{reserva.fecha} — {reserva.hora}</td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-stone-600">{reserva.personas} personas</td>
                  <td className="px-6 py-5 whitespace-nowrap text-right text-sm">
                    <button 
                      onClick={() => cancelarReserva(reserva.id)}
                      className="text-rose-800 hover:text-rose-950 uppercase tracking-wider text-xs font-semibold transition-colors"
                    >
                      Cancelar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-10 text-center text-stone-500 italic">
            No tienes reservas activas en este momento.
          </div>
        )}
      </div>

      <div className="pt-6">
        <Link href="/" className="text-stone-500 hover:text-stone-900 uppercase text-sm tracking-widest transition-colors">
          &larr; Volver al inicio
        </Link>
      </div>
    </div>
  );
}