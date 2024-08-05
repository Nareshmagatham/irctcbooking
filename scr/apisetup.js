import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const registerUser = (userData) => axios.post(`${API_URL}/register/`, userData);
export const loginUser = (credentials) => axios.post(`${API_URL}/login/`, credentials);
export const addTrain = (trainData, token) => axios.post(`${API_URL}/trains/`, trainData, {
  headers: { 'Authorization': `Bearer ${token}` }
});
export const getSeatAvailability = (source, destination) => axios.get(`${API_URL}/availability/?source=${source}&destination=${destination}`);
export const bookSeat = (trainId, token) => axios.post(`${API_URL}/book/${trainId}/`, {}, {
  headers: { 'Authorization': `Bearer ${token}` }
});
export const getBookingDetails = (bookingId, token) => axios.get(`${API_URL}/bookings/${bookingId}/`, {
  headers: { 'Authorization': `Bearer ${token}` }
});
