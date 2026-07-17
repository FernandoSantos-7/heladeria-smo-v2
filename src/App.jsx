import { catalogo } from './data/gustos';
import { productos } from './data/productos';
import logo from './assets/logo-smo.png';
import banner from './assets/banner-vitrina.jpeg';

function App() {
  const categorias = [
    { nombre: 'Chocolate', color: 'bg-amber-100' },
    { nombre: 'Dulce de Leche', color: 'bg-orange-100' },
    { nombre: 'Cremas', color: 'bg-yellow-50' },
    { nombre: 'Frutales', color: 'bg-green-100' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex justify-center p-6 bg-white shadow-sm">
        <img src={logo} alt="Logo S'MO" className="h-16" />
      </header>
      
      {/* Banner más alto (más "gordo") */}
      <section className="w-full h-80 overflow-hidden shadow-lg">
        <img src={banner} alt="Vitrina" className="w-full h-full object-cover" />
      </section>

      <main className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-center text-smo-verde mb-10">Nuestros Gustos</h2>

        {/* Grilla de bloques */}
        <div className="grid md:grid-cols-2 gap-6">
          {categorias.map(cat => (
            <div key={cat.nombre} className={`${cat.color} p-6 rounded-2xl shadow-md border-b-4 border-gray-200`}>
              <h3 className="text-2xl font-bold text-smo-verde mb-4 border-b border-smo-verde pb-2">{cat.nombre}</h3>
              <div className="space-y-3">
                {catalogo.helados.filter(h => h.categoria === cat.nombre).map(h => (
                  <div key={h.id} className="bg-white/50 p-3 rounded-lg">
                    <p className="font-bold text-gray-800">{h.nombre}</p>
                    <p className="text-xs text-gray-600">{h.descripcion}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;