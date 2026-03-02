
import React from 'react';
// import { BandMember } from '../types';

export interface BandMember {
  _id: string;          // MongoDB's default unique ID
  id: string;           // Your custom "UNIT-734" string
  name: string;
  position: string;
  description: string;
  imageUrl: string;     // URL for the member's photo
  imagePattern?: string; // Optional field for your CSS background
}

interface MemberModalProps {
  member: BandMember;
  onClose: () => void;
}



export const MemberModal: React.FC<MemberModalProps> = ({ member, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-xl bg-[var(--concrete-100)] border-8 border-[var(--concrete-shadow)] shadow-[20px_20px_0px_var(--accent)] p-6 md:p-10 animate-[memberSlideIn_0.25s_cubic-bezier(0.23,1,0.32,1)]">
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 md:top-4 md:right-4 w-12 h-12 flex items-center justify-center text-3xl font-bold bg-[var(--concrete-shadow)] text-white hover:bg-[var(--accent)] transition-colors z-20 shadow-[4px_4px_0px_var(--accent)]"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 md:gap-10">
          {/* Stylized ID Photo with real image */}
          <div 
            className="w-full h-48 md:h-64 border-4 border-[var(--concrete-shadow)] relative overflow-hidden bg-black flex items-center justify-center group"
          >
             <img 
               src={member.imageURL} 
               alt={member.name}
               className="absolute inset-0 w-full h-full object-cover grayscale contrast-200 brightness-75 hover:scale-105 transition-transform duration-500"
             />
             <div className="absolute inset-0 bg-[var(--accent)] opacity-20 mix-blend-multiply" />
             <div className="absolute inset-0 opacity-30 mix-blend-screen pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />
             
             {/* Dynamic Scan Line */}
             <div className="absolute bottom-2 left-2 right-2 h-1 bg-[var(--accent)] animate-pulse z-10" />
             <div className="absolute top-2 left-2 text-[0.5rem] font-['Space_Mono'] bg-black text-white px-1">LIVE_FEED</div>
          </div>

          <div className="flex flex-col">
            <div className="mb-4">
              <span className="font-['Space_Mono'] text-[0.65rem] bg-[var(--accent)] text-white px-2 py-0.5 tracking-widest uppercase mb-2 inline-block shadow-[2px_2px_0px_var(--concrete-shadow)]">
                PERSONNEL_FILE // {member.id}
              </span>
              <h2 className="text-5xl md:text-6xl font-black uppercase text-[var(--concrete-shadow)] leading-[0.8] tracking-tighter">
                {member.name}
              </h2>
              <h3 className="text-sm font-bold uppercase mt-2 text-[var(--concrete-shadow)] opacity-60 border-b-2 border-[var(--concrete-shadow)] pb-2">
                {member.position}
              </h3>
            </div>

            <div className="bg-white/50 p-4 border-2 border-[var(--concrete-shadow)] border-dashed">
              <p className="font-['Space_Mono'] text-sm leading-relaxed text-black">
                {member.description}
              </p>
            </div>

            <div className="mt-auto pt-6 flex gap-2">
              <div className="w-full h-2 bg-[var(--concrete-shadow)]" />
              <div className="w-12 h-2 bg-[var(--accent)]" />
              <div className="w-4 h-2 bg-[var(--concrete-shadow)]" />
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes memberSlideIn {
          from { transform: scale(0.95) translateY(20px); opacity: 0; filter: contrast(2) grayscale(1); }
          to { transform: scale(1) translateY(0); opacity: 1; filter: contrast(1) grayscale(0); }
        }
      `}</style>
    </div>
  );
};