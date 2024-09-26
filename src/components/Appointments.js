import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Container, Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { db, auth } from '../firebase';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    if (auth.currentUser) {
      const q = query(collection(db, "appointments"), where("userId", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      const appointmentList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(appointmentList);
      setAppointments(appointmentList);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDelete = async (appointmentId) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await deleteDoc(doc(db, "appointments", appointmentId));
        // Refresh the appointments list after deletion
        fetchAppointments();
      } catch (error) {
        console.error("Error deleting appointment: ", error);
        alert("Failed to delete appointment. Please try again.");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" align="center" gutterBottom>
        Upcoming Appointments
      </Typography>
      <List>
        {appointments.map((appointment) => (
          <ListItem key={appointment.id}
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(appointment.id)}>
                        <DeleteIcon />
                      </IconButton>
                    }>
            <ListItemText 
              primary={appointment.doctorName}
              secondary={`${new Date(appointment.datetime).toLocaleDateString()}`}
            />
          </ListItem>
        ))}
      </List>
      <Button 
        component={Link} 
        to="/book-appointment" 
        variant="contained" 
        color="primary" 
        fullWidth
      >
        Book New Appointment
      </Button>
      <Box mt={2}>
        <Button component={Link} to="/" color="primary">
          Back to Home
        </Button>
      </Box>
    </Container>
  );
}

export default Appointments;