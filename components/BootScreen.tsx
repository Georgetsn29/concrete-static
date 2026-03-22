import React, { useEffect, useState } from 'react';

export const BootScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('INITIALIZING SYSTEM...');
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const sequence = [
      { time: 200, text: 'LOADING KERNEL...', p: 15 },
      { time: 500, text: 'MOUNTING VOLUMES...', p: 40 },
      { time: 900, text: 'ESTABLISHING CONNECTION...', p: 75 },
      { time: 1400, text: 'DECRYPTING ASSETS...', p: 90 },
      { time: 1800, text: 'SYSTEM READY.', p: 100 },
    ];

    const timeouts = sequence.map(({ time, text, p }) => 
      setTimeout(() => {
        setText(text);
        setProgress(p);
      }, time)
    );

    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2000);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[999] bg-black text-white flex flex-col items-center justify-center p-8 font-['Space_Mono'] transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
      {/* Noise Overlay */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.08]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
      
      <div className="w-full max-w-md relative z-10">
        <h1 className="text-4xl md:text-6xl font-black mb-8 text-[var(--concrete-200)] uppercase tracking-tighter">
          CONCRETE<br/><span className="text-[var(--accent)]">STATIC</span>
        </h1>
        <div className="mb-2 text-sm tracking-widest uppercase">{text}</div>
        <div className="w-full h-4 border-2 border-[var(--concrete-400)] p-0.5">
          <div 
            className="h-full bg-[var(--accent)] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-4 text-xs text-[var(--concrete-400)] flex justify-between">
          <span>OS_VERSION: 2.0.4</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
};
