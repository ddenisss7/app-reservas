import Link from "next/link";

export default function Restaurantes() {
  const listaRestaurantes = [
    { id: 1, nombre: "Asador Álvaro Juan", direccion: "Calle del Coso, 35, Zaragoza", mesasDisponibles: 5 },
    { id: 2, nombre: "Pizzería Apellanis", direccion: "Paseo de la Independencia, 22, Zaragoza", mesasDisponibles: 12 },
    { id: 3, nombre: "Bistró Los Solés", direccion: "Plaza de los Sitios, 10, Zaragoza", mesasDisponibles: 8 },
  ];

  return (
    <div className="flex flex-col space-y-10">
      <div className="border-b border-stone-300 pb-6">
        <h1 className="text-4xl font-serif text-stone-900">Restaurantes Asociados</h1>
        <p className="text-stone-500 mt-3 font-light">Seleccione un establecimiento para consultar disponibilidad en Zaragoza.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {listaRestaurantes.map((restaurante) => (
          <div key={restaurante.id} className="bg-white p-8 shadow-sm border border-stone-200 hover:border-stone-400 transition-colors">
            <h2 className="text-2xl font-serif text-rose-900 mb-1">{restaurante.nombre}</h2>
            <p className="text-stone-500 text-sm italic mb-4">{restaurante.direccion}</p>
            
            <div className="bg-stone-100 text-stone-700 text-xs uppercase tracking-widest font-semibold px-3 py-2 inline-block mb-6">
              {restaurante.mesasDisponibles} mesas libres
            </div>
            
            <button className="w-full bg-stone-900 hover:bg-stone-800 text-stone-100 uppercase tracking-widest text-sm py-3 transition-colors">
              Reservar Mesa
            </button>
          </div>
        ))}
      </div>
      
      <div className="pt-6">
        <Link href="/" className="text-stone-500 hover:text-stone-900 uppercase text-sm tracking-widest transition-colors">
          &larr; Volver al inicio
        </Link>
      </div>
    </div>
  );
}