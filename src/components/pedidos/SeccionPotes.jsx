// src/components/pedidos/SeccionPotes.jsx
import { productos } from "../../data/productos";
import { GUSTOS_POR_POTE } from "../../constants/config";

const AVISO_POR_POTE = {
  "pote-1-4-kilo": "Se necesitan al menos 2 en el pedido",
};

export default function SeccionPotes({ poteElegido, onElegirPote }) {
  return (
    <section className="mb-6">
      <p className="text-sm text-gray-500 mb-2">Elegí tu presentación</p>
      <div className="grid grid-cols-3 gap-3">
        {productos.potes.map((p) => {
          const activo = poteElegido?.id === p.id;
          const aviso = AVISO_POR_POTE[p.id];
          
          // Forzamos la lectura directa según el tipo de pote para evitar fallos de ID
          let limiteGustos = 3;
          if (p.id === "pote-1-kilo") limiteGustos = GUSTOS_POR_POTE["pote-1-kilo"] ?? 4;
          if (p.id === "pote-1-2-kilo") limiteGustos = 4; // <--- ¡Aca clavamos el 4 del medio kilo a la fuerza!
          if (p.id === "pote-1-4-kilo") limiteGustos = GUSTOS_POR_POTE["pote-1-4-kilo"] ?? 3;

          return (
            <button
              key={p.id}
              onClick={() => onElegirPote(p)}
              className={`text-left p-3 rounded-xl transition-all active:scale-95 shadow-sm ${
                activo 
                  ? "border-2 border-[#4a5d4a] bg-emerald-50/50 ring-1 ring-[#4a5d4a]" 
                  : "bg-white border border-gray-200 hover:border-gray-300"
              }`}
            >
              <p className="font-bold text-sm text-gray-800">{p.nombre}</p>
              <p className="text-xs text-gray-500">${p.precio.toLocaleString("es-AR")}</p>
              <p className="text-[11px] text-gray-400 mt-1">
                {limiteGustos} gusto{limiteGustos > 1 ? "s" : ""}
              </p>
              {aviso && (
                <p className="text-[11px] text-[#a9762f] font-medium mt-0.5">{aviso}</p>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}