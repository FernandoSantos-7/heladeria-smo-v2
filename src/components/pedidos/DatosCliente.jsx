// src/components/pedido/DatosCliente.jsx
export default function DatosCliente({ datos, onCambiarDatos, errores }) {
  function actualizar(campo, valor) {
    onCambiarDatos({ ...datos, [campo]: valor });
  }

  return (
    <section className="bg-white rounded-xl p-4 shadow-sm mb-6">
      <p className="font-bold text-gray-800 mb-3">Tus datos</p>

      <div className="space-y-3">
        <div>
          <label className="text-xs text-gray-500 mb-1 block" htmlFor="nombre">
            Nombre y apellido
          </label>
          <input
            id="nombre"
            type="text"
            value={datos.nombre}
            onChange={(e) => actualizar("nombre", e.target.value)}
            className={`w-full border rounded-lg p-2 text-sm ${
              errores?.nombre ? "border-red-400" : "border-gray-300"
            }`}
            placeholder="Ej: Fernando Santos"
          />
          {errores?.nombre && <p className="text-xs text-red-600 mt-1">{errores.nombre}</p>}
        </div>

        <div>
          <label className="text-xs text-gray-500 mb-1 block" htmlFor="telefono">
            Teléfono
          </label>
          <input
            id="telefono"
            type="tel"
            value={datos.telefono}
            onChange={(e) => actualizar("telefono", e.target.value)}
            className={`w-full border rounded-lg p-2 text-sm ${
              errores?.telefono ? "border-red-400" : "border-gray-300"
            }`}
            placeholder="Ej: 11 2345-6789"
          />
          {errores?.telefono && <p className="text-xs text-red-600 mt-1">{errores.telefono}</p>}
        </div>

        <div>
          <label className="text-xs text-gray-500 mb-1 block" htmlFor="direccion">
            Dirección de entrega
          </label>
          <input
            id="direccion"
            type="text"
            value={datos.direccion}
            onChange={(e) => actualizar("direccion", e.target.value)}
            className={`w-full border rounded-lg p-2 text-sm ${
              errores?.direccion ? "border-red-400" : "border-gray-300"
            }`}
            placeholder="Calle, número y localidad"
          />
          {errores?.direccion && <p className="text-xs text-red-600 mt-1">{errores.direccion}</p>}
        </div>
      </div>
    </section>
  );
}
