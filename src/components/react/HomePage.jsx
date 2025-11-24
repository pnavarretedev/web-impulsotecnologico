import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Target, Lightbulb, Code, Menu, X } from 'lucide-react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

/* --------------------------
   COMPONENTES INTERNOS
-------------------------- */

// Fade In Component
function FadeIn({ children, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {children}
    </div>
  );
}

// Magnetic Button Component
function MagneticButton({ children, href, className }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setPosition({ x: x * 0.2, y: y * 0.2 });
  };

  return (
    <a
      ref={buttonRef}
      href={href}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.2s ease-out'
      }}
    >
      {children}
    </a>
  );
}

// Particles Background Component
function ParticlesBackground() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-gradient-to-r from-cyan-400/30 to-blue-400/30 blur-sm"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.x}%`,
            top: `${p.y}%`,
            animation: `float ${p.duration}s infinite ease-in-out`,
            animationDelay: `${p.delay}s`
          }}
        />
      ))}

      <style jsx>{`
        @keyframes float {
          0%, 100% {transform: translateY(0) translateX(0);}
          25% {transform: translateY(-20px) translateX(10px);}
          50% {transform: translateY(-10px) translateX(-10px);}
          75% {transform: translateY(-30px) translateX(5px);}
        }
      `}</style>
    </div>
  );
}

// Count Up Component
function CountUpGradient({ end, duration = 2000, suffix = "", prefix = "" }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && !isVisible && setIsVisible(true),
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    const startValue = 0;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = progress * (2 - progress);
      setCount(Math.floor(eased * end));

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className="text-3xl font-bold bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent">
      {prefix}{count}{suffix}
    </div>
  );
}

/* -------------------------------------
   HOME PAGE
------------------------------------- */

export default function ImpulsoTechHome() {
  const services = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Estrategia Digital",
      description: "Desarrollamos estrategias digitales integrales alineadas con sus objetivos comerciales."
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Consultoría Tecnológica",
      description: "Evaluamos su infraestructura actual y recomendamos tecnologías emergentes."
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Implementación de Soluciones",
      description: "Desde sistemas de gestión hasta plataformas de análisis de datos."
    }
  ];

  const clients = [
    { name: "Agrogesttion SPA", logo: "/images/logo-empresas/agrogesttion.jpg" },
    { name: "Chillerservie LTDA", logo: "/images/logo-empresas/chillerservice.jpg" },
    { name: "CZ Consultora LTDA", logo: "/images/logo-empresas/czconsultora.jpg" },
    { name: "Contructora ICD SPA", logo: "/images/logo-empresas/icd.png" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      {/* 🔥 NAVBAR GLOBAL */}
      <Navbar />

      {/* HERO */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-cyan-50/30 to-blue-50/40"></div>
        <ParticlesBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">

            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Transformación Digital</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Transformamos Empresas Tradicionales en 
              <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"> Líderes Digitales</span>
            </h1>

            <p className="text-lg text-slate-600 mb-8">
              Desde estrategia hasta implementación, creamos soluciones personalizadas que impulsan crecimiento y eficiencia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <MagneticButton
                href="/contacto"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 font-medium group"
              >
                Agenda una Consulta
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>

              <a 
                href="#servicios"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-700 border-2 border-slate-200 rounded-lg hover:border-cyan-500 hover:text-cyan-600 transition-all duration-300 font-medium"
              >
                Ver Servicios
              </a>
            </div>

            <div className="mt-12 flex items-center space-x-8 text-sm">
              <div>
                <CountUpGradient end={7} prefix="+" />
                <div className="text-slate-600">Años de experiencia</div>
              </div>
              <div>
                <CountUpGradient end={40} prefix="+" />
                <div className="text-slate-600">Proyectos completados</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="servicios" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Soluciones integrales para impulsar su transformación digital
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <FadeIn key={i} delay={i * 200}>
                <div className="group relative bg-slate-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl hover:shadow-slate-200 transition-all duration-300 border border-slate-100 hover:border-cyan-200">

                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                    {s.icon}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-4">{s.title}</h3>
                  <p className="text-slate-600 mb-4">{s.description}</p>

                  <a href="#" className="inline-flex items-center text-cyan-600 font-medium group-hover:text-blue-600 transition-colors">
                    Más información
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* CLIENTS */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
              Nuestros Clientes
            </h2>
            <p className="text-slate-600">Líderes de industria que confían en nosotros</p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-12">
            {clients.map((c, i) => (
              <div
                key={i}
                className="w-32 h-20 bg-white rounded-lg flex items-center justify-center border border-slate-200 hover:border-cyan-300 hover:shadow-lg transition-all duration-300"
              >
                <img src={c.logo} alt={c.name} className="max-h-18 max-w-30 object-contain" />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-600/10"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Comience su Transformación Digital Hoy
          </h2>

          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Contáctenos para una consulta personalizada y descubra cómo podemos impulsar su negocio.
          </p>

          <a 
            href="/contacto"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 font-medium text-lg group transform hover:scale-105"
          >
            Contáctenos
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      {/* 🔥 FOOTER GLOBAL */}
      <Footer />

    </div>
  );
}
