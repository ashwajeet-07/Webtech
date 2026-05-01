import { useState } from 'react';

function AddBooking({ onAdd }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !type || !date || !location) {
      alert('Please fill in all fields');
      return;
    }

    const newBooking = {
      id: Date.now(),
      name,
      type,
      date,
      location,
      status: 'Pending'
    };

    onAdd(newBooking);

    // Clear form
    setName('');
    setType('');
    setDate('');
    setLocation('');
  };

  return (
    <div className="card">
      <h3>Add New Booking</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Client Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter client name"
          />
        </div>
        <div className="form-group">
          <label>Event Type:</label>
          <input 
            type="text" 
            value={type} 
            onChange={(e) => setType(e.target.value)} 
            placeholder="e.g. Wedding, Portrait"
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input 
            type="text" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            placeholder="Event location"
          />
        </div>
        <button type="submit" className="btn-add">Add Booking</button>
      </form>
    </div>
  );
}

export default AddBooking;
