import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed bottom-8 right-8 z-50 flex items-center justify-center w-11 h-11 rounded-full border border-[#8B5C2A]/50 bg-background/90 backdrop-blur-sm text-[#8B5C2A] shadow-lg transition-all duration-400 hover:bg-[#8B5C2A] hover:text-white hover:border-[#8B5C2A] hover:shadow-[0_4px_20px_rgba(139,92,42,0.4)] ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ChevronUp size={18} strokeWidth={2.5} />
    </button>
  );
}
