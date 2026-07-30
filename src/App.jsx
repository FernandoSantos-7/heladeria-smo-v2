// src/App.jsx
import { useState } from "react";
import HeaderBanner from "./components/layout/HeaderBanner";
import NavegacionSecciones from "./components/layout/NavegacionSecciones";
import SeccionPotes from "./components/pedidos/SeccionPotes";
import SeccionCategorias from "./components/catalogo/SeccionCategorias";
import SeccionPaletas from "./components/paletas/SeccionPaletas";
import SeccionTortas from "./components/tortas/SeccionTortas";
import SeccionPostres from "./components/postres/SeccionPostres";
import ResumenPedido from "./components/pedidos/ResumenPedido";
import DatosCliente from "./components/pedidos/DatosCliente";
import { useCarrito } from "./hooks/useCarrito";
import { validarDatosCliente } from "./utils/validarDatosCliente";
import logoWatermark from "./assets/logo-smo.png";
import SeccionBlister from "./components/blister/SeccionBlister";
import SeccionVasitos from "./components/vasitos/SeccionVasitos";
import SeccionCafeteria from "./components/cafeteria/SeccionCafeteria";
import FooterLocal from "./components/layout/FooterLocal";

const ID_POTE_CUARTO = "pote-1-4-kilo";
const MINIMO_POTE_CUARTO = 2;

function App() {
  const [seccionActiva, setSeccionActiva] = useState("potes");
  const [poteElegido, setPoteElegido] = useState(null);
  const [gustosElegidos, setGustosElegidos] = useState([]);
  const [datosCliente, setDatosCliente] = useState({ nombre: "", telefono: "", direccion: "" });
  const [errores, setErrores] = useState({});
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false);

  const {
    items,
    agregarItem,
    quitarItem,
    cambiarCantidad,
    total,
    cumpleMinimo,
    faltaParaMinimo,
  } = useCarrito();

  const cantidadPoteCuarto = items
  .filter((it) => it.id === ID_POTE_CUARTO)
  .reduce((acc, it) => acc + it.cantidad, 0);

// ¿Hay algún producto que NO sea un pote de 1/4?
const hayOtrosProductos = items.some((it) => it.id !== ID_POTE_CUARTO);

// La restricción solo aplica cuando el pedido tiene únicamente potes de 1/4
const faltanCuartos =
  cantidadPoteCuarto > 0 &&
  cantidadPoteCuarto < MINIMO_POTE_CUARTO &&
  !hayOtrosProductos;

function elegirPote(pote) {
  setPoteElegido(pote);
  setGustosElegidos([]);
}

function agregarAlCarrito() {
    if (!poteElegido || gustosElegidos.length === 0) return;

    agregarItem({
      id: poteElegido.id,
      tipo: "pote",
      nombre: `${poteElegido.nombre} (${gustosElegidos.join(", ")})`,
      precio: poteElegido.precio,
    });
    setPoteElegido(null);
    setGustosElegidos([]);
  }

  function confirmarPedido() {
    const nuevosErrores = validarDatosCliente(datosCliente);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) return;
    if (!cumpleMinimo) return;
    if (faltanCuartos) return;

    setPedidoConfirmado(true);
  }

  return (
    <div className="min-h-screen bg-[#e8ede8] font-sans p-4 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${logoWatermark})`,
          backgroundRepeat: "repeat",
          backgroundSize: "150px 150px",
          opacity: 0.05,
          mixBlendMode: "multiply",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
            <HeaderBanner />
  
        <main className="max-w-xl mx-auto mt-4">
          <NavegacionSecciones
            seccionActiva={seccionActiva}
            onCambiarSeccion={setSeccionActiva}
          />

          {seccionActiva === "potes" && (
            <>
              <SeccionPotes poteElegido={poteElegido} onElegirPote={elegirPote} />

              <SeccionCategorias
                poteElegido={poteElegido}
                gustosElegidos={gustosElegidos}
                onCambiarGustos={setGustosElegidos}
              />

              {poteElegido && gustosElegidos.length > 0 && (
                <button
                  onClick={agregarAlCarrito}
                  className="w-full bg-[#4a5d4a] text-white font-bold py-3 rounded-xl mb-6 hover:bg-[#3d4d3d] transition"
                >
                  Agregar al pedido
                </button>
              )}
            </>
          )}

          {seccionActiva === "paletas" && (
            <SeccionPaletas onAgregarAlCarrito={agregarItem} />
          )}

          {seccionActiva === "tortas" && (
            <SeccionTortas onAgregarAlCarrito={agregarItem} />
          )}

          {seccionActiva === "postres" && (
            <SeccionPostres onAgregarAlCarrito={agregarItem} />
          )}
          {seccionActiva === "blister" && (
            <SeccionBlister onAgregarAlCarrito={agregarItem} />
          )}
          {seccionActiva === "vasitos" && (
           <SeccionVasitos onAgregarAlCarrito={agregarItem} />
          )}
          {seccionActiva === "cafeteria" && 
          ( <SeccionCafeteria />)}

          <ResumenPedido
            items={items}
            total={total}
            cumpleMinimo={cumpleMinimo}
            faltaParaMinimo={faltaParaMinimo}
            onCambiarCantidad={cambiarCantidad}
            onQuitarItem={quitarItem}
          />

          {faltanCuartos && (
            <p className="text-xs text-[#a9762f] bg-[#f7ecd9] border border-[#e8d3a5] rounded-lg p-3 mb-4">
              Tenés {cantidadPoteCuarto} Un pote de 1/4 kg en el pedido.
              Si el pedido contiene únicamente un potes de 1/4 kg, el mínimo es de {MINIMO_POTE_CUARTO} unidades.
              También podés agregar cualquier otro producto y continuar con tu compra.
            </p>
          )}

          {items.length > 0 && (
            <>
              <DatosCliente
                datos={datosCliente}
                onCambiarDatos={setDatosCliente}
                errores={errores}
              />

              <button
                onClick={confirmarPedido}
                disabled={!cumpleMinimo || faltanCuartos}
                className="w-full bg-[#4a5d4a] text-white font-bold py-3 rounded-xl disabled:opacity-40 hover:bg-[#3d4d3d] transition"
              >
                Confirmar pedido
              </button>

              {pedidoConfirmado && (
                <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                  ¡Pedido confirmado! (Acá en el próximo paso lo mandamos por WhatsApp)
                </p>
              )}
            </>
          )}
                <FooterLocal />
        </main>
      </div>
    </div>
  );
}

export default App;