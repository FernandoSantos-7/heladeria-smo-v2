import { useState } from 'react';
import { catalogo } from './data/gustos';
import { productos } from './data/productos';
import { paletas } from './data/paletas';
import { tortas } from './data/tortas';
import { postres } from './data/postres';
import logo from './assets/logo-smo.png';
import banner from './assets/banner-vitrina.jpeg';

// Componente reutilizable para los desplegables
const Acordeon = ({ titulo, children }) => {
  const [abierto, setAbierto] = useState(false);
  return (
    <section className="mb-4">
      <button 
        onClick={() => setAbierto(!abierto)}
        className="w-full flex justify-between items-center p-4 bg-white border-2 border-smo-verde rounded-xl shadow-sm text-smo-verde font-bold text-lg hover:bg-green-50 transition-all"
      >
        {titulo}
        <span>{abierto ? '▲' : '▼'}</span>
      </button>
      {abierto && <div className="p-4 bg-white border-x border-b border-green-100 rounded-b-xl animate-fade-in">{children}</div>}
    </section>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <header className="flex justify-center p-4 bg-white shadow-md">
        <img src={logo} alt="Logo S'MO" className="h-20" />
      </header>
      
      <section className="w-full h-64 overflow-hidden">
        <img src={banner} alt="Vitrina" className="w-full h-full object-cover" />
      </section>

      <main className="max-w-2xl mx-auto p-4">
        
        <h2 className="text-xl font-bold text-center text-gray-700 mb-6">¿Qué vas a pedir hoy?</h2>

        <Acordeon titulo="1. Elegí tu Pote">
          {productos.potes.map(p => (
            <div key={p.id} className="p-3 border-b last:border-0 flex justify-between items-center">
              <span className="font-medium text-gray-800">{p.nombre}</span>
              <button className="bg-smo-verde text-white px-4 py-1 rounded-lg text-sm">Agregar</button>
            </div>
          ))}
        </Acordeon>

        <Acordeon titulo="2. Consultá nuestros Gustos">
          {catalogo.helados.map((h) => (
            <div key={h.id} className="p-3 border-b last:border-0">
              <h3 className="font-bold text-smo-verde">{h.nombre}</h3>
              <p className="text-xs text-gray-500">{h.descripcion}</p>
            </div>
          ))}
        </Acordeon>

        <Acordeon titulo="3. Paletas Artesanales">
          {paletas.map((p) => (
            <div key={p.id} className="p-3 border-b last:border-0">
              <h3 className="font-bold text-smo-verde">{p.nombre}</h3>
            </div>
          ))}
        </Acordeon>

        <Acordeon titulo="4. Tortas y Mini Tortas">
          {[...tortas.mini, ...tortas.grandes].map(t => (
            <div key={t.id} className="p-3 border-b last:border-0">
              <h3 className="font-bold text-smo-verde">{t.nombre}</h3>
            </div>
          ))}
        </Acordeon>

        <Acordeon titulo="5. Postres Especiales">
          {postres.map((p) => (
            <div key={p.id} className="p-3 border-b last:border-0">
              <h3 className="font-bold text-smo-verde">{p.nombre}</h3>
            </div>
          ))}
        </Acordeon>

      </main>
    </div>
  );
}

export default App;