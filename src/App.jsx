import { catalogo } from './data/gustos';
import { productos } from './data/productos';
import logo from './assets/logo-smo.png';
import banner from './assets/banner-vitrina.jpeg';

function App() {
  const categorias = ['Chocolate', 'Dulce de Leche', 'Cremas', 'Frutales'];

  return (
    <div className="min-h-screen bg-[#e8ede8] p-4 font-sans">
      <header className="flex justify-center mb-6">
        <img src={logo} alt="Logo S'MO" className="h-16" />
      </header>

      <section className="w-full h-40 overflow-hidden rounded-2xl shadow-lg mb-6">
        <img src={banner} alt="Vitrina" className="w-full h-full object-cover" />
      </section>

      <main className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-[#4a5d4a] mb-6">Nuestros Gustos</h2>
        
        {/* Grilla de 2 columnas donde cada caja tiene altura fija */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categorias.map((cat) => (
            <div key={cat} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col">
              <h3 className="font-bold text-[#4a5d4a] border-b border-[#4a5d4a] pb-1 mb-3 shrink-0">{cat}</h3>
              
              {/* Contenedor con altura fija y scroll interno */}
              <div className="h-64 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                {catalogo.helados
                  .filter((h) => h.categoria === cat)
                  .map((h) => (
                    <div key={h.id} className="border-b border-gray-100 pb-2">
                      <p className="font-bold text-gray-800 text-sm">{h.nombre}</p>
                      <p className="text-xs text-gray-500 italic">{h.descripcion}</p>
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