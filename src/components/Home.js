import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Typography, Container } from '@mui/material';
import { CalendarToday, Favorite, Videocam, Person } from '@mui/icons-material';

function Home() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        HealthCare App
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            component={Link}
            to="/appointments"
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<CalendarToday />}
          >
            Appointments
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            component={Link}
            to="/track-vitals"
            variant="contained"
            color="secondary"
            fullWidth
            startIcon={<Favorite />}
          >
            Track Vitals
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            component={Link}
            to="/telemedicine"
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<Videocam />}
          >
            Telemedicine
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            component={Link}
            to="/profile"
            variant="contained"
            color="secondary"
            fullWidth
            startIcon={<Person />}
          >
            My Profile
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;