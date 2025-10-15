import { useState } from 'react';
import ProjectCard from './ProjectCard';

export default function ProjectsSection({ projects }) {
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Filtrar proyectos por estado
  const filteredProjects = selectedStatus === 'all' 
    ? projects 
    : projects.filter(project => project.status === selectedStatus);

  const getButtonClass = (status) => {
    return selectedStatus === status
      ? 'px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg text-sm font-medium shadow-lg'
      : 'px-6 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:border-cyan-300 transition-colors';
  };

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedStatus('all')}
            className={getButtonClass('all')}
          >
            Todos
          </button>
          <button
            onClick={() => setSelectedStatus('completed')}
            className={getButtonClass('completed')}
          >
            Completados
          </button>
          <button
            onClick={() => setSelectedStatus('in-progress')}
            className={getButtonClass('in-progress')}
          >
            En Desarrollo
          </button>
          <button
            onClick={() => setSelectedStatus('coming-soon')}
            className={getButtonClass('coming-soon')}
          >
            Próximamente
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">
              No hay proyectos en esta categoría
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
