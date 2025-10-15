import React, { useRef, useState } from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

export default function BlogCard({ post }) {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const tagClasses = post.data.tags ? post.data.tags.join(' ') : '';

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <a
      href={`/blog/${post.slug}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="block group perspective-1000"
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      <article className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-cyan-300 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
        {/* Image */}
        {post.data.image && (
          <div className="relative h-48 overflow-hidden bg-slate-100">
            <img
              src={post.data.image}
              alt={post.data.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Tags */}
          {post.data.tags && post.data.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.data.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-cyan-100 text-cyan-700 text-xs font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-cyan-600 transition-colors line-clamp-2">
            {post.data.title}
          </h3>

          {/* Description */}
          <p className="text-slate-600 mb-4 line-clamp-3 flex-grow">
            {post.data.description}
          </p>

          {/* Meta info */}
          <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t border-slate-100">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.data.pubDate)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{post.data.author}</span>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-cyan-600 group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </article>
    </a>
  );
}