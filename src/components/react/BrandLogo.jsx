import React from "react";

export default function BrandLogo({ variant = "navbar", link = "/", className = "" }) {
  const logoMap = {
    navbar: "/logo-impulso/logo-dispo-b.png",
    "navbar-mobile": "/logo-impulso/logo.png",
    footer: "/logo-impulso/logo-dispo-a.png",
  };

  // 🚀 Ruta compatible con Astro/Vite/React
  const src = new URL(logoMap[variant], import.meta.url).href;

  const image = (
    <img
      src={src}
      alt="Impulso Tecnológico"
      className={`w-auto h-8 ${variant === "footer" ? "h-10" : ""} ${className}`}
    />
  );

  if (!link) return image;

  return (
    <a href={link} className="hover:opacity-90 transition-opacity flex items-center">
      {image}
    </a>
  );
}
