// src/components/postres/SeccionPostres.jsx
import { useState } from "react";
import { X, Plus } from "lucide-react";
import { postres } from "../../data/postres";

const categorias = [...new Set(postres.map((p) => p.categoria))];

export default function SeccionPostres({ onAgregarAlCarrito }) {
  const [categoriaAbierta, setCategoriaAbierta] = useState(null);

  return (
    <section className="mb-6">
      <p className="text-sm text-gray-500 mb-2">Elegí el tipo de postre</p>
      <p className="text-xs text-[#a9762f] bg-[#f7ecd9] border border-[#e8d3a5] rounded-lg p-2 mb-3">
        Los precios de esta sección están pendientes de confirmar con Lucas.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {categorias.map((cat) => {
          const cantidad = postres.filter((p) => p.categoria === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setCategoriaAbierta(cat)}
              className="bg-white border border-gray-200 border-l-4 border-l-[#6b4226] text-left p-4 rounded-xl transition hover:shadow-md"
            >
              <p className="font-bold text-sm text-gray-800">{cat}</p>
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
              <h2 className="font-bold text-gray-800">{categoriaAbierta}</h2>
              <button
                onClick={() => setCategoriaAbierta(null)}
                aria-label="Cerrar"
                className="text-gray-400"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto space-y-2 p-4">
              {postres
                .filter((p) => p.categoria === categoriaAbierta)
                .map((p) => (
                  <div
                    key={p.id}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 flex justify-between items-start gap-2"
                  >
                    <div>
                      <p className="font-bold text-sm text-gray-800">{p.nombre}</p>
                      <p className="text-xs text-gray-500">{p.descripcion}</p>
                      <p className="text-xs text-[#a9762f] mt-1">Precio a confirmar</p>
                    </div>
                    <button
                      disabled
                      title="Precio pendiente de confirmar"
                      className="shrink-0 bg-gray-300 text-white rounded-full p-2 cursor-not-allowed"
                      aria-label={`${p.nombre} - precio pendiente`}
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
