// src/components/postres/SeccionPostres.jsx
import { useState } from "react";
import { X, Plus, Check } from "lucide-react";
import { postres } from "../../data/postres";
import { PRECIO_POSTRE } from "../../constants/config";

const categorias = [...new Set(postres.map((p) => p.categoria))];

// Colores únicos y exclusivos para cada categoría de postres (¡sin repetir y sin rojo!)
const POSTRE_COLORS = {
  Alfajores: {
    borde: "border-l-[#E3A008]", // Amarillo Oro brillante
    hover: "hover:border-[#E3A008] hover:bg-[#E3A008]/10 hover:shadow-[0_0_20px_rgba(227,160,8,0.4)]",
    hoverItem: "hover:border-[#E3A008] hover:bg-[#E3A008]/10 cursor-pointer",
  },
  Helixir: {
    borde: "border-l-[#10B981]", // Verde Esmeralda brillante
    hover: "hover:border-[#10B981] hover:bg-[#10B981]/10 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]",
    hoverItem: "hover:border-[#10B981] hover:bg-[#10B981]/10 cursor-pointer",
  },
  Cubanitos: {
    borde: "border-l-[#9333EA]", // Violeta profundo brillante
    hover: "hover:border-[#9333EA] hover:bg-[#9333EA]/10 hover:shadow-[0_0_20px_rgba(147,51,234,0.4)]",
    hoverItem: "hover:border-[#9333EA] hover:bg-[#9333EA]/10 cursor-pointer",
  },
  default: {
    borde: "border-l-[#6366F1]", // Índigo brillante por defecto
    hover: "hover:border-[#6366F1] hover:bg-[#6366F1]/10 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]",
    hoverItem: "hover:border-[#6366F1] hover:bg-[#6366F1]/10 cursor-pointer",
  }
};

export default function SeccionPostres({ onAgregarAlCarrito }) {
  const [categoriaAbierta, setCategoriaAbierta] = useState(null);
  const [agregandoId, setAgregandoId] = useState(null);

  return (
    <section className="mb-6">
      <p className="text-sm text-gray-500 mb-2">Elegí el tipo de postre</p>
      <p className="text-xs text-[#a9762f] bg-[#f7ecd9] border border-[#e8d3a5] rounded-lg p-2 mb-3">
        Los precios de esta sección están a confirmar con Lucas.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {categorias.map((cat) => {
          const configCat = POSTRE_COLORS[cat] || POSTRE_COLORS.default;
          const cantidad = postres.filter((p) => p.categoria === cat).length;
          
          return (
            <button
              key={cat}
              onClick={() => setCategoriaAbierta(cat)}
              className={`bg-white border border-gray-200 border-l-4 ${configCat.borde} text-left p-4 rounded-xl transition ${configCat.hover} hover:shadow-md active:scale-95`}
            >
              <p className="font-bold text-sm text-gray-800">{cat}</p>
              <p className="text-[11px] text-gray-400">{cantidad} variedades</p>
            </button>
          );
        })}
      </div>

      {categoriaAbierta && (
        (() => {
          const estiloActual = POSTRE_COLORS[categoriaAbierta] || POSTRE_COLORS.default;
          return (
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
                    className="text-gray-400 hover:text-gray-600 transition"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="overflow-y-auto space-y-2 p-4">
                  {postres
                    .filter((p) => p.categoria === categoriaAbierta)
                    .map((p) => {
                      const estaAgregando = agregandoId === p.id;

                      const agregarItem = () => {
                        if (estaAgregando) return;

                        onAgregarAlCarrito({
                          id: `postre-${p.id}`,
                          tipo: "postre",
                          nombre: p.nombre,
                          precio: PRECIO_POSTRE,
                        });

                        setAgregandoId(p.id);
                        setTimeout(() => {
                          setAgregandoId(null);
                          setCategoriaAbierta(null);
                        }, 600);
                      };

                      return (
                        <div
                          key={p.id}
                          onClick={agregarItem}
                          className={`w-full text-left p-3 rounded-lg border border-gray-200 flex justify-between items-start gap-2 transition active:scale-[0.98] ${estiloActual.hoverItem}`}
                        >
                          <div>
                            <p className="font-bold text-sm text-gray-800">{p.nombre}</p>
                            <p className="text-xs text-gray-500">{p.descripcion}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              ${PRECIO_POSTRE.toLocaleString("es-AR")}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              agregarItem();
                            }}
                            className={`shrink-0 rounded-full p-2 transition shadow-sm flex items-center justify-center ${
                              estaAgregando
                                ? "bg-green-500 text-white scale-105"
                                : "bg-[#4a5d4a] text-white hover:bg-[#3b4d3b]"
                            }`}
                            aria-label={`Agregar ${p.nombre}`}
                          >
                            {estaAgregando ? <Check size={16} /> : <Plus size={16} />}
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          );
        })()
      )}
    </section>
  );
}