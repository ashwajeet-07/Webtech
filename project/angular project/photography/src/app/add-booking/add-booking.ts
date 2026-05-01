import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../booking';
import { Booking } from '../booking.model';

@Component({
  selector: 'app-add-booking',
  imports: [FormsModule],
  templateUrl: './add-booking.html',
  styleUrl: './add-booking.css',
})
export class AddBooking {
  clientName: string = '';
  eventType: string = '';
  date: string = '';
  location: string = '';

  constructor(private bookingService: BookingService) {}

  addBooking() {
    if (this.clientName && this.eventType && this.date && this.location) {
      const newBooking: Booking = {
        id: Date.now(),
        clientName: this.clientName,
        eventType: this.eventType,
        date: this.date,
        location: this.location,
        status: 'Pending',
      };
      this.bookingService.addBooking(newBooking);
      // Reset form
      this.clientName = '';
      this.eventType = '';
      this.date = '';
      this.location = '';
      alert('Booking added successfully!');
    } else {
      alert('Please fill in all fields.');
    }
  }
}
