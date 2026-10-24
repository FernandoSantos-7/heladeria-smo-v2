// src/components/tortas/SeccionTortas.jsx
import { useState } from "react";
import { X, Plus } from "lucide-react";
import { tortas } from "../../data/tortas";
import { PRECIO_TORTA } from "../../constants/config";

const categorias = [...new Set(tortas.map((t) => t.categoria))];

// Colores únicos y exclusivos para cada tamaño/categoría de torta (¡sin repetir con paletas y sin rojo!)
const TRAY_COLORS = {
  Chica: {
    borde: "border-l-[#FF4500]", // Naranja fuego brillante
    hover: "hover:border-[#FF4500] hover:bg-[#FF4500]/10 hover:shadow-[0_0_20px_rgba(255,69,0,0.4)]",
    hoverItem: "hover:border-[#FF4500] hover:bg-[#FF4500]/10 cursor-pointer",
  },
  Grande: {
    borde: "border-l-[#32CD32]", // Verde lima eléctrico brillante
    hover: "hover:border-[#32CD32] hover:bg-[#32CD32]/10 hover:shadow-[0_0_20px_rgba(50,205,50,0.4)]",
    hoverItem: "hover:border-[#32CD32] hover:bg-[#32CD32]/10 cursor-pointer",
  },
  default: {
    borde: "border-l-[#FF1493]", // Fucsia brillante por las dudas
    hover: "hover:border-[#FF1493] hover:bg-[#FF1493]/10 hover:shadow-[0_0_20px_rgba(255,20,147,0.4)]",
    hoverItem: "hover:border-[#FF1493] hover:bg-[#FF1493]/10 cursor-pointer",
  }
};

export default function SeccionTortas({ onAgregarAlCarrito }) {
  const [categoriaAbierta, setCategoriaAbierta] = useState(null);

  return (
    <section className="mb-6">
      <p className="text-sm text-gray-500 mb-2">Elegí el tamaño de torta</p>

      <div className="grid grid-cols-2 gap-3">
        {categorias.map((cat) => {
          const configCat = TRAY_COLORS[cat] || TRAY_COLORS.default;
          const cantidad = tortas.filter((t) => t.categoria === cat).length;
          
          return (
            <button
              key={cat}
              onClick={() => setCategoriaAbierta(cat)}
              className={`bg-white border border-gray-200 border-l-4 ${configCat.borde} text-left p-4 rounded-xl transition ${configCat.hover} hover:shadow-md`}
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
        (() => {
          const estiloActual = TRAY_COLORS[categoriaAbierta] || TRAY_COLORS.default;
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
                  <h2 className="font-bold text-gray-800">Torta {categoriaAbierta}</h2>
                  <button
                    onClick={() => setCategoriaAbierta(null)}
                    aria-label="Cerrar"
                    className="text-gray-400 hover:text-gray-600 transition"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="overflow-y-auto space-y-2 p-4">
                  {tortas
                    .filter((t) => t.categoria === categoriaAbierta)
                    .map((t) => {
                      const precio = PRECIO_TORTA[t.categoria] ?? 0;
                      const agregarItem = () => {
                        onAgregarAlCarrito({
                          id: `torta-${t.id}`,
                          tipo: "torta",
                          nombre: `Torta ${t.nombre} (${t.categoria})`,
                          precio,
                        });
                        setCategoriaAbierta(null);
                      };

                      return (
                        <div
                          key={t.id}
                          onClick={agregarItem}
                          className={`w-full text-left p-3 rounded-lg border border-gray-200 flex justify-between items-start gap-2 transition ${estiloActual.hoverItem}`}
                        >
                          <div>
                            <p className="font-bold text-sm text-gray-800">{t.nombre}</p>
                            <p className="text-xs text-gray-500">{t.descripcion}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              ${precio.toLocaleString("es-AR")}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              agregarItem();
                            }}
                            className="shrink-0 bg-[#4a5d4a] text-white rounded-full p-2 hover:bg-[#3b4d3b] transition shadow-sm"
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
          );
        })()
      )}
    </section>
  );
}