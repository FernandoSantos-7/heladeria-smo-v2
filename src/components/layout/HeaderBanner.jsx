import { useEffect, useState } from "react";
import logo from "../../assets/logo-smo.png";
import bannerVitrina from "../../assets/banner-vitrina.jpeg";
import paletaMix2 from "../../assets/paleta-mix-2.jpeg";
import tortaOreo from "../../assets/torta-oreo.jpeg";
import postre from "../../assets/postre-1.jpg";
import cubanitos from "../../assets/cubanitos.jpeg";

const heroSlides = [
  {
    imagen: bannerVitrina,
    titulo: "Helados Artesanales",
    descripcion: "Elaborados con ingredientes seleccionados y la mejor calidad."
  },
  {
    imagen: paletaMix2,
    titulo: "Paletas Artesanales",
    descripcion: "Paletas de crema, ideales para cualquier momento."
  },
  {
    imagen: tortaOreo,
    titulo: "Tortas Heladas",
    descripcion: "Perfectas para cumpleaños, reuniones o darte un gusto."
  },
  {
    imagen: postre,
    titulo: "Postres Helados",
    descripcion: "Una opción irresistible para compartir."
  },
  {
    imagen: cubanitos,
    titulo: "Mucho más que helado",
    descripcion: "Descubrí todas las especialidades de S'MO."
  }
];

export default function HeaderBanner() {
  const [slideActual, setSlideActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSlideActual((actual) =>
        actual === heroSlides.length - 1 ? 0 : actual + 1
      );
    }, 5000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <header className="max-w-3xl mx-auto pt-6 pb-2">
      <div className="flex flex-col items-center mb-4">
        <img
          src={logo}
          alt="Logo S'MO"
          className="h-16"
        />
        <p className="italic text-sm text-[#4a5d4a] mt-2 tracking-wide">
          S'MO La dulce tentación
        </p>
      </div>

      <div className="relative rounded-3xl overflow-hidden shadow-xl">
        <img
          src={heroSlides[slideActual].imagen}
          alt={heroSlides[slideActual].titulo}
          className="w-full h-72 md:h-80 object-cover duration-700"
        />
        <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-6">
          <h2 className="text-white text-2xl md:text-3xl font-medium tracking-tight">
            {heroSlides[slideActual].titulo}
          </h2>
          <p className="text-white/90 mt-2 text-sm md:text-base font-light">
            {heroSlides[slideActual].descripcion}
          </p>
        </div>
      </div>
    </header>
  );
}