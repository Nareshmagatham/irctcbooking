import React, { useState } from 'react';
import { registerUser } from './api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await registerUser({ username, password, is_admin: isAdmin });
      alert('User registered successfully!');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Failed to register user.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <label>
        <input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
        Admin
      </label>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
