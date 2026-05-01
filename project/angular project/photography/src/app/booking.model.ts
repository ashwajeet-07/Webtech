export interface Booking {
  id: number;
  clientName: string;
  eventType: string;
  date: string;
  location: string;
  status: 'Pending' | 'Completed';
}
