import React from "react";

export default function BrandLogo({
  variant = "navbar",
  link = "/",
  className = ""
}) {
  // Map para cada logo según contexto
  const logoMap = {
    navbar: "/logo-impulso/logo-dispo-b.png",        // Logo horizontal
    "navbar-mobile": "/logo-impulso/logo.png",       // Solo isotipo
    footer: "/logo-impulso/logo-dispo-a.png"         // Logo stacked vertical
  };

  // Tamaños óptimos basados en tus archivos reales
  const sizeMap = {
    navbar: "h-8",           // 32px → Perfecto para navbar desktop
    "navbar-mobile": "h-8",  // 32px → Ideal para mobile
    footer: "h-12"           // 48px → Legibilidad perfecta en footer
  };

  // Ruta absoluta compatible en Astro + React + Vercel
  const src = new URL(logoMap[variant], import.meta.url).href;

  const image = (
    <img
      src={src}
      alt="Impulso Tecnológico"
      className={`${sizeMap[variant]} w-auto ${className}`}
      draggable="false"
    />
  );

  // Si tiene link → envolver el logo
  if (link) {
    return (
      <a
        href={link}
        className="flex items-center hover:opacity-90 transition-opacity"
      >
        {image}
      </a>
    );
  }

  return image;
}
