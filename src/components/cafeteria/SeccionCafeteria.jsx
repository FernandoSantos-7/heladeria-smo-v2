import cliente from "../../assets/cafeteria/cliente.jpeg";

import { productos } from "./productosCafeteria";
import TarjetaProducto from "./TarjetaProducto";

export default function SeccionCafeteria() {
  return (
    <section className="space-y-6">

      <div className="overflow-hidden rounded-2xl shadow-md">
        <img
          src={cliente}
          alt="Cafetería S'MO"
          className="w-full h-72 object-cover"
        />

        <div className="bg-white p-5">
          <h2 className="text-2xl font-bold text-gray-800">
            Cafetería S'MO
          </h2>

          <p className="text-gray-600 mt-2">
             Disfrutá de nuestras infusiones, cafés especiales, pastelería artesanal,
               cookies, alfajores y mucho más.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {productos.map((producto) => (
          <TarjetaProducto
            key={producto.nombre}
            producto={producto}
          />
        ))}
      </div>

    </section>
  );
}