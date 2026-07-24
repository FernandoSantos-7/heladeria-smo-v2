// src/hooks/useCarrito.js
import { useState, useMemo } from "react";
import { MINIMO_COMPRA } from "../constants/config";

export function useCarrito() {
  const [items, setItems] = useState([]); // [{ id, tipo, nombre, precio, cantidad }]

  function agregarItem(item) {
  setItems((prev) => {
    const index = prev.findIndex((it) => it.id === item.id);

    if (index !== -1) {
      return prev.map((it, i) =>
        i === index
          ? {
              ...it,
              cantidad: item.cantidad ?? it.cantidad + 1,
              precio: item.precio,
              unidades: item.unidades ?? it.unidades,
            }
          : it
      );
    }

    return [
      ...prev,
      {
        ...item,
        cantidad: item.cantidad ?? 1,
      },
    ];
  });
}

  function quitarItem(index) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function cambiarCantidad(index, cantidad) {
    setItems((prev) =>
      prev.map((it, i) => (i === index ? { ...it, cantidad: Math.max(1, cantidad) } : it))
    );
  }

  const total = useMemo(
    () => items.reduce((acc, it) => acc + it.precio * it.cantidad, 0),
    [items]
  );

  const cumpleMinimo = total >= MINIMO_COMPRA;
  const faltaParaMinimo = Math.max(0, MINIMO_COMPRA - total);

  return { items, agregarItem, quitarItem, cambiarCantidad, total, cumpleMinimo, faltaParaMinimo };
}
