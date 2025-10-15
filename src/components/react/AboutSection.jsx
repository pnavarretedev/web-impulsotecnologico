import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Award, Target } from 'lucide-react';
import { FaGithub, FaLinkedin } from "react-icons/fa";

// LogoLoop Component
function LogoLoop({ logos, speed = 50, direction = 'left', logoHeight = 48, gap = 40, pauseOnHover = true, scaleOnHover = true, fadeOut = true, fadeOutColor = '#ffffff', ariaLabel = 'Logo carousel' }) {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  
  return (
    <div 
      className="relative overflow-hidden"
      style={{ height: `${logoHeight + 40}px` }}
      aria-label={ariaLabel}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {fadeOut && (
        <>
          <div 
            className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ 
              background: `linear-gradient(to right, ${fadeOutColor}, transparent)` 
            }}
          />
          <div 
            className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ 
              background: `linear-gradient(to left, ${fadeOutColor}, transparent)` 
            }}
          />
        </>
      )}
      
      <div 
        ref={containerRef}
        className="flex items-center logo-loop-animation"
        style={{
          animationDuration: `${speed}s`,
          animationPlayState: isPaused ? 'paused' : 'running',
          animationDirection: direction === 'left' ? 'normal' : 'reverse',
          gap: `${gap}px`,
        }}
      >
        {/* First set */}
        {logos.map((logo, index) => (
          <div
            key={`first-${index}`}
            className="flex-shrink-0 transition-transform duration-300 logo-item"
            style={{
              height: `${logoHeight}px`,
            }}
            onMouseEnter={(e) => scaleOnHover && (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => scaleOnHover && (e.currentTarget.style.transform = 'scale(1)')}
          >
            {logo.src ? (
              <a 
                href={logo.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block h-full"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-full w-auto object-contain transition-all duration-300"
                />
              </a>
            ) : (
              <a 
                href={logo.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center h-full text-4xl text-slate-600 hover:text-slate-900 transition-colors"
                title={logo.title}
              >
                {logo.node}
              </a>
            )}
          </div>
        ))}
        
        {/* Second set (duplicate for seamless loop) */}
        {logos.map((logo, index) => (
          <div
            key={`second-${index}`}
            className="flex-shrink-0 transition-transform duration-300 logo-item"
            style={{
              height: `${logoHeight}px`,
            }}
            onMouseEnter={(e) => scaleOnHover && (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => scaleOnHover && (e.currentTarget.style.transform = 'scale(1)')}
          >
            {logo.src ? (
              <a 
                href={logo.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block h-full"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-full w-auto object-contain transition-all duration-300"
                />
              </a>
            ) : (
              <a 
                href={logo.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center h-full text-4xl text-slate-600 hover:text-slate-900 transition-colors"
                title={logo.title}
              >
                {logo.node}
              </a>
            )}
          </div>
        ))}
      </div>
      
      <style>{`
        @keyframes scrollInfinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - ${gap / 2}px));
          }
        }
        
        .logo-loop-animation {
          animation-name: scrollInfinite;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
}

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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
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

export default function AboutSection() {
  const highlights = [
    {
      icon: <Briefcase className="w-5 h-5" />,
      title: "Experiencia Tecnológica",
      description: "Soluciones innovadoras adaptadas a tu negocio"
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Ingeniero Informático",
      description: "Formación técnica y visión estratégica"
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Enfoque en Resultados",
      description: "Optimización de procesos que generan valor"
    }
  ];

  const techLogos = [
    { src: "/logos/brand-react.svg", alt: "React", href: "https://react.dev" },
    { src: "/logos/brand-nextjs.svg", alt: "Next.js", href: "https://nextjs.org" },
    { src: "/logos/brand-typescript.svg", alt: "TypeScript", href: "https://www.typescriptlang.org" },
    { src: "/logos/brand-vercel.svg", alt: "Vercel", href: "https://vercel.com" },
    { src: "/logos/brand-github.svg", alt: "GitHub", href: "https://github.com" },
    { src: "/logos/brand-docker.svg", alt: "Docker", href: "https://www.docker.com" },
    { src: "/logos/brand-mongodb.svg", alt: "MongoDB", href: "https://www.mongodb.com" },
    { src: "/logos/brand-nodejs.svg", alt: "Node.js", href: "https://nodejs.org" },
    { src: "/logos/brand-python.svg", alt: "Python", href: "https://www.python.org" },
    { src: "/logos/brand-javascript.svg", alt: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  ];

  return (
    <div>
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-cyan-50/20 pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left side - Image */}
            <FadeIn>
              <div className="flex justify-center lg:justify-end">
                <div className="relative group">
                  {/* Gradient ring effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-500"></div>
                  
                  {/* Image container */}
                  <div className="relative">
                    <img
                      src="/perfil.jpg"
                      alt="Pablo Navarrete"
                      className="w-64 h-64 rounded-full object-cover border-4 border-white shadow-2xl relative z-10"
                    />
                    
                    {/* Status badge */}
                    <div className="absolute bottom-4 right-4 z-20">
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center space-x-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span>Disponible</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Right side - Content */}
            <div className="space-y-6">
              <FadeIn delay={200}>
                <div>
                  <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium mb-4">
                    <span>Sobre Mí</span>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-3">
                    Pablo Navarrete
                  </h2>
                  <p className="text-xl text-slate-600 font-medium">
                    Consultor en Transformación Digital y TI para Pymes
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={400}>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Soy Ingeniero Informático y combino experiencia tecnológica con visión estratégica para ofrecer soluciones que generan valor real a tu negocio. Mi objetivo es ayudarte a transformar digitalmente tu empresa, optimizando procesos y potenciando resultados medibles.
                </p>
              </FadeIn>

              {/* Highlights */}
              <FadeIn delay={600}>
                <div className="grid gap-4 mt-8">
                  {highlights.map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-start space-x-3 p-4 rounded-xl bg-slate-50 hover:bg-white hover:shadow-md transition-all duration-300 border border-slate-100 group"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                        <p className="text-sm text-slate-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>

              {/* Social Links */}
              <FadeIn delay={800}>
                <div className="flex gap-4 pt-6">
                  <a
                    href="https://linkedin.com/in/pablonavarretem"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 font-medium group"
                  >
                    <FaLinkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com/pnavarretedev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-6 py-3 bg-slate-800 text-white rounded-lg hover:shadow-lg hover:shadow-slate-500/50 transition-all duration-300 font-medium group"
                  >
                    <FaGithub className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>GitHub</span>
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Tech Stack Logo Loop */}
          <FadeIn delay={300}>
            <div className="mt-16 pt-12 border-t border-slate-200">
              <h3 className="text-center text-lg font-semibold text-slate-700 mb-8">
                Tecnologías con las que trabajo
              </h3>
              <LogoLoop
                logos={techLogos}
                speed={20}
                direction="left"
                logoHeight={48}
                gap={48}
                pauseOnHover={true}
                scaleOnHover={true}
                fadeOut={true}
                fadeOutColor="#ffffff"
                ariaLabel="Tecnologías y herramientas"
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}