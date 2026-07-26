// src/components/pedidos/ResumenPedido.jsx

import { Minus, Plus, Trash2 } from "lucide-react";

export default function ResumenPedido({
  items,
  total,
  cumpleMinimo,
  faltaParaMinimo,
  onCambiarCantidad,
  onQuitarItem,
}) {
  if (items.length === 0) return null;

  return (
    <section className="bg-white rounded-xl p-5 shadow-sm mb-6">

      <h2 className="text-xl font-bold text-gray-800 mb-4">
        🛒 Resumen de tu pedido
      </h2>

      <div className="space-y-4">
        {items.map((it, i) => (
          <div
            key={i}
            className="flex justify-between items-start gap-3 border-b border-gray-200 pb-4"
          >
            <div className="flex-1">

              <p className="font-semibold text-gray-800">
                {it.nombre}
              </p>

              {it.tipo === "blister" && (
                <p className="text-xs text-gray-500 mt-1">
                  {it.cantidad} {it.cantidad === 1 ? "blíster" : "blísteres"} ({it.unidades} unidades)
                </p>
              )}

              {it.tipo === "vasitos" && (
                <p className="text-xs text-gray-500 mt-1">
                  {it.cantidad} vasitos comestibles
                </p>
              )}

              <p className="text-sm text-[#4a5d4a] font-medium mt-1">
                {it.precio === 0
                  ? "Sin cargo"
                  : `$${it.precio.toLocaleString("es-AR")}`}
              </p>

            </div>

            <div className="flex items-center gap-2">

              <button
                onClick={() => onCambiarCantidad(i, it.cantidad - 1)}
                disabled={it.cantidad <= 1}
                className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-40 transition flex items-center justify-center"
              >
                <Minus size={14} />
              </button>

              <span className="w-5 text-center font-semibold">
                {it.cantidad}
              </span>

              <button
                onClick={() => onCambiarCantidad(i, it.cantidad + 1)}
                className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 transition flex items-center justify-center"
              >
                <Plus size={14} />
              </button>

              <button
                onClick={() => onQuitarItem(i)}
                className="w-8 h-8 rounded-full text-red-500 hover:bg-red-50 transition flex items-center justify-center"
              >
                <Trash2 size={16} />
              </button>

            </div>

          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-5 pt-3 border-t text-lg font-bold text-gray-800">
        <span>Total</span>
        <span>${total.toLocaleString("es-AR")}</span>
      </div>

      {!cumpleMinimo && (
        <p className="text-sm text-red-600 mt-3">
          Faltan ${faltaParaMinimo.toLocaleString("es-AR")} para llegar al mínimo de compra ($15.000).
        </p>
      )}

      {cumpleMinimo && (
        <p className="text-sm text-green-600 font-semibold mt-3">
          ✅ Pedido mínimo alcanzado
        </p>
      )}

    </section>
  );
}