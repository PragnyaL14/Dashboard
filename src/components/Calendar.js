// src/components/Calendar.js
import { Box, Button, Grid, TextField, Paper, Typography } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const [events, setEvents] = useState([
    { title: 'Conference Call', start: new Date(2024, 6, 21, 9, 30), end: new Date(2024, 6, 21, 10, 30) },
    { title: 'Lunch with Client', start: new Date(2024, 6, 21, 12, 0), end: new Date(2024, 6, 21, 13, 0) },
    { title: 'Team Building Activity', start: new Date(2024, 6, 22, 14, 0), end: new Date(2024, 6, 22, 17, 0) },
    { title: 'Project Presentation', start: new Date(2024, 6, 23, 11, 0), end: new Date(2024, 6, 23, 12, 0) },
    { title: 'Doctor Appointment', start: new Date(2024, 6, 24, 16, 0), end: new Date(2024, 6, 24, 16, 30) },
    { title: 'Flight to NYC', start: new Date(2024, 6, 25, 6, 0), end: new Date(2024, 6, 25, 9, 0) },
    { title: 'Dinner with Friends', start: new Date(2024, 6, 25, 19, 0), end: new Date(2024, 6, 25, 21, 0) },
  ]);

  const [formData, setFormData] = useState({ title: '', start: '', end: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddEvent = () => {
    setEvents([
      ...events,
      {
        title: formData.title,
        start: new Date(formData.start),
        end: new Date(formData.end),
      },
    ]);
    setFormData({ title: '', start: '', end: '' });
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <Typography variant="h6" gutterBottom>
          Add New Event
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              name="title"
              label="Title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              name="start"
              label="Start Date"
              type="datetime-local"
              value={formData.start}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              name="end"
              label="End Date"
              type="datetime-local"
              value={formData.end}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
        <Button variant="contained" onClick={handleAddEvent} sx={{ mt: 2 }}>
          Add Event
        </Button>
      </Paper>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </Paper>
    </Box>
  );
};

export default Calendar;
