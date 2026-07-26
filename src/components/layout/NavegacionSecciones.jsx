// src/components/layout/NavegacionSecciones.jsx

const SECCIONES = [
  { id: "potes", nombre: "Helados en pote" },
  { id: "paletas", nombre: "Paletas" },
  { id: "tortas", nombre: "Tortas" },
  { id: "postres", nombre: "Postres" },
  { id: "blister", nombre: "Blíster de cucuruchos" },
  { id: "vasitos", nombre: "Vasitos Comestibles" },
];

export default function NavegacionSecciones({
  seccionActiva,
  onCambiarSeccion,
}) {
  return (
    <nav className="max-w-xl mx-auto mb-5 flex flex-wrap justify-center gap-2">
      {SECCIONES.map((s) => {
        const activa = seccionActiva === s.id;

        return (
          <button
            key={s.id}
            onClick={() => onCambiarSeccion(s.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activa
                ? "bg-[#4a5d4a] text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {s.nombre}
          </button>
        );
      })}
    </nav>
  );
}