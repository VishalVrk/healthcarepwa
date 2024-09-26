// src/components/BookAppointment.js
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

  const validateDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    const parts = dateString.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const date = new Date(year, month, day);
    return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
  };

  const validateTime = (timeString) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(timeString);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!doctor || !date || !time || !reason) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateDate(date)) {
      setError('Please enter a valid date in YYYY-MM-DD format');
      return;
    }

    if (!validateTime(time)) {
      setError('Please enter a valid time in HH:MM format (24-hour)');
      return;
    }

    try {
      const [year, month, day] = date.split('-').map(Number);
      const [hours, minutes] = time.split(':').map(Number);
      const appointmentDate = new Date(year, month - 1, day, hours, minutes);

      const appointmentData = {
        userId: auth.currentUser.uid,
        doctorId: doctor,
        doctorName: doctors.find(d => d.id === doctor).name,
        datetime: appointmentDate.toISOString(),
        reason: reason,
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, "appointments"), appointmentData);
      alert('Appointment booked successfully!');
      navigate('/appointments');
    } catch (error) {
      setError('Failed to book appointment. Please try again.');
      console.error("Appointment booking error:", error);
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
          Book New Appointment
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            select
            margin="normal"
            required
            fullWidth
            id="doctor"
            label="Select Doctor"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
          >
            {doctors.map((doc) => (
              <MenuItem key={doc.id} value={doc.id}>
                {doc.name} - {doc.specialty}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="normal"
            required
            fullWidth
            id="date"
            label="Appointment Date (YYYY-MM-DD)"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="e.g., 2024-09-30"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="time"
            label="Appointment Time (HH:MM)"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="e.g., 14:30"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="reason"
            label="Reason for Visit"
            name="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            multiline
            rows={4}
          />
          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Book Appointment
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default BookAppointment;