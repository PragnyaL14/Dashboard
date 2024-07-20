// src/components/Charts.js
import { Box, Button, TextField, Grid, Paper } from '@mui/material';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Charts = () => {
  const [labels, setLabels] = useState(['January', 'February', 'March', 'April', 'May', 'June', 'July']);
  const [dataPoints, setDataPoints] = useState([12, 19, 3, 5, 2, 3, 9]);

  const [formData, setFormData] = useState({ label: '', dataPoint: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddDataPoint = () => {
    setLabels([...labels, formData.label]);
    setDataPoints([...dataPoints, parseFloat(formData.dataPoint)]);
    setFormData({ label: '', dataPoint: '' });
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Website Traffic',
        data: dataPoints,
        fill: false,
        backgroundColor: 'rgba(153,102,255,0.2)',
        borderColor: 'rgba(153,102,255,1)',
        tension: 0.4,  // Smoother line
        pointStyle: 'rectRounded', // Rounded points
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Website Traffic Data',
        font: {
          size: 20,
        },
      },
    },
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={5}>
            <TextField
              name="label"
              label="Label"
              fullWidth
              value={formData.label}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              name="dataPoint"
              label="Data Point"
              type="number"
              fullWidth
              value={formData.dataPoint}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" fullWidth onClick={handleAddDataPoint}>
              Add Data Point
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Line data={data} options={options} />
      </Paper>
    </Box>
  );
};

export default Charts;
