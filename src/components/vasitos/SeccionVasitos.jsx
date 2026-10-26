import { useState } from "react";
import { MAX_VASITOS, PRECIO_VASITO } from "../../constants/config";

export default function SeccionVasitos({ onAgregarAlCarrito }) {
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false); // Estado para el efecto visual de éxito

  const handleAgregar = () => {
    onAgregarAlCarrito({
      id: "vasitos",
      tipo: "vasitos",
      nombre: "Vasitos comestibles sin cargo",
      cantidad,
      precio: PRECIO_VASITO,
    });

    // Activamos el efecto visual por 1 segundo
    setAgregado(true);
    setTimeout(() => {
      setAgregado(false);
    }, 1000);
  };

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">
        Vasitos sin cargo
      </h2>

      <p className="text-gray-500">
         Vasitos comestibles sin cargo para acompañar tu pedido.
      </p>

      <p className="font-semibold">
        Sin cargo
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
          onClick={() =>
            cantidad < MAX_VASITOS &&
            setCantidad(cantidad + 1)
          }
          className="w-10 h-10 rounded-full bg-[#f4a5d4] text-white text-xl font-bold active:scale-90 transition-transform shadow-sm"
        >
          +
        </button>
      </div>
      
      <p>
          {cantidad} {cantidad === 1 ? "vasito comestible" : "vasitos comestibles"}
      </p>

      <button
        onClick={handleAgregar}
        className={`w-full rounded-xl py-3 font-semibold text-white transition-all duration-200 active:scale-95 shadow-md ${
          agregado 
            ? "bg-green-500 scale-95" // Cambia a verde y se achica un poquito al presionar
            : "bg-[#f4a5d4] hover:opacity-90"
        }`}
      >
        {agregado ? "¡Agregado con éxito! ✓" : "Agregar al pedido"}
      </button>
    </section>
  );
}