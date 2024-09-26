// components/TrackVitals.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Container, Box, TextField } from '@mui/material';

function TrackVitals() {
  const [heartRate, setHeartRate] = useState('');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');

  const handleSave = () => {
    // Implement save functionality here
    console.log('Saving vitals:', { heartRate, systolic, diastolic });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" align="center" gutterBottom>
        Track Your Vitals
      </Typography>
      <Box my={2}>
        <Typography>Heart Rate</Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="BPM"
          value={heartRate}
          onChange={(e) => setHeartRate(e.target.value)}
        />
      </Box>
      <Box my={2}>
        <Typography>Blood Pressure</Typography>
        <Box display="flex" justifyContent="space-between">
          <TextField
            variant="outlined"
            placeholder="Systolic"
            value={systolic}
            onChange={(e) => setSystolic(e.target.value)}
            style={{ width: '48%' }}
          />
          <TextField
            variant="outlined"
            placeholder="Diastolic"
            value={diastolic}
            onChange={(e) => setDiastolic(e.target.value)}
            style={{ width: '48%' }}
          />
        </Box>
      </Box>
      <Button variant="contained" color="primary" fullWidth onClick={handleSave}>
        Save Vitals
      </Button>
      <Box mt={2}>
        <Button component={Link} to="/" color="primary">
          Back to Home
        </Button>
      </Box>
    </Container>
  );
}

export default TrackVitals;