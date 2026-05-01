import { Routes } from '@angular/router';
import { AddBooking } from './add-booking/add-booking';
import { BookingList } from './booking-list/booking-list';

export const routes: Routes = [
  { path: 'add', component: AddBooking },
  { path: 'list', component: BookingList },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
];
