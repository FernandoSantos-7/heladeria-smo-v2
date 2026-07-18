// src/components/tortas/SeccionTortas.jsx
import { useState } from "react";
import { X, Plus } from "lucide-react";
import { tortas } from "../../data/tortas";
import { PRECIO_TORTA } from "../../constants/config";

const categorias = [...new Set(tortas.map((t) => t.categoria))];

export default function SeccionTortas({ onAgregarAlCarrito }) {
  const [categoriaAbierta, setCategoriaAbierta] = useState(null);

  return (
    <section className="mb-6">
      <p className="text-sm text-gray-500 mb-2">Elegí el tamaño de torta</p>

      <div className="grid grid-cols-2 gap-3">
        {categorias.map((cat) => {
          const cantidad = tortas.filter((t) => t.categoria === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setCategoriaAbierta(cat)}
              className="bg-white border border-gray-200 border-l-4 border-l-[#7a6a8a] text-left p-4 rounded-xl transition hover:shadow-md"
            >
              <p className="font-bold text-sm text-gray-800">Torta {cat}</p>
              <p className="text-[11px] text-gray-400">
                {cantidad} sabores · ${PRECIO_TORTA[cat]?.toLocaleString("es-AR")}
              </p>
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
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-bold text-gray-800">Torta {categoriaAbierta}</h2>
              <button
                onClick={() => setCategoriaAbierta(null)}
                aria-label="Cerrar"
                className="text-gray-400"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto space-y-2 p-4">
              {tortas
                .filter((t) => t.categoria === categoriaAbierta)
                .map((t) => {
                  const precio = PRECIO_TORTA[t.categoria] ?? 0;
                  return (
                    <div
                      key={t.id}
                      className="w-full text-left p-3 rounded-lg border border-gray-200 flex justify-between items-start gap-2"
                    >
                      <div>
                        <p className="font-bold text-sm text-gray-800">{t.nombre}</p>
                        <p className="text-xs text-gray-500">{t.descripcion}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          ${precio.toLocaleString("es-AR")}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          onAgregarAlCarrito({
                            id: `torta-${t.id}`,
                            tipo: "torta",
                            nombre: `Torta ${t.nombre} (${t.categoria})`,
                            precio,
                          })
                        }
                        className="shrink-0 bg-[#4a5d4a] text-white rounded-full p-2"
                        aria-label={`Agregar ${t.nombre}`}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
