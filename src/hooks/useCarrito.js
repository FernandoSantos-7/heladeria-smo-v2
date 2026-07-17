// src/hooks/useCarrito.js
import { useState, useMemo } from "react";
import { MINIMO_COMPRA } from "../constants/config";

export function useCarrito() {
  const [items, setItems] = useState([]); // [{ id, tipo, nombre, precio, gustosElegidos, cantidad }]

  function agregarItem(item) {
    setItems((prev) => [...prev, { ...item, cantidad: 1 }]);
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
