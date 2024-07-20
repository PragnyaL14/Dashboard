// src/pages/Settings.js
import { Container, Paper, Typography } from '@mui/material';
import React from 'react';
import ThemeSwitcher from '../components/ThemeSwitcher';

const Settings = () => {
  return (
    <Container>
      <Paper style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>
        <ThemeSwitcher />
      </Paper>
    </Container>
  );
};

export default Settings;
