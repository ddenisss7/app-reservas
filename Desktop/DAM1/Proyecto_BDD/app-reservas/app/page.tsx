import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-10 mt-8">
      
      <h1 className="text-5xl md:text-6xl font-serif text-stone-900 tracking-tight">
        La velada perfecta <br/> comienza aquí
      </h1>
      
      <p className="text-lg text-stone-600 max-w-2xl font-light">
        Descubra los espacios gastronómicos más exclusivos de la ciudad y asegure su mesa con antelación a través de nuestra plataforma de reservas.
      </p>
      
      <div className="flex gap-4 mt-8">
        <Link 
          href="/restaurantes" 
          className="bg-rose-900 hover:bg-rose-950 text-white font-medium py-3 px-8 rounded shadow-md transition-colors tracking-wide"
        >
          Explorar Restaurantes
        </Link>
        
        <Link 
          href="/reservas" 
          className="bg-transparent hover:bg-stone-200 text-stone-900 border border-stone-900 font-medium py-3 px-8 rounded transition-colors tracking-wide"
        >
          Gestionar Reservas
        </Link>
      </div>

      {/* Sección de características */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-20 text-left">
        <div className="bg-white p-8 rounded-sm shadow-sm border border-stone-200">
          <h3 className="text-lg font-serif text-stone-900 mb-3 uppercase tracking-wider">Perfil de Cliente</h3>
          <p className="text-stone-600 font-light leading-relaxed">Gestione sus preferencias y acceda al historial de sus visitas culinarias de manera confidencial.</p>
        </div>
        <div className="bg-white p-8 rounded-sm shadow-sm border border-stone-200">
          <h3 className="text-lg font-serif text-stone-900 mb-3 uppercase tracking-wider">Selección de Locales</h3>
          <p className="text-stone-600 font-light leading-relaxed">Acceda a nuestra cuidada selección de restaurantes con disponibilidad actualizada en tiempo real.</p>
        </div>
        <div className="bg-white p-8 rounded-sm shadow-sm border border-stone-200">
          <h3 className="text-lg font-serif text-stone-900 mb-3 uppercase tracking-wider">Disposición de Mesas</h3>
          <p className="text-stone-600 font-light leading-relaxed">Garantizamos el espacio ideal para su acompañamiento, desde cenas íntimas hasta eventos grupales.</p>
        </div>
      </div>

    </div>
  );
}