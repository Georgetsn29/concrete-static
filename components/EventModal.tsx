import React from 'react';
import { CalendarEvent } from '../types';

interface EventModalProps {
  day: number;
  events: CalendarEvent[];
  onClose: () => void;
  onAddEvent: (event: any) => void;
}

export const EventModal: React.FC<EventModalProps> = ({ day, events, onClose }) => {
  const hasEvent = events.length > 0;
  
  const displayDate = hasEvent 
    ? new Date(events[0].date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase()
    : `DAY ${day < 10 ? `0${day}` : day}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-[var(--concrete-200)] border-4 border-[var(--concrete-shadow)] shadow-[30px_30px_0px_var(--accent)] p-8 md:p-12 animate-[slideUp_0.3s_ease-out]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl font-bold hover:text-[var(--accent)] transition-colors"
        >
          ✕
        </button>

        <div className="flex justify-between items-end border-b-4 border-[var(--concrete-shadow)] pb-4 mb-8">
           <div>
             <h2 className="font-['Space_Mono'] text-sm tracking-[0.2em] uppercase mb-1 text-[var(--concrete-400)]">
               DATE_INDEX: {displayDate}
             </h2>
             <h1 className="text-4xl md:text-4xl font-black uppercase text-[var(--concrete-shadow)] leading-none">
               TRANSMISSION_LOG
             </h1>
           </div>
           {hasEvent && (
              <div className="hidden md:block text-right">
                <div className="bg-black text-white font-['Space_Mono'] text-xs px-2 py-1 inline-block">
                  SERIAL: {events[0].id.replace(/[^0-9]/g, '').padStart(4, '0')}
                </div>
              </div>
           )}
        </div>

        <div className="min-h-[200px] flex flex-col justify-center">
          {!hasEvent ? (
            <div className="text-center py-10 opacity-50">
               <div className="text-6xl mb-4 text-[var(--concrete-shadow)]">///</div>
               <h3 className="font-['Space_Mono'] text-xl uppercase tracking-widest">No Signal Detected</h3>
               <p className="font-['Space_Mono'] text-xs mt-2">SYSTEM STANDBY. NO SCHEDULED OPERATIONS.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {events.map((event) => {
                const status = event.status;
                const isUnavailable = status === 'SOLD_OUT' || status === 'CANCELED' || status === 'EXPIRED';
                const statusStyles = status === 'SOLD_OUT' || status === 'CANCELED' || status === 'EXPIRED'
                  ? 'border-[var(--accent)] text-[var(--accent)]' 
                  : status === 'FEW_LEFT' 
                    ? 'border-yellow-600 text-yellow-600' 
                    : 'border-green-700 text-green-700';

                return (
                  <div key={event.id} className="relative">
                    <div className={`absolute -top-6 right-0 rotate-[-10deg] border-4 px-4 py-1 text-xl font-black uppercase tracking-widest opacity-90 z-10 ${statusStyles}`}>
                      {status.replace('_', ' ')}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-start">
                      <div>
                        <h2 className="text-5xl md:text-5xl font-black uppercase text-[var(--concrete-shadow)] leading-[0.8] mb-2 break-all">
                          {event.city}
                        </h2>
                        <h3 className="text-xl md:text-2xl font-bold uppercase bg-[var(--concrete-shadow)] text-white inline-block px-2 py-1 mb-4">
                          {event.venue}
                        </h3>
                        
                        <div className="font-['Space_Mono'] text-sm grid grid-cols-2 gap-4 mt-4 border-l-2 border-[var(--concrete-shadow)] pl-4">
                          <div>
                            <span className="block text-[var(--concrete-400)] text-xs">DOORS</span>
                            <span className="font-bold">{event.startTime}</span>
                          </div>
                          <div>
                            <span className="block text-[var(--concrete-400)] text-xs">DURATION</span>
                            <span className="font-bold">{event.durationMinutes} MIN</span>
                          </div>
                          <div>
                            <span className="block text-[var(--concrete-400)] text-xs">AVAILABILITY</span>
                            <span className={`font-bold ${event.quantity <= 100 && event.quantity > 0 ? 'text-[var(--accent)]' : ''}`}>
                              {status === 'CANCELED' ? 'N/A' : `${event.quantity} UNITS`}
                            </span>
                          </div>
                          {event.description && (
                            <div className="col-span-2">
                               <span className="block text-[var(--concrete-400)] text-xs">NOTES</span>
                               <span className="uppercase">{event.description}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 w-full md:w-48 mt-8 md:mt-0">
                        <button 
                          disabled={isUnavailable}
                          className={`w-full py-4 font-black uppercase tracking-widest transition-all
                            ${isUnavailable 
                              ? 'bg-[var(--concrete-300)] text-[var(--concrete-400)] cursor-not-allowed line-through decoration-2' 
                              : 'bg-[var(--accent)] text-white hover:bg-black hover:translate-x-1 hover:translate-y-1 shadow-[5px_5px_0px_var(--concrete-shadow)]'}`}
                        >
                          {status === 'EXPIRED' ? 'ARCHIVED' : isUnavailable ? 'UNAVAILABLE' : 'GET TICKETS'}
                        </button>
                        <button className="w-full py-2 border-2 border-[var(--concrete-shadow)] font-['Space_Mono'] text-xs uppercase hover:bg-[var(--concrete-shadow)] hover:text-white transition-colors">
                          Add to Cal
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};