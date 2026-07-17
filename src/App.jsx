import { useState } from 'react';
import { catalogo } from './data/gustos';
import logo from './assets/logo-smo.png';

function App() {
  const [modalAbierto, setModalAbierto] = useState(null);
  
  // Categorías fijas, sin errores
  const categorias = ['Chocolate', 'Dulce de Leche', 'Cremas', 'Agua'];

  return (
    <div className="min-h-screen bg-[#e8ede8] font-sans p-4">
      <header className="flex justify-center my-8">
        <img src={logo} alt="Logo S'MO" className="h-20" />
      </header>

      <main className="max-w-xl mx-auto space-y-4">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setModalAbierto(cat)}
            className="w-full bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center hover:shadow-md transition"
          >
            <span className="font-bold text-gray-700 uppercase">{cat}</span>
            <span className="text-[#4a5d4a] font-bold text-xs underline">VER CATÁLOGO</span>
          </button>
        ))}
      </main>

      {/* Modal funcional */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="font-bold text-gray-800 uppercase">{modalAbierto}</h2>
              <button onClick={() => setModalAbierto(null)} className="text-sm text-red-600 font-bold">CERRAR</button>
            </div>
            
            <div className="overflow-y-auto space-y-3 pr-2">
              {catalogo.helados
                .filter(h => h.categoria === modalAbierto)
                .map(h => (
                  <div key={h.id} className="border-b pb-2">
                    <p className="font-bold text-sm text-gray-800">{h.nombre}</p>
                    <p className="text-xs text-gray-500">{h.descripcion}</p>
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