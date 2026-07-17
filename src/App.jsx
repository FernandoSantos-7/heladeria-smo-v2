import { catalogo } from './data/gustos';
import { productos } from './data/productos';
import logo from './assets/logo-smo.png';
import banner from './assets/banner-vitrina.jpeg';

function App() {
  const categorias = [
    { nombre: 'Chocolate', color: 'bg-amber-800' },
    { nombre: 'Dulce de Leche', color: 'bg-orange-800' },
    { nombre: 'Cremas', color: 'bg-yellow-700' },
    { nombre: 'Frutales', color: 'bg-green-800' }
  ];

  return (
    // Fondo verde crema con logo de agua repetido
    <div className="min-h-screen bg-[#e8ede8] bg-[url('/assets/logo-smo.png')] bg-repeat opacity-90">
      
      {/* Header */}
      <header className="flex justify-center p-6 bg-white shadow-md">
        <img src={logo} alt="Logo S'MO" className="h-16" />
      </header>
      
      {/* Banner */}
      <section className="w-full h-80 overflow-hidden shadow-lg border-b-8 border-[#4a5d4a]">
        <img src={banner} alt="Vitrina" className="w-full h-full object-cover" />
      </section>

      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white/90 p-8 rounded-3xl shadow-xl border border-gray-200">
            <h2 className="text-3xl font-bold text-center text-[#4a5d4a] mb-10">Nuestros Gustos</h2>

            {/* Grilla de bloques */}
            <div className="grid md:grid-cols-2 gap-8">
              {categorias.map(cat => (
                <div key={cat.nombre} className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-[#4a5d4a]">
                  <h3 className="text-xl font-bold text-[#4a5d4a] mb-4 border-b pb-2">{cat.nombre}</h3>
                  <div className="space-y-3">
                    {catalogo.helados.filter(h => h.categoria === cat.nombre).map(h => (
                      <div key={h.id} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <p className="font-bold text-gray-800">{h.nombre}</p>
                        <p className="text-xs text-gray-600">{h.descripcion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
        </div>
      </main>
    </div>
  );
}

export default App;