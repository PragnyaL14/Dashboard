// src/pages/Dashboard.js
import { Container, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import Calendar from '../components/Calendar';
import Charts from '../components/Charts';
import KanbanBoard from '../components/KanbanBoard';
import Table from '../components/Table';

const Dashboard = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Sales Chart
            </Typography>
            <Charts />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Data Table
            </Typography>
            <Table />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Calendar
            </Typography>
            <Calendar />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Kanban Board
            </Typography>
            <KanbanBoard />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
