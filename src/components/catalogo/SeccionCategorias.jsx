// src/components/catalogo/SeccionCategorias.jsx
import { useState } from "react";
import { Check, X } from "lucide-react";
import { catalogo } from "../../data/gustos";
import { GUSTOS_POR_POTE } from "../../constants/config";
import detalleGustos from "../../assets/detalle-gustos-1.jpeg";

const categorias = [...new Set(catalogo.helados.map((h) => h.categoria))];

// Solo un color de acento por categoría (sin icono)
const CATEGORIA_COLOR = {
  Chocolate: "border-l-[#6b4226]",
  "Dulce de Leche": "border-l-[#a9762f]",
  Crema: "border-l-[#7a6a8a]",
  Agua: "border-l-[#3b8a86]",
};

export default function SeccionCategorias({ poteElegido, gustosElegidos, onCambiarGustos }) {
  const [categoriaAbierta, setCategoriaAbierta] = useState(null);
  const limite = poteElegido ? GUSTOS_POR_POTE[poteElegido.id] ?? 1 : 0;
function toggleGusto(nombre) {
  if (gustosElegidos.includes(nombre)) {
    onCambiarGustos(gustosElegidos.filter((g) => g !== nombre));
    return;
  }

  if (gustosElegidos.length >= limite) return;

  const nuevosGustos = [...gustosElegidos, nombre];

  onCambiarGustos(nuevosGustos);

  // Cerrar el modal después de elegir un gusto
  setCategoriaAbierta(null);
}

  return (
    <section className="mb-6">
      <p className="text-sm text-gray-500 mb-2">2. Elegí tus gustos por categoría</p>

      {poteElegido && (
        <p className="text-xs text-[#4a5d4a] mb-2 font-medium">
          Podés elegir {limite} gusto{limite > 1 ? "s" : ""} (llevás {gustosElegidos.length})
        </p>
      )}

      <div className="grid grid-cols-2 gap-3">
        {categorias.map((cat) => {
          const colorBorde = CATEGORIA_COLOR[cat] ?? "border-l-gray-300";
          const cantidad = catalogo.helados.filter((h) => h.categoria === cat).length;
          return (
            <button
              key={cat}
              disabled={!poteElegido}
              onClick={() => setCategoriaAbierta(cat)}
              className={`bg-white border border-gray-200 border-l-4 ${colorBorde} text-left p-4 rounded-xl disabled:opacity-40 transition hover:shadow-md`}
            >
              <p className="font-bold text-sm text-gray-800">{cat}</p>
              <p className="text-[11px] text-gray-400">{cantidad} sabores</p>
            </button>
          );
        })}
      </div>

      {categoriaAbierta && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
          onClick={() => setCategoriaAbierta(null)}
        >
          <div
             className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-xl max-h-[80vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
          >
          <div className="relative h-28 shrink-0">
          <img
            src={detalleGustos}
              alt=""
            className="w-full h-full object-cover"
        />
            <button
                type="button"
                onClick={() => setCategoriaAbierta(null)}
                aria-label="Cerrar"
                className="absolute top-2 right-2 z-20 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
             >
             <X size={18} />
            </button>

           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
             <h2 className="text-white font-bold">{categoriaAbierta}</h2>
            </div>
           </div>

            <div className="overflow-y-auto space-y-2 p-4">
              {catalogo.helados
                .filter((h) => h.categoria === categoriaAbierta)
                .map((h) => {
                  const elegido = gustosElegidos.includes(h.nombre);
                  return (
                    <button
                      key={h.id}
                      onClick={() => toggleGusto(h.nombre)}
                      className={`w-full text-left p-3 rounded-lg border flex justify-between items-start gap-2 transition ${
                        elegido ? "bg-[#eef2ee] border-[#4a5d4a]" : "border-gray-200"
                      }`}
                    >
                      <div>
                        <p className="font-bold text-sm text-gray-800">{h.nombre}</p>
                        <p className="text-xs text-gray-500">{h.descripcion}</p>
                      </div>
                      {elegido && (
                        <span className="text-[#4a5d4a] shrink-0">
                          <Check size={18} />
                        </span>
                      )}
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}