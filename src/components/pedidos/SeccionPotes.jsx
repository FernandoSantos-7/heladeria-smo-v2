import { productos } from "../../data/productos";
import { GUSTOS_POR_POTE } from "../../constants/config";

export default function SeccionPotes({ poteElegido, onElegirPote }) {
  return (
    <section className="mb-6">
      <p className="text-sm text-gray-500 mb-2">1. Elegí tu presentación</p>
      <div className="grid grid-cols-3 gap-3">
        {productos.potes.map((p) => {
          const activo = poteElegido?.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onElegirPote(p)}
              className={`text-left p-3 rounded-xl bg-white transition ${
                activo ? "border-2 border-[#4a5d4a]" : "border border-gray-200"
              }`}
            >
              <p className="font-bold text-sm text-gray-800">{p.nombre}</p>
              <p className="text-xs text-gray-500">${p.precio.toLocaleString("es-AR")}</p>
              <p className="text-[11px] text-gray-400 mt-1">
                {GUSTOS_POR_POTE[p.id] ?? 1} gusto{(GUSTOS_POR_POTE[p.id] ?? 1) > 1 ? "s" : ""}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
