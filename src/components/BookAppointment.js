
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, MenuItem } from '@mui/material';
import { db, auth } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

function BookAppointment() {
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      const querySnapshot = await getDocs(collection(db, "doctors"));
      setDoctors(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // No input validation for fields (XSS vulnerability)
      await addDoc(collection(db, 'appointments'), {
        doctor,
        date,
        time,
        reason  // Vulnerable to XSS: No sanitization of user input
      });

      alert(`Appointment booked with ${doctor} on ${date} at ${time} for ${reason}`);  // XSS vulnerability

      navigate('/appointments');
    } catch (error) {
      setError('Failed to book appointment.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="doctor"
          label="Select Doctor"
          name="doctor"
          select
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}  // No sanitization here
        >
          {doctors.map((doc) => (
            <MenuItem key={doc.id} value={doc.name}>
              {doc.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="normal"
          required
          fullWidth
          id="date"
          label="Date"
          name="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}  // No validation or sanitization
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="time"
          label="Time"
          name="time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}  // No validation or sanitization
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="reason"
          label="Reason for Appointment"
          name="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}  // No sanitization here
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Book Appointment
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Container>
  );
}

export default BookAppointment;
