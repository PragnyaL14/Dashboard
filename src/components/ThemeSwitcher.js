// src/components/ThemeSwitcher.js
import { Box, FormControlLabel, Switch, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const ThemeSwitcher = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <Box display="flex" alignItems="center" sx={{ m: 2 }}>
      {darkMode ? <Brightness4 sx={{ mr: 1 }} /> : <Brightness7 sx={{ mr: 1 }} />}
      <FormControlLabel
        control={
          <Switch
            checked={darkMode}
            onChange={toggleDarkMode}
            sx={{
              '& .MuiSwitch-switchBase': {
                color: darkMode ? '#f5b342' : '#4a90e2',
              },
              '& .Mui-checked': {
                color: darkMode ? '#f5b342' : '#4a90e2',
              },
              '& .MuiSwitch-track': {
                backgroundColor: darkMode ? '#f5b342' : '#4a90e2',
              },
            }}
          />
        }
        label={<Typography variant="body1">{darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</Typography>}
      />
    </Box>
  );
};

export default ThemeSwitcher;
