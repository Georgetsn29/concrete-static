import React, { useEffect, useState } from 'react';

interface SocialItem {
  _id: string;
  title: string;
  URL: string;
  description: string;
}
  

export const Home: React.FC = () => {

  const [socials, setSocials] = useState<SocialItem[]>([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    const fetchSocials = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/socials");
        if (!response.ok) throw new Error("Network response was not ok");
        
        const data = await response.json();
        setSocials(data);
      } catch (error) {
        console.error("Failed to load socials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSocials();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-full w-full p-4 md:p-10 text-center">
      <div className="bg-[var(--concrete-shadow)] p-1 mb-8 w-fit mx-auto animate-[slideIn_0.6s_ease-out]">
        <div className="border-2 border-white p-2">
            <span className="text-white font-['Space_Mono'] tracking-[0.2em] text-xs">NEW ALBUM RELEASE</span>
        </div>
      </div>

      <h1 className="text-[12vw] leading-[0.8] font-black uppercase text-[var(--concrete-shadow)] break-words mb-8 mix-blend-multiply animate-[slideIn_0.8s_ease-out]">
        STATIC<br/>NOISE<br/><span className="text-white text-stroke">FOREVER</span>
      </h1>

      <style>{`
        .text-stroke {
          -webkit-text-stroke: 2px var(--concrete-shadow);
        }
      `}</style>

      <div className="bg-[var(--concrete-300)] border-4 border-[var(--concrete-shadow)] p-6 max-w-2xl w-full shadow-[20px_20px_0px_var(--accent)] animate-[slideIn_1s_ease-out]">
        <h2 className="font-bold text-2xl mb-4 text-[var(--concrete-shadow)] uppercase">Stream 'Reinforced Concrete'</h2>
        <div className="flex flex-col gap-3">
          {socials.length > 0 ? (
            socials.map((social) => (
              <button 
                key={social._id}
                onClick={() => window.open(social.URL, '_blank')}
                className="w-full bg-black text-white p-4 font-['Space_Mono'] hover:bg-[var(--accent)] transition-colors text-left flex justify-between group"
              >
                <span>{social.title.toUpperCase()}</span>
                <span className="opacity-0 group-hover:opacity-100">-›</span>
              </button>
            ))
          ) : (
            !loading && <p className="text-[var(--concrete-shadow)] font-['Space_Mono']">No links found.</p>
          )}
        </div>
      </div>
    </div>
  );
};