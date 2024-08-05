import React, { useState } from 'react';
import { bookSeat } from './api';

const BookSeat = ({ token }) => {
  const [trainId, setTrainId] = useState('');
  const [seatNumber, setSeatNumber] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await bookSeat(trainId, token);
      setSeatNumber(response.data.seat_number);
      alert('Seat booked successfully!');
    } catch (error) {
      console.error('Error booking seat:', error);
      alert('Failed to book seat.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={trainId} onChange={(e) => setTrainId(e.target.value)} placeholder="Train ID" required />
      <button type="submit">Book Seat</button>
      {seatNumber && <p>Seat Number: {seatNumber}</p>}
    </form>
  );
};

export default BookSeat;
