import React, { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Impulso Tecnológico
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-slate-700 hover:text-cyan-600 transition-colors font-medium">Home</a>
            <a href="/about" className="text-slate-700 hover:text-cyan-600 transition-colors font-medium">About</a>
            <a href="/proyectos" className="text-slate-700 hover:text-cyan-600 transition-colors font-medium">Proyectos</a>
            <a href="/blog" className="text-slate-700 hover:text-cyan-600 transition-colors font-medium">Blog</a>
          </div>

          <div className="hidden md:block">
            <a 
              href="/contacto" 
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 font-medium"
            >
              Contacto
            </a>
          </div>

          <button 
            className="md:hidden text-slate-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            <a href="/" className="block text-slate-700 hover:text-cyan-600 py-2">Home</a>
            <a href="/about" className="block text-slate-700 hover:text-cyan-600 py-2">About</a>
            <a href="/proyectos" className="block text-slate-700 hover:text-cyan-600 py-2">Proyectos</a>
            <a href="/blog" className="block text-slate-700 hover:text-cyan-600 py-2">Blog</a>
            <a href="/contacto" className="block px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg text-center">
              Contacto
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}