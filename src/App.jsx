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
import logoMercadoPago from "./assets/mercadopago.png";
import SeccionBlister from "./components/blister/SeccionBlister";
import SeccionVasitos from "./components/vasitos/SeccionVasitos";
import SeccionCafeteria from "./components/cafeteria/SeccionCafeteria";
import FooterLocal from "./components/layout/FooterLocal";
import { Check } from "lucide-react";

const ID_POTE_CUARTO = "pote-1-4-kilo";
const MINIMO_POTE_CUARTO = 2;
const WHATSAPP_NUMERO = "5491154229565";

function App() {
  const [seccionActiva, setSeccionActiva] = useState("potes");
  const [poteElegido, setPoteElegido] = useState(null);
  const [gustosElegidos, setGustosElegidos] = useState([]);
  const [datosCliente, setDatosCliente] = useState({ nombre: "", telefono: "", direccion: "" });
  const [errores, setErrores] = useState({});
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false);
  const [metodoPago, setMetodoPago] = useState("Efectivo");

  // Estado local para la animación de éxito del botón en potes
  const [agregadoPote, setAgregadoPote] = useState(false);

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

  const hayOtrosProductos = items.some((it) => it.id !== ID_POTE_CUARTO);

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

    const itemId = `${poteElegido.id}-${gustosElegidos.join("-")}`;
    const itemExistente = items.find((it) => it.id === itemId);

    if (itemExistente) {
      cambiarCantidad(itemId, itemExistente.cantidad + 1);
    } else {
      agregarItem({
        id: itemId,
        productoId: poteElegido.id,
        tipo: "pote",
        nombre: `${poteElegido.nombre} (${gustosElegidos.join(", ")})`,
        precio: poteElegido.precio,
      });
    }

    // Activamos la animación verde de éxito
    setAgregadoPote(true);

    // Limpiamos los gustos elegidos después de un breve delay para que se alcance a ver el verde
    setTimeout(() => {
      setGustosElegidos([]);
      setAgregadoPote(false);
    }, 800);
  }

  async function confirmarPedido() {
    const nuevosErrores = validarDatosCliente(datosCliente);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) return;
    if (!cumpleMinimo) return;
    if (faltanCuartos) return;

    try {
      const pedidoData = {
        nombre_cliente: datosCliente.nombre,
        telefono: datosCliente.telefono,
        direccion: datosCliente.direccion,
        total: total,
        metodo_pago: metodoPago,
        monto_con_que_paga: null,
        vuelto: null,
        items: items.map((it) => ({
          producto_nombre: it.nombre,
          cantidad: it.cantidad,
          precio_unitario: it.precio,
          gustos: it.tipo === "pote" ? it.nombre : "",
        })),
      };

      const respuesta = await fetch("http://127.0.0.1:8000/api/pedidos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedidoData),
      });

      if (!respuesta.ok) throw new Error("Error al guardar el pedido en el servidor");

      const pedidoCreado = await respuesta.json();

      if (metodoPago === "Mercado Pago") {
        const respMp = await fetch("http://127.0.0.1:8000/api/crear-preferencia/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ total: total }),
        });

        const datosMp = await respMp.json();

        if (datosMp.init_point) {
          window.location.href = datosMp.init_point;
          return;
        } else {
          alert("El backend respondió pero no vino el init_point. Mirá la consola.");
        }
      }

      await fetch(`http://127.0.0.1:8000/api/pedidos/${pedidoCreado.id}/imprimir/`, {
        method: "POST",
      });

      setPedidoConfirmado(true);
    } catch (error) {
      console.error(error);
      alert("Hubo un error al registrar o imprimir el pedido.");
    }
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
                  className={`w-full rounded-xl py-3 font-bold text-white transition-all duration-200 active:scale-95 shadow-md mb-6 flex items-center justify-center gap-2 ${
                    agregadoPote 
                      ? "bg-green-500 scale-95" 
                      : "bg-[#4a5d4a] hover:bg-[#3d4d3d]"
                  }`}
                >
                  {agregadoPote ? (
                    <>
                      <span>¡Agregado con éxito!</span>
                      <Check size={18} className="stroke-[3]" />
                    </>
                  ) : (
                    "Agregar al pedido"
                  )}
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
              <div className="mb-6">
                <label className="block text-gray-800 font-bold mb-3 text-lg">Método de pago:</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setMetodoPago("Efectivo")}
                    className={`p-4 rounded-xl font-semibold border-2 transition-all duration-200 flex flex-col items-center justify-center gap-2 ${
                      metodoPago === "Efectivo"
                        ? "bg-emerald-50 border-emerald-600 text-emerald-800 shadow-md ring-2 ring-emerald-600/20"
                        : "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-2xl">💵</span>
                    <span className="text-base">Efectivo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMetodoPago("Mercado Pago")}
                    className={`p-4 rounded-xl font-semibold border-2 transition-all duration-200 flex flex-col items-center justify-center gap-2 ${
                      metodoPago === "Mercado Pago"
                        ? "bg-sky-50 border-sky-500 text-sky-900 shadow-md ring-2 ring-sky-500/20"
                        : "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <img src={logoMercadoPago} alt="Mercado Pago" className="w-48 h-22 object-contain" />
                    <span className="text-base">Mercado Pago</span>
                  </button>
                </div>
              </div>

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