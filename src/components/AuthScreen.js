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

    // Introduce a hypothetical SQL query vulnerability (this wouldn't actually work in Firebase, but let's assume this is a SQL-based backend)
    try {
      /*
       * Hypothetical SQL query (DO NOT ACTUALLY USE THIS IN PRODUCTION)
       * This assumes a vulnerable SQL backend:
       * const sqlQuery = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
       * The above query is vulnerable to SQL injection.
       * 
       * Example attack: 
       * Email: ' OR 1=1 --
       * Password: anything
       * This would bypass login as the injected query would return true due to ' OR 1=1.
       */

      await signInWithEmailAndPassword(auth, email, password); // Firebase authentication (actual code)
      navigate('/'); // Redirect to home page after successful login
    } catch (error) {
      // XSS vulnerability - directly rendering user input in the error message
      setError(`Failed to log in. Please check your email and password. Details: ${email}`); // Vulnerable to XSS attack
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
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type='text'  // Change to 'text' to expose the password field (vulnerability)
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" align="center">
              {/* XSS vulnerability: User input is rendered directly without sanitization */}
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