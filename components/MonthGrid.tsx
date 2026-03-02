import React, { useMemo } from 'react';
import { DayBlock } from './DayBlock';
import { CalendarDay, CalendarEvent } from '../types';

interface MonthGridProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDayClick: (day: number) => void;
}

export const MonthGrid: React.FC<MonthGridProps> = ({ currentDate, events, onDayClick }) => {
  const gridData = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();
    
    const days: CalendarDay[] = [];
    
    for (let i = 0; i < firstDayIndex; i++) {
      days.push({
        day: 0,
        weekday: '',
        isToday: false,
        isEmpty: true,
        delayIndex: i,
        fullDate: ''
      });
    }

    const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const today = new Date();
    
    for (let i = 1; i <= daysInMonth; i++) {
      const totalIndex = i + firstDayIndex - 1; 
      
      const currentDayOfWeekIndex = (firstDayIndex + i - 1) % 7;
      const dayName = weekDays[currentDayOfWeekIndex];

      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      
      const isToday = today.getDate() === i && today.getMonth() === month && today.getFullYear() === year;

      days.push({
        day: i,
        weekday: dayName,
        isToday: isToday,
        isEmpty: false,
        delayIndex: totalIndex + 1,
        fullDate: dateString
      });
    }
    
    return days;
  }, [currentDate]);

  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    events.forEach(ev => {
      if (!map[ev.date]) map[ev.date] = [];
      map[ev.date].push(ev);
    });
    return map;
  }, [events]);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-[2px] bg-[var(--concrete-shadow)] relative auto-rows-[140px] lg:auto-rows-[160px]">
      {gridData.map((data, index) => (
        <DayBlock 
          key={`${data.fullDate}-${index}`} 
          data={data} 
          events={!data.isEmpty ? eventsByDate[data.fullDate] : undefined}
          onClick={onDayClick}
        />
      ))}
    </section>
  );
};