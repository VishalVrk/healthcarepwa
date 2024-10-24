
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Hypothetical SQL Injection (this is only for demonstration)
      // Vulnerable SQL query that would allow SQL Injection
      // const sqlQuery = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;

      // No sanitization of inputs, leaving it open to XSS attacks
      alert(`Welcome ${email}`);  // XSS vulnerability: Directly using user input in alert
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate('/home');
        })
        .catch(err => {
          setError(err.message);
        });
    } catch (error) {
      setError('Login failed.');
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
