import { useState } from "react";
import { MAX_VASITOS, PRECIO_VASITO } from "../../constants/config";

export default function SeccionVasitos({ onAgregarAlCarrito }) {
  const [cantidad, setCantidad] = useState(1);

  return (
    <section className="space-y-4">

      <h2 className="text-xl font-bold">
        Vasitos sin cargo
      </h2>

      <p className="text-gray-500">
        Podés solicitar hasta {MAX_VASITOS} vasitos.
      </p>

      <p className="font-semibold">
        Sin cargo
      </p>

      <div className="flex items-center gap-4">

        <button
          onClick={() => cantidad > 1 && setCantidad(cantidad - 1)}
          className="w-10 h-10 rounded-full bg-[#f4a5d4] text-white text-xl font-bold"
        >
          -
        </button>

        <span className="font-bold text-lg">
          {cantidad}
        </span>

        <button
          onClick={() =>
            cantidad < MAX_VASITOS &&
            setCantidad(cantidad + 1)
          }
          className="w-10 h-10 rounded-full bg-[#f4a5d4] text-white text-xl font-bold"
        >
          +
        </button>

      </div>

      <p>
        {cantidad} {cantidad === 1 ? "vasito" : "vasitos"}
      </p>

      <button
        onClick={() =>
          onAgregarAlCarrito({
            id: "vasitos",
            tipo: "vasitos",
            nombre: "Vasitos sin cargo",
            cantidad,
            precio: PRECIO_VASITO,
          })
        }
        className="w-full rounded-xl bg-[#f4a5d4] py-3 font-semibold text-white"
      >
        Agregar al pedido
      </button>

    </section>
  );
}