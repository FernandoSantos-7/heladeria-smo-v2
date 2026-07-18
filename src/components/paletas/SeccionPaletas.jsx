// src/components/paletas/SeccionPaletas.jsx
import { useState } from "react";
import { X, Plus } from "lucide-react";
import { paletas } from "../../data/paletas";
import { PRECIO_PALETA } from "../../constants/config";

const categorias = [...new Set(paletas.map((p) => p.categoria))];

const CATEGORIA_COLOR = {
  Crema: "border-l-[#7a6a8a]",
  Agua: "border-l-[#3b8a86]",
};

export default function SeccionPaletas({ onAgregarAlCarrito }) {
  const [categoriaAbierta, setCategoriaAbierta] = useState(null);

  return (
    <section className="mb-6">
      <p className="text-sm text-gray-500 mb-2">Elegí la categoría de paleta</p>

      <div className="grid grid-cols-2 gap-3">
        {categorias.map((cat) => {
          const colorBorde = CATEGORIA_COLOR[cat] ?? "border-l-gray-300";
          const cantidad = paletas.filter((p) => p.categoria === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setCategoriaAbierta(cat)}
              className={`bg-white border border-gray-200 border-l-4 ${colorBorde} text-left p-4 rounded-xl transition hover:shadow-md`}
            >
              <p className="font-bold text-sm text-gray-800">Paleta de {cat}</p>
              <p className="text-[11px] text-gray-400">{cantidad} variedades</p>
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
              <h2 className="font-bold text-gray-800">Paleta de {categoriaAbierta}</h2>
              <button
                onClick={() => setCategoriaAbierta(null)}
                aria-label="Cerrar"
                className="text-gray-400"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto space-y-2 p-4">
              {paletas
                .filter((p) => p.categoria === categoriaAbierta)
                .map((p) => (
                  <div
                    key={p.id}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 flex justify-between items-start gap-2"
                  >
                    <div>
                      <p className="font-bold text-sm text-gray-800">{p.nombre}</p>
                      <p className="text-xs text-gray-500">{p.descripcion}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        ${PRECIO_PALETA.toLocaleString("es-AR")}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        onAgregarAlCarrito({
                          id: `paleta-${p.id}`,
                          tipo: "paleta",
                          nombre: p.nombre,
                          precio: PRECIO_PALETA,
                        })
                      }
                      className="shrink-0 bg-[#4a5d4a] text-white rounded-full p-2"
                      aria-label={`Agregar ${p.nombre}`}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
