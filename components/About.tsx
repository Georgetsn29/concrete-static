import React, { useEffect, useState } from 'react';
import { MemberModal } from './MemberModal';

export interface BandMember {
  _id: string;
  id: string;
  name: string;
  position: string;
  description: string;
  imageUrl: string;
  imagePattern?: string;
}

export const About: React.FC = () => {
  const [members, setMembers] = useState<BandMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<BandMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("http://localhost:10000/api/v1/bandMembers");
        if (!response.ok) throw new Error("Failed to fetch");
        
        const data = await response.json();
        setMembers(data);
      } catch (err) {
        console.error("Connection to backend failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full w-full p-4 md:p-10 items-center relative bg-[var(--concrete-100)]">
      
      {/* Image / Graphic Side - Brutalist Architecture */}
      <div className="h-full min-h-[300px] bg-[var(--concrete-400)] border-8 border-[var(--concrete-shadow)] relative overflow-hidden group shadow-[15px_15px_0px_rgba(0,0,0,0.2)]">
        <img 
          src="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&q=80&w=1200" 
          alt="Brutalist Structure" 
          className="absolute inset-0 w-full h-full object-cover grayscale brightness-75 contrast-125 transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-[var(--accent)] opacity-30 mix-blend-multiply"></div>
        <div className="absolute inset-0 flex items-center justify-center">
             <div className="text-[10rem] font-black text-white/20 select-none animate-pulse">CS</div>
        </div>
        <div className="absolute bottom-4 left-4 font-['Space_Mono'] bg-black text-white px-2 py-1 text-xs">
          EST. 2021 // BERLIN
        </div>
        {/* Scanning Line Effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[var(--accent)]/40 animate-[scanLine_4s_linear_infinite]" />
      </div>

      {/* Text Side */}
      <div className="flex flex-col gap-6 animate-[slideIn_0.5s_ease-out]">
        <h2 className="text-6xl font-black uppercase text-[var(--concrete-shadow)] leading-[0.9]">
          The Signal<br/>In The<br/>Static
        </h2>
        
        <div className="bg-[var(--concrete-200)] p-6 border-l-8 border-[var(--accent)] shadow-[10px_10px_0px_var(--concrete-shadow)]">
          <p className="font-['Space_Mono'] text-sm leading-relaxed text-black mb-4">
            CONCRETE STATIC is a post-industrial noise collective formed in the abandoned warehouses of East Berlin. We construct soundscapes from the decay of the modern world.
          </p>
          <p className="font-['Space_Mono'] text-sm leading-relaxed text-black font-bold">
            No melody without friction. No structure without collapse.
          </p>
        </div>

        {/* 3. Interactive Member Grid with Loading Logic */}
        <div className="grid grid-cols-1 gap-2 mt-4">
          <div className="text-[0.6rem] font-black uppercase tracking-[0.3em] mb-1 text-[var(--concrete-400)]">
            {loading ? "INITIALIZING_FEED..." : "SELECT_OPERATIVE_FOR_DATA:"}
          </div>

          {loading ? (
            <div className="flex flex-col gap-2">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-16 bg-[var(--concrete-300)] border-2 border-dashed border-[var(--concrete-shadow)] animate-pulse" />
              ))}
            </div>
          ) : (
            members.map((member) => (
              <button 
                key={member._id}
                onClick={() => setSelectedMember(member)}
                className="bg-[var(--concrete-shadow)] text-white p-3 flex justify-between items-center hover:translate-x-2 hover:bg-[var(--accent)] transition-all duration-200 group text-left w-full relative overflow-hidden"
              >
                <div className="flex flex-col relative z-10">
                  <span className="font-bold text-lg leading-none">{member.name}</span>
                  <span className="text-[0.65rem] font-['Space_Mono'] opacity-60 group-hover:opacity-100 transition-opacity">
                    ID: {member.id}
                  </span>
                </div>
                <span className="text-xs font-['Space_Mono'] text-[var(--accent)] group-hover:text-white uppercase transition-colors relative z-10">
                  {member.position}
                </span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* 4. Engaging the Modal with Backend Data */}
      {selectedMember && (
        <MemberModal 
          member={selectedMember} 
          onClose={() => setSelectedMember(null)} 
        />
      )}

      <style>{`
        @keyframes scanLine {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};










//   {
//     id: "FLUX",
//     name: "FLUX",
//     position: "PERCUSSION",
//     description: "Rhythmic engineer. Rejects traditional kit arrangements in favor of found metal objects, magnetic contact mics, and industrial triggers. Responsible for the machine-like precision that drives the live transmission.",
//     imagePattern: "bg-slate-900",
//     imageUrl: "https://images.unsplash.com/photo-1444492417251-9c84a5fa18e0?auto=format&fit=crop&q=80&w=800"
//   }
// ];