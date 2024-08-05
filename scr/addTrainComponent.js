import React, { useState } from 'react';
import { addTrain } from './api';

const AddTrain = ({ token }) => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [totalSeats, setTotalSeats] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await addTrain({ source, destination, total_seats: totalSeats }, token);
      alert('Train added successfully!');
    } catch (error) {
      console.error('Error adding train:', error);
      alert('Failed to add train.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={source} onChange={(e) => setSource(e.target.value)} placeholder="Source" required />
      <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Destination" required />
      <input type="number" value={totalSeats} onChange={(e) => setTotalSeats(e.target.value)} placeholder="Total Seats" required />
      <button type="submit">Add Train</button>
    </form>
  );
};

export default AddTrain;
