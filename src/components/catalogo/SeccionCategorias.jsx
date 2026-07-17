import { useState } from "react";
import { catalogo } from "../../data/gustos";
import { CATEGORIA_STYLE, GUSTOS_POR_POTE } from "../../constants/config";

const categorias = [...new Set(catalogo.helados.map((h) => h.categoria))];

export default function SeccionCategorias({ poteElegido, gustosElegidos, onCambiarGustos }) {
  const [categoriaAbierta, setCategoriaAbierta] = useState(null);
  const limite = poteElegido ? GUSTOS_POR_POTE[poteElegido.id] ?? 1 : 0;

  function toggleGusto(nombre) {
    if (gustosElegidos.includes(nombre)) {
      onCambiarGustos(gustosElegidos.filter((g) => g !== nombre));
    } else if (gustosElegidos.length < limite) {
      onCambiarGustos([...gustosElegidos, nombre]);
    }
  }

  return (
    <section className="mb-6">
      <p className="text-sm text-gray-500 mb-2">2. Elegí tus gustos por categoría</p>

      {poteElegido && (
        <p className="text-xs text-[#4a5d4a] mb-2">
          Podés elegir {limite} gusto{limite > 1 ? "s" : ""} (llevás {gustosElegidos.length})
        </p>
      )}

      <div className="grid grid-cols-2 gap-3">
        {categorias.map((cat) => {
          const style = CATEGORIA_STYLE[cat] ?? { bg: "bg-gray-100", text: "text-gray-800" };
          const cantidad = catalogo.helados.filter((h) => h.categoria === cat).length;
          return (
            <button
              key={cat}
              disabled={!poteElegido}
              onClick={() => setCategoriaAbierta(cat)}
              className={`${style.bg} ${style.text} text-left p-4 rounded-xl flex items-center gap-2 disabled:opacity-40 transition`}
            >
              <span className="text-lg">{style.emoji}</span>
              <div>
                <p className="font-bold text-sm">{cat}</p>
                <p className="text-[11px] opacity-80">{cantidad} sabores</p>
              </div>
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
            className="bg-white w-full max-w-md rounded-2xl p-5 shadow-xl max-h-[75vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-3 border-b pb-2">
              <h2 className="font-bold text-gray-800">{categoriaAbierta}</h2>
              <button
                onClick={() => setCategoriaAbierta(null)}
                className="text-sm text-red-600 font-bold"
              >
                CERRAR
              </button>
            </div>

            <div className="overflow-y-auto space-y-2 pr-1">
              {catalogo.helados
                .filter((h) => h.categoria === categoriaAbierta)
                .map((h) => {
                  const elegido = gustosElegidos.includes(h.nombre);
                  return (
                    <button
                      key={h.id}
                      onClick={() => toggleGusto(h.nombre)}
                      className={`w-full text-left p-3 rounded-lg border flex justify-between items-start gap-2 ${
                        elegido ? "bg-[#e8ede8] border-[#4a5d4a]" : "border-gray-200"
                      }`}
                    >
                      <div>
                        <p className="font-bold text-sm text-gray-800">{h.nombre}</p>
                        <p className="text-xs text-gray-500">{h.descripcion}</p>
                      </div>
                      {elegido && <span className="text-[#4a5d4a] font-bold">✓</span>}
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