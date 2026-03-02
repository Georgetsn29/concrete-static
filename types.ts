
export type PageType = 'HOME' | 'ABOUT' | 'TOUR';

export type TicketStatus = 'AVAILABLE' | 'SOLD_OUT' | 'FEW_LEFT' | 'CANCELED' | 'EXPIRED';

export interface CalendarEvent {
  id: string;
  date: string;
  title: string; 
  description: string;
  startTime: string; 
  durationMinutes: number;
  city: string;
  venue: string;
  status: TicketStatus;
}

export interface CalendarDay {
  day: number;
  weekday: string;
  isToday: boolean;
  isEmpty: boolean;
  delayIndex: number;
  fullDate: string;
}

export interface BandMember {
  id: string;
  name: string;
  position: string;
  description: string;
  imagePattern: string;
  imageUrl: string;
}