import React from 'react';
import { CalendarDay, CalendarEvent } from '../types';

interface DayBlockProps {
  data: CalendarDay;
  events?: CalendarEvent[];
  onClick: (day: number) => void;
}

export const DayBlock: React.FC<DayBlockProps> = ({ data, events = [], onClick }) => {
  const { day, weekday, isToday, isEmpty, delayIndex } = data;
  const hasEvent = events.length > 0;
  const event = events[0];

  const activeStateClasses = isToday 
    ? "bg-[var(--accent)] text-white z-20 shadow-[10px_10px_0px_var(--concrete-shadow)] translate-x-[-6px] translate-y-[-6px]"
    : hasEvent 
      ? "bg-[var(--concrete-100)] text-[var(--concrete-shadow)] hover:bg-white hover:z-20 hover:shadow-[10px_10px_0px_var(--accent)] hover:translate-x-[-6px] hover:translate-y-[-6px] cursor-pointer"
      : "bg-[var(--concrete-200)] text-[var(--concrete-shadow)] hover:bg-[var(--concrete-100)] cursor-pointer";

  return isEmpty ? (
    <div 
      className="bg-[var(--concrete-400)] opacity-50 relative animate-[blockFade_0.5s_ease_forwards]"
      style={{ animationDelay: `${delayIndex * 0.02}s`, opacity: 0 }}
    />
  ) : (
    <div 
      onClick={() => onClick(day)}
      className={`relative p-2 md:p-3 flex flex-col justify-between overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] group min-h-[140px] ${activeStateClasses} animate-[blockFade_0.5s_ease_forwards]`}
      style={{ animationDelay: `${delayIndex * 0.02}s`, opacity: 0 }}
    >
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')] z-10" />

      <div className="flex justify-between items-start w-full z-20">
        <span className={`font-['Space_Mono'] font-bold text-xl ${hasEvent ? 'scale-100' : 'opacity-50'}`}>
          {day < 10 ? `0${day}` : day}
        </span>
        <span className="text-[0.5rem] uppercase font-black tracking-widest opacity-60">
          {weekday}
        </span>
      </div>

      <div className="z-20 mt-2 flex-grow flex flex-col justify-end">
        {hasEvent ? (
          <div className="relative">
            {event.status === 'SOLD_OUT' && (
               <div className="absolute -top-6 -right-2 text-[0.6rem] font-bold text-[var(--accent)] border border-[var(--accent)] px-1 rotate-[-10deg] bg-white">
                 SOLD OUT
               </div>
            )}
            {event.status === 'CANCELED' && (
               <div className="absolute -top-6 -right-2 text-[0.6rem] font-bold text-[var(--accent)] border border-[var(--accent)] px-1 rotate-[-10deg] bg-white">
                 CANCELED
               </div>
            )}
            {event.status === 'EXPIRED' && (
               <div className="absolute -top-6 -right-2 text-[0.6rem] font-bold text-[var(--accent)] border border-[var(--accent)] px-1 rotate-[-10deg] bg-white">
                 EXPIRED
               </div>
            )}
            <div className="font-black text-lg md:text-xl uppercase leading-[0.85] tracking-tight break-all">
              {event.city}
            </div>
            <div className="text-[0.6rem] font-['Space_Mono'] truncate bg-[var(--concrete-shadow)] text-white px-1 py-0.5 mt-1 inline-block max-w-full">
              {event.venue}
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-end opacity-10">
            <div className="w-full h-1 bg-current"></div>
          </div>
        )}
      </div>
    </div>
  );
};