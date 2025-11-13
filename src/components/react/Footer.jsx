import React from 'react';
import BrandLogo from './BrandLogo';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row justify-between items-center">

          {/* LOGO FOOTER */}
          <BrandLogo 
            variant="footer" 
            link="/" 
            className="mb-4 md:mb-0"
          />

          <div className="text-slate-600 text-sm text-center md:text-right">
            © 2025 Impulso Tecnológico. Todos los derechos reservados.
          </div>

        </div>

      </div>
    </footer>
  );
}
