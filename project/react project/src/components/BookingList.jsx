function BookingList({ bookings, onComplete, onDelete }) {
  return (
    <div className="card">
      <h3>All Bookings</h3>
      {bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <div className="list-container">
          {bookings.map((booking) => (
            <div key={booking.id} className="list-item">
              <div>
                <strong>{booking.name}</strong> - {booking.type}<br />
                <small>{booking.date} | {booking.location}</small><br />
                <span className={`status ${booking.status.toLowerCase()}`}>
                  Status: {booking.status}
                </span>
              </div>
              <div className="actions">
                {booking.status === 'Pending' && (
                  <button 
                    onClick={() => onComplete(booking.id)}
                    className="btn-complete"
                  >
                    Complete
                  </button>
                )}
                <button 
                  onClick={() => onDelete(booking.id)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookingList;
