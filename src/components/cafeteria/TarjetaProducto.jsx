export default function TarjetaProducto({ producto }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="w-full h-44 object-cover"
      />

      <div className="p-3">
        <h3 className="text-base font-bold text-gray-800">
          {producto.nombre}
        </h3>

        <span
          className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
            producto.tipo === "delivery"
              ? "bg-green-100 text-green-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {producto.descripcion}
        </span>
      </div>
    </div>
  );
}