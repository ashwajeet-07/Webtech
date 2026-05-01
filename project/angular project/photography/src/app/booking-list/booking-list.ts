import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../booking';
import { Booking } from '../booking.model';

@Component({
  selector: 'app-booking-list',
  imports: [CommonModule],
  templateUrl: './booking-list.html',
  styleUrl: './booking-list.css',
})
export class BookingList implements OnInit {
  bookings: Booking[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.bookings = this.bookingService.getBookings();
  }

  // Since it's a reference, we just need to get it once or update after delete
  refreshList() {
    this.bookings = this.bookingService.getBookings();
  }

  markAsCompleted(id: number) {
    this.bookingService.markAsCompleted(id);
  }

  deleteBooking(id: number) {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookingService.deleteBooking(id);
      this.refreshList();
    }
  }
}
