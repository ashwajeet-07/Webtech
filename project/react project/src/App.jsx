import { useState } from 'react';
import './App.css';
import AddBooking from './components/AddBooking';
import BookingList from './components/BookingList';
import Reels from './components/Reels';
import TeamJoin from './components/TeamJoin';
import Gallery from './components/Gallery';

function App() {
  // State for bookings - defined here to pass down to AddBooking and BookingList
  const [bookings, setBookings] = useState([]);

  // Function to add a new booking
  const addBooking = (newBooking) => {
    setBookings([...bookings, newBooking]);
  };

  // Function to mark a booking as completed
  const completeBooking = (id) => {
    const updatedBookings = bookings.map((b) => 
      b.id === id ? { ...b, status: 'Completed' } : b
    );
    setBookings(updatedBookings);
  };

  // Function to delete a booking
  const deleteBooking = (id) => {
    const filteredBookings = bookings.filter((b) => b.id !== id);
    setBookings(filteredBookings);
  };

  return (
    <div className="container">
      <h1>Photography Creator Dashboard</h1>
      
      <div className="dashboard-grid">
        {/* Booking Section */}
        <div className="section">
          <AddBooking onAdd={addBooking} />
          <BookingList 
            bookings={bookings} 
            onComplete={completeBooking} 
            onDelete={deleteBooking} 
          />
        </div>

        {/* Reels, Team, and Gallery Sections */}
        <div className="section">
          <Reels />
          <TeamJoin />
          <Gallery />
        </div>
      </div>
    </div>
  );
}

export default App;
