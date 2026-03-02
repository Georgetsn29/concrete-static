import React, { useState, useEffect, useMemo } from 'react';
import { Sidebar } from './Sidebar';
import { MonthGrid } from './MonthGrid';
import { EventModal } from './EventModal';
import { CalendarEvent, TicketStatus } from '../types';

export const CalendarSystem: React.FC = () => {
  const [allEvents, setAllEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1)); 
  const [selectedDayEvents, setSelectedDayEvents] = useState<{day: number, events: CalendarEvent[]} | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const deriveStatus = (qty: number, eventDateStr: string): TicketStatus => {
  const eventDate = new Date(eventDateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (eventDate < today) return 'EXPIRED';
  if (qty === -1) return 'CANCELED';
  if (qty === 0) return 'SOLD_OUT';
  if (qty < 100) return 'FEW_LEFT';
  return 'AVAILABLE';
};

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/tours");
        const data = await response.json();
        
        const processedEvents = data.map((item: any) => ({
          ...item,
          quantity: item.quantity, 
          status: deriveStatus(item.quantity, item.date)
        }));

        setAllEvents(processedEvents);
      } catch (error) {
        console.error("Transmission Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  const currentMonthEvents = useMemo(() => 
    allEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === currentDate.getMonth() && 
             eventDate.getFullYear() === currentDate.getFullYear();
    }), [currentDate, allEvents]);

  const searchResults = useMemo(() => (
    !searchQuery.trim() ? [] : 
    allEvents.filter(event => 
      event.city.toLowerCase().includes(searchQuery.toLowerCase()) || 
      event.venue.toLowerCase().includes(searchQuery.toLowerCase())
    )
  ), [searchQuery, allEvents]);

  const handlePrevMonth = () => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

  const handleDayClick = (day: number) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const events = allEvents.filter(e => e.date === dateStr);
    setSelectedDayEvents({ day, events });
  };

  const handleSearchResultClick = (dateStr: string) => {
    const targetDate = new Date(dateStr);
    const day = targetDate.getDate();
    const events = allEvents.filter(e => e.date === dateStr);
    setCurrentDate(new Date(targetDate.getFullYear(), targetDate.getMonth(), 1));
    setSelectedDayEvents({ day, events });
  };

  if (loading) {
    return <div className="h-full w-full flex items-center justify-center font-mono text-[var(--accent)] animate-pulse">INITIALIZING_CALENDAR_FEED...</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-[2px] bg-[var(--concrete-shadow)] h-full w-full animate-[blockFade_0.5s_ease_forwards]">
        <style>{`@keyframes blockFade { from { opacity: 0; } to { opacity: 1; } }`}</style>
        <Sidebar 
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchResults={searchResults}
          onResultClick={handleSearchResultClick}
        />
        <MonthGrid 
          currentDate={currentDate}
          events={currentMonthEvents} 
          onDayClick={handleDayClick}
        />
      </div>
      {selectedDayEvents && (
        <EventModal 
          day={selectedDayEvents.day}
          events={selectedDayEvents.events}
          onClose={() => setSelectedDayEvents(null)}
          onAddEvent={() => {}} 
        />
      )}
    </>
  );
};