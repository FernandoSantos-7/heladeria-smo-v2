import { useState } from 'react';
import { catalogo } from './data/gustos';
import logo from './assets/logo-smo.png';
import banner from './assets/banner-vitrina.jpeg';

function App() {
  const [modalAbierto, setModalAbierto] = useState(null);
  
  // Categorías corregidas: sin Frutales, agregando Agua
  const categorias = ['Chocolate', 'Dulce de Leche', 'Cremas', 'Agua'];

  return (
    <div className="min-h-screen relative font-sans">
      {/* Banner de fondo completo */}
      <div className="fixed inset-0 z-0">
        <img src={banner} alt="Fondo" className="w-full h-full object-cover opacity-30" />
      </div>

      <div className="relative z-10 p-4">
        <header className="flex justify-center mb-8">
          <img src={logo} alt="Logo S'MO" className="h-20 bg-white/50 p-2 rounded-xl" />
        </header>

        <main className="max-w-xl mx-auto space-y-4">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setModalAbierto(cat)}
              className="w-full bg-white/90 p-6 rounded-2xl shadow-lg flex justify-between items-center hover:bg-white transition border-b-4 border-gray-300"
            >
              <span className="font-bold text-[#4a5d4a] uppercase text-lg">{cat}</span>
              <span className="text-[#4a5d4a] font-bold text-sm bg-gray-200 px-3 py-1 rounded-full">VER CATÁLOGO</span>
            </button>
          ))}
        </main>
      </div>

      {/* Modal corregido */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-2xl rounded-2xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-2xl font-bold text-[#4a5d4a] uppercase">{modalAbierto}</h2>
              <button onClick={() => setModalAbierto(null)} className="font-bold text-red-600">CERRAR</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {catalogo.helados.filter(h => h.categoria === modalAbierto).map(h => (
                <div key={h.id} className="border border-gray-200 p-4 rounded-xl hover:border-[#4a5d4a] bg-gray-50">
                  <p className="font-bold text-gray-800">{h.nombre}</p>
                  <p className="text-xs text-gray-600 italic mt-1">{h.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;