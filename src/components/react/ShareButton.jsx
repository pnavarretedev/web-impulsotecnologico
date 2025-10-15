import React from 'react';
import { Share2 } from 'lucide-react';

export default function ShareButton({ title, url, variant = 'default' }) {
  const handleShare = async () => {
    // Check if Web Share API is available
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url || window.location.href,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error sharing:', err);
          fallbackShare();
        }
      }
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    // Copy to clipboard as fallback
    navigator.clipboard.writeText(window.location.href);
    alert('¡Link copiado al portapapeles!');
  };

  const styles = {
    default: "flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors",
    primary: "flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all font-medium"
  };

  return (
    <button onClick={handleShare} className={styles[variant]}>
      <Share2 className="w-4 h-4" />
      <span>Compartir{variant === 'primary' ? ' artículo' : ''}</span>
    </button>
  );
}