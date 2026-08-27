import { MapPin, Clock, Phone } from "lucide-react";
import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";

export default function FooterLocal() {
  return (
    <section className="mt-10 bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold text-[#4a5d4a] mb-4">
        Información del local
      </h2>

      <div className="space-y-4 text-gray-700">
        <div className="flex items-start gap-3">
  <MapPin className="text-[#4a5d4a] mt-1" size={22} />

  <div>
    <p className="font-semibold text-gray-800">Dirección</p>

    <a
      href="https://www.google.com/maps/search/?api=1&query=Av.+Boulogne+Sur+Mer+1099,+Tapiales,+Buenos+Aires"
      target="_blank"
      rel="noreferrer"
      className="text-gray-600 hover:text-[#4a5d4a] transition"
    >
      Av. Boulogne Sur Mer 1099
    </a>

    <p className="text-sm text-gray-500 mt-1">
      Tapiales, Buenos Aires
    </p>

    <a
      href="https://www.google.com/maps/search/?api=1&query=Av.+Boulogne+Sur+Mer+1099,+Tapiales,+Buenos+Aires"
      target="_blank"
      rel="noreferrer"
      className="inline-block text-sm text-[#4a5d4a] font-medium mt-1 hover:underline"
    >
      Ver ubicación en Google Maps →
    </a>
  </div>
</div>

        <div className="flex items-start gap-3">
          <Clock className="text-[#4a5d4a] mt-1" size={20} />
          <div>
            <p className="font-semibold">Horarios de atención</p>
            <p>Lunes a Domingo: 12:00 a 00:00</p>
          </div>
        </div>

        <div>
          <p className="font-semibold mb-2">Seguinos en nuestras redes</p>
          <div className="flex flex-col gap-2">
            <a
              href="https://www.instagram.com/heladeriasmo"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-pink-600 hover:underline"
            >
              <FaInstagram size={18} />
              @heladeriasmo
            </a>

            <a
              href="https://www.tiktok.com/@heladeriasmo"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-black hover:underline"
            >
              <FaTiktok size={18} />
              TikTok: @heladeriasmo
            </a>

            <a
              href="https://www.facebook.com/heladeriasmo"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <FaFacebookF size={18} />
              Facebook: @heladeriasmo
            </a>
            <a
               href="https://wa.me/5491154229565?text=Hola%20Helader%C3%ADa%20S%27MO%2C%20tengo%20una%20consulta."
               target="_blank"
               rel="noreferrer"
               className="mt-4 flex items-center justify-center gap-2 bg-[#4a5d4a] hover:bg-[#3d4d3d] text-white font-semibold py-3 px-4 rounded-xl transition"
             >
               💬 Consultas por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
