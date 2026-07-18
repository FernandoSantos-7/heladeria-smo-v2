// src/utils/validarDatosCliente.js
export function validarDatosCliente(datos) {
  const errores = {};

  if (!datos.nombre || datos.nombre.trim().length < 3) {
    errores.nombre = "Ingresá tu nombre completo.";
  }
  if (!datos.telefono || datos.telefono.trim().length < 8) {
    errores.telefono = "Ingresá un teléfono válido.";
  }
  if (!datos.direccion || datos.direccion.trim().length < 5) {
    errores.direccion = "Ingresá tu dirección completa.";
  }

  return errores; // objeto vacío = sin errores
}
