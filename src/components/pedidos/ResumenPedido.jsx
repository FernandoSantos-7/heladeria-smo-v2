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
    <section className="bg-white rounded-xl p-4 shadow-sm mb-6">
      <p className="font-bold text-lg text-gray-800 mb-3">
  🛒 Resumen de tu pedido
</p>

      <div className="space-y-3">
        {items.map((it, i) => (
          <div key={i} className="flex justify-between items-start gap-2 border-b pb-3">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{it.nombre}</p>
              <p className="text-xs text-gray-400">
                ${it.precio.toLocaleString("es-AR")} c/u
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onCambiarCantidad(i, it.cantidad - 1)}
                disabled={it.cantidad <= 1}
               className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 transition flex items-center justify-center"
                aria-label="Restar cantidad"
              >
                <Minus size={14} />
              </button>
              <span className="text-sm font-medium w-4 text-center">{it.cantidad}</span>
              <button
                onClick={() => onCambiarCantidad(i, it.cantidad + 1)}
                className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 transition flex items-center justify-center"
                aria-label="Sumar cantidad"
              >
                <Plus size={14} />
              </button>
              <button
                onClick={() => onQuitarItem(i)}
                className="w-8 h-8 rounded-full hover:bg-red-50 text-red-500 transition flex items-center justify-center ml-1"
                aria-label="Eliminar del pedido"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

           <div className="flex justify-between font-bold mt-3 text-gray-800">
        <span>Total</span>
        <span>${total.toLocaleString("es-AR")}</span>
      </div>

      {!cumpleMinimo && (
        <p className="text-xs text-red-600 mt-2">
          Faltan ${faltaParaMinimo.toLocaleString("es-AR")} para llegar al mínimo de compra ($15.000).
        </p>
      )}

      {cumpleMinimo && (
        <p className="text-sm text-green-600 font-medium mt-2">
          ✅ Pedido mínimo alcanzado
        </p>
      )}
    </section>
  );
}