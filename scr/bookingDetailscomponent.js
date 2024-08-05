import React, { useState } from 'react';
import { getBookingDetails } from './api';

const BookingDetails = ({ token }) => {
  const [bookingId, setBookingId] = useState('');
  const [bookingDetails, setBookingDetails] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await getBookingDetails(bookingId, token);
      setBookingDetails(response.data);
    } catch (error) {
      console.error('Error fetching booking details:', error);
      alert('Failed to fetch booking details.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" value={bookingId} onChange={(e) => setBookingId(e.target.value)} placeholder="Booking ID" required />
        <button type="submit">Search</button>
      </form>
      {bookingDetails && (
        <div>
          <p>Train: {bookingDetails.train.source} to {bookingDetails.train.destination}</p>
          <p>Seat Number: {bookingDetails.seat_number}</p>
          <p>Booking Date: {new Date(bookingDetails.timestamp).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;
