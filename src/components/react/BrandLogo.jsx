import React from "react";

export default function BrandLogo({ variant = "navbar", link = "/", className = "" }) {
  const logoMap = {
    navbar: "/logo-impulso/logo-dispo-b.png",        // Desktop
    "navbar-mobile": "/logo-impulso/logo.png",       // Mobile (isotipo)
    footer: "/logo-impulso/logo-dispo-a.png",        // Footer stacked
  };

  const src = logoMap[variant];

  const image = (
    <img
      src={src}
      alt="Impulso Tecnológico"
      className={`w-auto h-8 ${variant === "footer" ? "h-10" : ""} ${className}`}
    />
  );

  // con enlace
  if (link) {
    return (
      <a href={link} className="flex items-center hover:opacity-90 transition-opacity">
        {image}
      </a>
    );
  }

  // sin enlace
  return image;
}
