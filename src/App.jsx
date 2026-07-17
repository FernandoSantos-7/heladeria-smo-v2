import { useState } from 'react';
import { catalogo } from './data/gustos';
import logo from './assets/logo-smo.png';

function App() {
  const [modalAbierto, setModalAbierto] = useState(null); // Guarda qué categoría está abierta

  const categorias = ['Chocolate', 'Dulce de Leche', 'Cremas', 'Frutales'];

  return (
    <div className="min-h-screen bg-[#e1e7e1] p-4 font-sans">
      <header className="flex justify-center mb-6">
        <img src={logo} alt="Logo S'MO" className="h-16" />
      </header>

      <main className="max-w-2xl mx-auto space-y-4">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setModalAbierto(cat)}
            className="w-full bg-white p-6 rounded-2xl shadow-md flex justify-between items-center hover:bg-gray-50 transition"
          >
            <span className="font-bold text-[#4a5d4a] uppercase tracking-wide">{cat}</span>
            <span className="text-[#4a5d4a] font-bold text-sm">VER CATÁLOGO</span>
          </button>
        ))}
      </main>

      {/* Modal - Solo aparece si modalAbierto tiene un valor */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-2xl rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-xl font-bold text-[#4a5d4a] uppercase">{modalAbierto}</h2>
              <button onClick={() => setModalAbierto(null)} className="font-bold text-gray-500">CERRAR</button>
            </div>
            
            {/* Grilla de gustos de a 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {catalogo.helados.filter(h => h.categoria === modalAbierto).map(h => (
                <div key={h.id} className="border border-gray-200 p-4 rounded-xl hover:border-[#4a5d4a] transition">
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