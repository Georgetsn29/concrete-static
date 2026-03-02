import React from 'react';
import { CalendarEvent } from '../types';

interface SidebarProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchResults: CalendarEvent[];
  onResultClick: (date: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentDate, 
  onPrevMonth, 
  onNextMonth,
  searchQuery,
  onSearchChange,
  searchResults,
  onResultClick
}) => {
  const monthName = currentDate.toLocaleString('default', { month: 'long' }).toUpperCase();
  const year = currentDate.getFullYear();

  return (
    <aside className="bg-[var(--concrete-300)] p-5 md:p-8 flex flex-col justify-between relative z-[2] shadow-[inset_-10px_0_20px_rgba(0,0,0,0.2)] h-full overflow-hidden">
      
      {/* Top Section: Header & Nav */}
      <div>
        <div className="text-[0.65rem] uppercase font-black tracking-[0.1em] opacity-60 text-[var(--concrete-shadow)] mb-2">
          WORLD TOUR_V.2
        </div>
        <h1 className="text-[4rem] lg:text-[5rem] leading-[0.8] tracking-[-0.05em] uppercase text-[var(--concrete-shadow)] break-all font-black mb-4">
          TOUR<br className="hidden lg:block"/>DATES
        </h1>

        {/* Navigation Controls */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={onPrevMonth}
            className="w-10 h-10 border-2 border-[var(--concrete-shadow)] flex items-center justify-center font-bold hover:bg-[var(--concrete-shadow)] hover:text-white transition-colors text-xl"
          >
            &lt;
          </button>
          <h2 className="text-2xl font-bold text-[var(--accent)] min-w-[160px] text-center">
            {monthName} {year}
          </h2>
          <button 
            onClick={onNextMonth}
            className="w-10 h-10 border-2 border-[var(--concrete-shadow)] flex items-center justify-center font-bold hover:bg-[var(--concrete-shadow)] hover:text-white transition-colors text-xl"
          >
            &gt;
          </button>
        </div>

        {/* Search Section */}
        <div className="mb-6">
          <input 
            type="text" 
            placeholder="SEARCH CITY..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-[var(--concrete-200)] border-b-2 border-[var(--concrete-shadow)] p-2 font-['Space_Mono'] text-sm focus:outline-none focus:border-[var(--accent)] placeholder-[var(--concrete-400)] uppercase"
          />
        </div>
      </div>

      {/* Search Results / Metadata */}
      <div className="flex-grow overflow-y-auto mb-4 pr-2">
        {searchQuery.length > 0 ? (
          <div className="space-y-2">
            <h3 className="text-xs font-black uppercase mb-2 text-[var(--concrete-shadow)]">SEARCH RESULTS:</h3>
            {searchResults.length === 0 ? (
              <div className="text-xs font-['Space_Mono'] opacity-50">NO SIGNALS FOUND.</div>
            ) : (
              searchResults.map(event => (
                <button
                  key={event.id}
                  onClick={() => onResultClick(event.date)}
                  className="w-full text-left bg-black/5 hover:bg-[var(--accent)] hover:text-white p-2 transition-colors group"
                >
                  <div className="font-bold text-sm uppercase">{event.city}</div>
                  <div className="flex justify-between text-[0.65rem] font-['Space_Mono'] opacity-70 group-hover:opacity-100">
                    <span>{event.date}</span>
                    <span>{event.venue}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        ) : (
          <div className="font-['Space_Mono'] text-sm border-t-4 border-[var(--concrete-shadow)] pt-5 text-[var(--concrete-shadow)] w-full hidden lg:block opacity-60">
            <p>LEG: EUROPE</p>
            <p>STATUS: CONFIRMED</p>
            <p className="mt-4 text-xs max-w-[200px]">
              NAVIGATE TIMELINE USING CONTROLS. INPUT CITY DATA TO LOCATE SIGNALS.
            </p>
          </div>
        )}
      </div>

      {/* Decorative Label */}
      <div className="absolute -right-[60px] top-1/2 rotate-90 font-['Space_Mono'] text-[0.7rem] text-[var(--concrete-400)] tracking-[0.5em] hidden lg:block pointer-events-none">
        TECTONIC_SOUND_SYSTEM
      </div>
    </aside>
  );
};