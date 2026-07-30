import { useEffect, useState } from "react";
import logo from "../../assets/logo-smo.png";
import heroSlides from "../../data/heroSlides";

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