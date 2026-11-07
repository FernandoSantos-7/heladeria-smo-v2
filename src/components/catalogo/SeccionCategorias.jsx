// src/components/catalogo/SeccionCategorias.jsx
import { useState } from "react";
import { Check, X } from "lucide-react";
import { catalogo } from "../../data/gustos";
import { GUSTOS_POR_POTE } from "../../constants/config";
import detalleGustos from "../../assets/detalle-gustos-1.jpeg";

const categorias = [...new Set(catalogo.helados.map((h) => h.categoria))];

// Colores vibrantes y efecto luminoso para cada categoría
const CATEGORIA_COLOR = {
  Chocolate: {
    borde: "border-l-[#8B4513]",
    hover: "hover:border-[#8B4513] hover:bg-[#8B4513]/10 hover:shadow-[0_0_15px_rgba(139,69,19,0.3)]",
    activoBg: "bg-[#8B4513]/15",
    activoBorder: "border-[#8B4513]",
    textoSeleccionado: "text-[#8B4513]"
  },
  "Dulce de Leche": {
    borde: "border-l-[#D2691E]",
    hover: "hover:border-[#D2691E] hover:bg-[#D2691E]/10 hover:shadow-[0_0_15px_rgba(210,105,30,0.3)]",
    activoBg: "bg-[#D2691E]/15",
    activoBorder: "border-[#D2691E]",
    textoSeleccionado: "text-[#D2691E]"
  },
  Crema: {
    borde: "border-l-[#8A2BE2]",
    hover: "hover:border-[#8A2BE2] hover:bg-[#8A2BE2]/10 hover:shadow-[0_0_20px_rgba(138,43,226,0.4)]",
    activoBg: "bg-[#8A2BE2]/15",
    activoBorder: "border-[#8A2BE2]",
    textoSeleccionado: "text-[#8A2BE2]"
  },
  Agua: {
    borde: "border-l-[#00CED1]",
    hover: "hover:border-[#00CED1] hover:bg-[#00CED1]/10 hover:shadow-[0_0_20px_rgba(0,206,209,0.4)]",
    activoBg: "bg-[#00CED1]/15",
    activoBorder: "border-[#00CED1]",
    textoSeleccionado: "text-[#00CED1]"
  },
  "Nuevos Sabores": {
    borde: "border-l-[#FFD700]",
    hover: "hover:border-[#FFD700] hover:bg-[#FFD700]/15 hover:shadow-[0_0_25px_rgba(255,215,0,0.5)]",
    activoBg: "bg-[#FFD700]/20",
    activoBorder: "border-[#FFD700]",
    textoSeleccionado: "text-[#B8860B]"
  }
};

export default function SeccionCategorias({ poteElegido, gustosElegidos = [], onCambiarGustos }) {
  const [categoriaAbierta, setCategoriaAbierta] = useState(null);
  const limite = poteElegido ? GUSTOS_POR_POTE[poteElegido.id] ?? 1 : 0;
  const cantidadElegidos = Array.isArray(gustosElegidos) ? gustosElegidos.length : 0;

  function toggleGusto(nombre) {
    if (gustosElegidos.includes(nombre)) {
      onCambiarGustos(gustosElegidos.filter((g) => g !== nombre));
      return;
    }

    if (cantidadElegidos >= limite) return;

    const nuevosGustos = [...gustosElegidos, nombre];
    onCambiarGustos(nuevosGustos);

    // Cerrar el modal después de elegir un gusto
    setCategoriaAbierta(null);
  }

  // Estilo por defecto si alguna categoría no estuviera en el mapa
  const estiloActual = CATEGORIA_COLOR[categoriaAbierta] || {
    hover: "hover:border-gray-400 hover:bg-gray-50",
    activoBg: "bg-[#eef2ee]",
    activoBorder: "border-[#4a5d4a]",
    textoSeleccionado: "text-[#4a5d4a]"
  };

  const textoContador = `Podés elegir ${limite} ${limite > 1 ? "gustos" : "gusto"} (llevás ${cantidadElegidos})`;

  return (
    <section className="mb-6" translate="no">
      <p className="text-sm text-gray-500 mb-2">2. Elegí tus gustos por categoría</p>

      {poteElegido && (
        <div className="mb-3">
          <p className="text-xs text-[#4a5d4a] font-semibold">
            {textoContador}
          </p>

          {cantidadElegidos > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {gustosElegidos.map((gusto) => (
                <span
                  key={gusto}
                  onClick={() => toggleGusto(gusto)}
                  className="inline-flex items-center gap-1 text-xs bg-[#4a5d4a]/10 text-[#4a5d4a] border border-[#4a5d4a]/30 px-2.5 py-1 rounded-full cursor-pointer hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition"
                  title="Tocar para quitar"
                >
                  {gusto}
                  <X size={12} />
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {categorias.map((cat) => {
          const configCat = CATEGORIA_COLOR[cat] || {};
          const colorBorde = configCat.borde || "border-l-gray-300";
          const hoverEfecto = configCat.hover || "hover:border-gray-400";
          const cantidad = catalogo.helados.filter((h) => h.categoria === cat).length;

          return (
            <button
              key={cat}
              disabled={!poteElegido}
              onClick={() => setCategoriaAbierta(cat)}
              className={`bg-white border border-gray-200 border-l-4 ${colorBorde} text-left p-4 rounded-xl disabled:opacity-40 transition ${hoverEfecto} hover:shadow-md`}
            >
              <p className="font-bold text-sm text-gray-800">{cat}</p>
              <p className="text-[11px] text-gray-400">{`${cantidad} sabores`}</p>
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

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-between p-3">
                <h2 className="text-white font-bold">{categoriaAbierta}</h2>
                <span className="text-xs bg-black/60 text-white px-2.5 py-1 rounded-full font-medium">
                  {`Llevás ${cantidadElegidos} de ${limite}`}
                </span>
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
                        elegido
                          ? `${estiloActual.activoBg} ${estiloActual.activoBorder}`
                          : `border-gray-200 ${estiloActual.hover}`
                      }`}
                    >
                      <div>
                        <p className="font-bold text-sm text-gray-800">{h.nombre}</p>
                        <p className="text-xs text-gray-500">{h.descripcion}</p>
                      </div>
                      {elegido && (
                        <span className={`${estiloActual.textoSeleccionado} shrink-0`}>
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