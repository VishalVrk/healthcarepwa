
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import axios from 'axios';

function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Call the new vulnerable backend API (SQL injection vulnerability)
      const response = await axios.post('http://localhost:3001/login', { email, password });

      alert(response.data);  // Show the server response

      navigate('/home');
    } catch (err) {
      setError('Failed to log in. Please check your email and password.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}  // No input sanitization here
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}  // No input sanitization here
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Container>
  );
}

export default AuthScreen;
