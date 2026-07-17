// src/constants/config.js

export const MINIMO_COMPRA = 15000;

export const WHATSAPP_NUMBER = "5491154229565"; // reemplazar por el número real de Lucas

// Cuántos gustos puede elegir el cliente según el tamaño del pote
export const GUSTOS_POR_POTE = {
  "pote-1-kilo": 3,
  "pote-1-2-kilo": 2,
  "pote-1-4-kilo": 1,
};

// Colores/identidad visual por categoría (para que el usuario la reconozca de un vistazo)
export const CATEGORIA_STYLE = {
  Chocolate: { bg: "bg-[#4a3226]", text: "text-white", emoji: "🍫" },
  "Dulce de Leche": { bg: "bg-[#c68a3f]", text: "text-white", emoji: "🍮" },
  Crema: { bg: "bg-[#f2e9dc]", text: "text-gray-800", emoji: "🍦" },
  Agua: { bg: "bg-[#bfe3e0]", text: "text-gray-800", emoji: "🍉" },
};
