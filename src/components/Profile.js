// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, Avatar } from '@mui/material';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/auth'); // Redirect to auth page after logout
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
          {user.email[0].toUpperCase()}
        </Avatar>
        <Typography component="h1" variant="h5">
          My Profile
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Email: {user.email}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogout}
          sx={{ mt: 3, mb: 2 }}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
}

export default Profile;