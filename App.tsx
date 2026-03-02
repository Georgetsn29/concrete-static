import React, { useEffect, useRef, useState } from 'react';
import { CalendarSystem } from './components/CalendarSystem';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { About } from './components/About';
import { PageType } from './types';

const GRAIN_URI = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('HOME');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const x = (window.innerWidth / 2 - e.pageX) / 50;
      const y = (window.innerHeight / 2 - e.pageY) / 50;
      
      containerRef.current.style.transform = `skewY(-1deg) rotateX(${y}deg) rotateY(${-x}deg)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const renderContent = () => {
    switch (currentPage) {
      case 'HOME':
        return <Home />;
      case 'ABOUT':
        return <About />;
      case 'TOUR':
        return <CalendarSystem />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-5 pt-24 sm:p-10 relative overflow-hidden font-['Inter'] selection:bg-[var(--accent)] selection:text-white">
      {/* Noise Overlay */}
      <div 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-40 opacity-[0.04]"
        style={{ backgroundImage: `url("${GRAIN_URI}")` }}
      />

      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Main Content Wrapper with 3D Effect */}
      <main 
        ref={containerRef}
        className="bg-[var(--concrete-200)] border-[12px] border-[var(--concrete-shadow)] shadow-[20px_20px_0px_rgba(0,0,0,0.5)] lg:shadow-[40px_40px_0px_rgba(0,0,0,0.5)] max-w-[1400px] w-full min-h-[600px] transition-transform duration-100 ease-out"
        style={{ transformStyle: 'preserve-3d', transform: 'skewY(-1deg)' }}
      >
        <div className="w-full h-full overflow-hidden relative bg-[var(--concrete-200)]">
           {/* 
              Transition Wrapper
           */}
           <div 
             key={currentPage} 
             className="relative w-full h-full"
           >
              {/* Main Content Animation - Pure Stretch/Swosh */}
              <div className="w-full h-full animate-[stretchIn_0.5s_cubic-bezier(0.25,1,0.5,1)_forwards] origin-left will-change-transform">
                 {renderContent()}
              </div>
           </div>
        </div>
      </main>

      <style>{`
        @keyframes stretchIn {
          0% {
            opacity: 0;
            transform: translateX(50%) scaleX(2) skewX(-20deg);
            filter: blur(8px);
          }
          50% {
             opacity: 1;
             filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scaleX(1) skewX(0);
            filter: blur(0);
          }
        }
      `}</style>
    </div>
  );
};

export default App;