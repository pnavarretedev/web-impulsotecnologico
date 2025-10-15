import { useState } from 'react';

export default function BlogFilter({ tags }) {
  const [selectedTag, setSelectedTag] = useState('all');

  const filterPosts = (tag) => {
    setSelectedTag(tag);
    const allPosts = document.querySelectorAll('.blog-card');
    
    allPosts.forEach(post => {
      if (tag === 'all') {
        post.style.display = 'block';
      } else {
        if (post.classList.contains(tag)) {
          post.style.display = 'block';
        } else {
          post.style.display = 'none';
        }
      }
    });
  };

  return (
    <section className="py-8 bg-white border-b border-slate-200 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-slate-700">Filtrar por:</span>
          
          <button
            onClick={() => filterPosts('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedTag === 'all'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Todos
          </button>
          
          {tags.slice(0, 5).map((tag) => (
            <button
              key={tag}
              onClick={() => filterPosts(tag)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedTag === tag
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
