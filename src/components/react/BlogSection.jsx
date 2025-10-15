import { useState } from 'react';
import BlogCard from './BlogCard';

export default function BlogSection({ posts, tags }) {
  const [selectedTag, setSelectedTag] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // 1. Primero filtramos
  const filteredPosts = selectedTag === 'all' 
    ? posts 
    : posts.filter(post => post.data.tags.includes(selectedTag));

  // 2. Luego calculamos la paginación sobre los posts filtrados
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // 3. Resetear a página 1 cuando cambia el filtro
  const handleFilterChange = (tag) => {
    setSelectedTag(tag);
    setCurrentPage(1); // 👈 Importante: volver a página 1
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Opcional: scroll arriba
  };

  return (
    <>
      {/* Filters Section */}
      <section className="py-8 bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-slate-700">Filtrar por:</span>
            
            <button
              onClick={() => handleFilterChange('all')}
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
                onClick={() => handleFilterChange(tag)}
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

      {/* Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 border rounded-lg ${
                  currentPage === 1
                    ? 'bg-white border-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-cyan-300 transition-colors'
                }`}
              >
                Anterior
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    currentPage === pageNumber
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : 'bg-white border border-slate-200 text-slate-700 hover:border-cyan-300'
                  }`}
                >
                  {pageNumber}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 border rounded-lg ${
                  currentPage === totalPages
                    ? 'bg-white border-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-cyan-300 transition-colors'
                }`}
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
