import React from "react";

export default function BrandLogo({
  variant = "navbar",
  link = "/",
  className = ""
}) {
  const logoMap = {
    navbar: "/logo-impulso/logo-dispo-b.png",
    "navbar-mobile": "/logo-impulso/logo.png",
    footer: "/logo-impulso/logo-dispo-a.png",
  };

  const sizeMap = {
    navbar: "h-8",
    "navbar-mobile": "h-8",
    footer: "h-12",
  };

  const src = logoMap[variant];

  const image = (
    <img
      src={src}
      alt="Impulso Tecnológico"
      className={`${sizeMap[variant]} w-auto ${className}`}
      draggable="false"
    />
  );

  if (link) {
    return (
      <a href={link} className="flex items-center hover:opacity-90 transition-opacity">
        {image}
      </a>
    );
  }

  return image;
}
