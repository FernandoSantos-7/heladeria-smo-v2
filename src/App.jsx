import { useState } from "react";
import logo from "./assets/logo-smo.png";
import SeccionPotes from "./components/pedidos/SeccionPotes";
import SeccionCategorias from "./components/catalogo/SeccionCategorias";
import { useCarrito } from "./hooks/useCarrito";

function App() {
  const [poteElegido, setPoteElegido] = useState(null);
  const [gustosElegidos, setGustosElegidos] = useState([]);
  const { items, agregarItem, total, cumpleMinimo, faltaParaMinimo } = useCarrito();

  function elegirPote(pote) {
    setPoteElegido(pote);
    setGustosElegidos([]); // al cambiar de pote, reinicia los gustos
  }

  function agregarAlCarrito() {
    agregarItem({
      id: poteElegido.id,
      tipo: "pote",
      nombre: `${poteElegido.nombre} (${gustosElegidos.join(", ")})`,
      precio: poteElegido.precio,
    });
    setPoteElegido(null);
    setGustosElegidos([]);
  }

  return (
    <div className="min-h-screen bg-[#e8ede8] font-sans p-4">
      <header className="flex justify-center my-8">
        <img src={logo} alt="Logo S'MO" className="h-20" />
      </header>

      <main className="max-w-xl mx-auto">
        <SeccionPotes poteElegido={poteElegido} onElegirPote={elegirPote} />

        <SeccionCategorias
          poteElegido={poteElegido}
          gustosElegidos={gustosElegidos}
          onCambiarGustos={setGustosElegidos}
        />

        {poteElegido && gustosElegidos.length > 0 && (
          <button
            onClick={agregarAlCarrito}
            className="w-full bg-[#4a5d4a] text-white font-bold py-3 rounded-xl mb-6"
          >
            Agregar al pedido
          </button>
        )}

        {items.length > 0 && (
          <section className="bg-white rounded-xl p-4 shadow-sm">
            <p className="font-bold text-gray-800 mb-2">Tu pedido</p>
            {items.map((it, i) => (
              <div key={i} className="flex justify-between text-sm py-1 border-b">
                <span>{it.nombre}</span>
                <span>${it.precio.toLocaleString("es-AR")}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold mt-3">
              <span>Total</span>
              <span>${total.toLocaleString("es-AR")}</span>
            </div>
            {!cumpleMinimo && (
              <p className="text-xs text-red-600 mt-2">
                Faltan ${faltaParaMinimo.toLocaleString("es-AR")} para llegar al mínimo de compra.
              </p>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
