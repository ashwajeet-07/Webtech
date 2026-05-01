import { Injectable } from '@angular/core';
import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private bookings: Booking[] = [];

  constructor() {}

  getBookings(): Booking[] {
    return this.bookings;
  }

  addBooking(booking: Booking) {
    this.bookings.push(booking);
  }

  deleteBooking(id: number) {
    this.bookings = this.bookings.filter((b) => b.id !== id);
  }

  markAsCompleted(id: number) {
    const booking = this.bookings.find((b) => b.id === id);
    if (booking) {
      booking.status = 'Completed';
    }
  }
}
