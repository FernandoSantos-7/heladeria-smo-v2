// src/components/layout/NavegacionSecciones.jsx
const SECCIONES = [
  { id: "potes", nombre: "Helados en pote" },
  { id: "paletas", nombre: "Paletas" },
  { id: "tortas", nombre: "Tortas" },
  { id: "postres", nombre: "Postres" },
  { id: "blister", nombre: "Blíster" },
];

export default function NavegacionSecciones({ seccionActiva, onCambiarSeccion }) {
  return (
    <nav className="max-w-xl mx-auto mb-5 flex gap-2 overflow-x-auto pb-1">
      {SECCIONES.map((s) => {
        const activa = seccionActiva === s.id;
        return (
          <button
            key={s.id}
            onClick={() => onCambiarSeccion(s.id)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${
              activa
                ? "bg-[#4a5d4a] text-white"
                : "bg-white text-gray-600 border border-gray-200"
            }`}
          >
            {s.nombre}
          </button>
        );
      })}
    </nav>
  );
}
