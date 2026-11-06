import blisterCucuruchos from "../../assets/blister-cucurucho.jpeg";
import { useState } from "react";
import {
  PRECIO_BLISTER,
  UNIDADES_POR_BLISTER,
} from "../../constants/config";

export default function SeccionBlister({ onAgregarAlCarrito }) {
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false); // Estado para el efecto visual de éxito

  const unidades = cantidad * UNIDADES_POR_BLISTER;
  const total = cantidad * PRECIO_BLISTER;

  const handleAgregar = () => {
    onAgregarAlCarrito({
      id: "blister",
      tipo: "blister",
      nombre: "Blíster de cucuruchos",
      cantidad,
      unidades,
      precio: PRECIO_BLISTER,
    });

    // Activamos el efecto visual por 1 segundo
    setAgregado(true);
    setTimeout(() => {
      setAgregado(false);
    }, 1000);
  };

  return (
    <section className="space-y-4">
      <img
        src={blisterCucuruchos}
        alt="Blíster de cucuruchos"
        className="w-full h-64 object-cover rounded-2xl shadow-md"
      />

      <h2 className="text-xl font-bold">
        Blíster de cucuruchos
      </h2>
      <p className="text-gray-600">
        Ideal para acompañar tu pedido de helado. Cada blíster contiene 3 cucuruchos artesanales.
      </p>

      <p className="text-gray-500">
        1 blíster contiene {UNIDADES_POR_BLISTER} unidades
      </p>

      <p className="font-semibold">
        ${PRECIO_BLISTER.toLocaleString("es-AR")} c/u
      </p>

      <div className="flex items-center gap-4">
        <button
          onClick={() => cantidad > 1 && setCantidad(cantidad - 1)}
          className="w-10 h-10 rounded-full bg-[#f4a5d4] text-white text-xl font-bold active:scale-90 transition-transform shadow-sm"
        >
          -
        </button>

        <span className="font-bold text-lg">
          {cantidad}
        </span>

        <button
          onClick={() => setCantidad(cantidad + 1)}
          className="w-10 h-10 rounded-full bg-[#f4a5d4] text-white text-xl font-bold active:scale-90 transition-transform shadow-sm"
        >
          +
        </button>
      </div>

      <p>
        {cantidad} {cantidad === 1 ? "blíster" : "blísteres"} ({unidades} unidades)
      </p>

      <p className="text-xl font-bold">
        Total: ${total.toLocaleString("es-AR")}
      </p>

      <button
        onClick={handleAgregar}
        className={`w-full rounded-xl py-3 font-semibold text-white transition-all duration-200 active:scale-95 shadow-md ${
          agregado 
            ? "bg-green-500 scale-95" 
            : "bg-[#f4a5d4] hover:bg-pink-300"
        }`}
      >
        {agregado ? "¡Agregado con éxito! ✓" : "Agregar al pedido"}
      </button>
    </section>
  );
}