import { useState } from 'react';
import { catalogo } from './data/gustos';
import { productos } from './data/productos';
import { paletas } from './data/paletas';
import { tortas } from './data/tortas';
import { postres } from './data/postres';
import logo from './assets/logo-smo.png';
import banner from './assets/banner-vitrina.jpeg';

const Acordeon = ({ titulo, children }) => {
  const [abierto, setAbierto] = useState(false);
  return (
    <section className="mb-2">
      <button 
        onClick={() => setAbierto(!abierto)}
        className="w-full flex justify-between items-center p-4 bg-white border-b border-gray-200 font-bold text-gray-700 hover:bg-gray-50"
      >
        {titulo}
        <span>{abierto ? '▲' : '▼'}</span>
      </button>
      {abierto && <div className="p-4 bg-gray-50">{children}</div>}
    </section>
  );
};

function App() {
  // Definimos las categorías exactas que querés mostrar
  const categorias = ['Chocolate', 'Cremas', 'Dulce de Leche', 'Frutales'];

  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      <header className="flex justify-center p-4 bg-white shadow-sm">
        <img src={logo} alt="Logo S'MO" className="h-12" />
      </header>
      
      <section className="w-full h-48 overflow-hidden">
        <img src={banner} alt="Vitrina" className="w-full h-full object-cover" />
      </section>

      <main className="max-w-2xl mx-auto mt-4 bg-white shadow-sm">
        <h2 className="text-center font-bold p-4">¿Qué vas a pedir hoy?</h2>

        <Acordeon titulo="1. Elegí tu Pote">
          {productos.potes.map(p => (
            <div key={p.id} className="p-2 border-b">{p.nombre}</div>
          ))}
        </Acordeon>

        <Acordeon titulo="2. Consultá nuestros Gustos">
          {categorias.map(cat => (
            <div key={cat} className="mb-4">
              <h3 className="font-bold text-sm text-smo-verde uppercase border-b border-smo-verde mb-2">{cat}</h3>
              {catalogo.helados.filter(h => h.categoria === cat).map(h => (
                <div key={h.id} className="mb-2">
                  <p className="font-bold text-gray-800">{h.nombre}</p>
                  <p className="text-xs text-gray-500">{h.descripcion}</p>
                </div>
              ))}
            </div>
          ))}
        </Acordeon>

        <Acordeon titulo="3. Paletas Artesanales">
          {paletas.map(p => <div key={p.id} className="p-2 border-b">{p.nombre}</div>)}
        </Acordeon>

        <Acordeon titulo="4. Tortas y Mini Tortas">
          {[...tortas.mini, ...tortas.grandes].map(t => <div key={t.id} className="p-2 border-b">{t.nombre}</div>)}
        </Acordeon>

        <Acordeon titulo="5. Postres Especiales">
          {postres.map(p => <div key={p.id} className="p-2 border-b">{p.nombre}</div>)}
        </Acordeon>
      </main>
    </div>
  );
}

export default App;