import React, { useRef, useState } from 'react';
import { ExternalLink, Github, Clock, CheckCircle, Loader } from 'lucide-react';

export default function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const getStatusConfig = (status) => {
    const configs = {
      completed: {
        icon: <CheckCircle className="w-4 h-4" />,
        text: 'Completado',
        color: 'bg-green-100 text-green-700 border-green-200'
      },
      'in-progress': {
        icon: <Loader className="w-4 h-4 animate-spin" />,
        text: 'En desarrollo',
        color: 'bg-blue-100 text-blue-700 border-blue-200'
      },
      'coming-soon': {
        icon: <Clock className="w-4 h-4" />,
        text: 'Próximamente',
        color: 'bg-slate-100 text-slate-600 border-slate-200'
      }
    };
    return configs[status] || configs['coming-soon'];
  };

  const statusConfig = getStatusConfig(project.status);
  const isClickable = project.status === 'completed' && (project.link || project.github);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group perspective-1000"
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      <article className={`bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-cyan-300 hover:shadow-2xl transition-all duration-300 h-full flex flex-col ${project.status === 'coming-soon' ? 'opacity-75' : ''}`}>
        {/* Image */}
        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-6xl font-bold text-slate-300">
                {project.title.charAt(0)}
              </div>
            </div>
          )}
          
          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium border ${statusConfig.color} backdrop-blur-sm`}>
              {statusConfig.icon}
              <span>{statusConfig.text}</span>
            </div>
          </div>

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
            {isClickable && (
              <div className="flex space-x-3">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-white/90 hover:bg-white text-slate-900 rounded-lg font-medium transition-all transform hover:scale-105"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Ver proyecto</span>
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-white/90 hover:bg-white text-slate-900 rounded-lg transition-all transform hover:scale-105"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Title */}
          <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-cyan-600 transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-slate-600 mb-4 flex-grow line-clamp-3">
            {project.description}
          </p>

          {/* Tech Stack */}
          {project.tech && project.tech.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
              {project.tech.slice(0, 4).map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full hover:bg-cyan-100 hover:text-cyan-700 transition-colors"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 4 && (
                <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
                  +{project.tech.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </article>
    </div>
  );
}