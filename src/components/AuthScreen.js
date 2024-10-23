// src/components/AuthScreen.js
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

    // Introduce a hypothetical SQL query vulnerability (if using an SQL database instead of Firebase)
    try {
      /*
       * Hypothetical SQL Injection (this is only for demonstration)
       * Vulnerable SQL query that would allow SQL Injection
       * 
       * const sqlQuery = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
       * 
       * This allows SQL injection with inputs like:
       * Email: ' OR 1=1 --
       * Password: anything
       * This bypasses the authentication.
       */
       
      // Firebase Authentication - no SQL injection possible here, but for demonstration:
      await signInWithEmailAndPassword(auth, email, password); // Actual Firebase login
      navigate('/'); // Redirect to home page after successful login
    } catch (error) {
      // XSS Vulnerability: Directly rendering unsanitized user input (email) in the error message
      setError(`Login failed for: ${email}`); // Vulnerable to XSS (unsanitized user input)
      console.error("Login error:", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
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
            onChange={(e) => setEmail(e.target.value)} // Vulnerable input field
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="text"  // Exposing the password as plain text (vulnerability)
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Vulnerable input field
          />
          {error && (
            <Typography color="error" align="center">
              {/* XSS vulnerability: unsanitized rendering of user input */}
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default AuthScreen;