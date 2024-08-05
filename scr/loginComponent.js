import React, { useState } from 'react';
import { loginUser } from './api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser({ username, password });
      setToken(response.data.access);
      alert('User logged in successfully!');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Failed to login.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
