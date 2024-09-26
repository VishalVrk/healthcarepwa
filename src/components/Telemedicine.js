import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Container, Box } from '@mui/material';

function Telemedicine() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h5" align="center" gutterBottom>
        Telemedicine Consultation
      </Typography>
      <Box my={2}>
        <Typography>
          Dr. Johnson - Cardiologist
        </Typography>
        <Typography color="textSecondary">
          Available Now
        </Typography>
      </Box>
      <Button variant="contained" color="primary" fullWidth>
        Start Video Call
      </Button>
      <Box mt={2}>
        <Button component={Link} to="/" color="primary">
          Back to Home
        </Button>
      </Box>
    </Container>
  );
}

export default Telemedicine;