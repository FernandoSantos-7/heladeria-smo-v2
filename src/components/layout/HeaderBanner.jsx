// src/components/layout/HeaderBanner.jsx
import logo from "../../assets/logo-smo.png";
import banner from "../../assets/banner-vitrina.jpeg";

export default function HeaderBanner() {
  return (
    <header className="max-w-xl mx-auto pt-6 pb-2">
      <div className="flex flex-col items-center mb-4">
        <img src={logo} alt="Logo S'MO" className="h-16" />
        <p className="italic text-sm text-[#4a5d4a] mt-2 tracking-wide">
          S'MO — La dulce tentación
        </p>
      </div>
      <div className="rounded-2xl overflow-hidden shadow-sm">
        <img
          src={banner}
          alt="Vitrina de helados S'MO"
          className="w-full h-40 object-cover"
        />
      </div>
    </header>
  );
}
