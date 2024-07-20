// src/components/Table.js
import { Box, Button, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'age', headerName: 'Age', type: 'number', width: 110 },
];

const Table = () => {
  const [rows, setRows] = useState([
    { id: 1, name: 'Kim SeokJin', age: 32 },
    { id: 2, name: 'Min Yoongi', age: 31 },
    { id: 3, name: 'Jung Hoseok', age: 30 },
    { id: 4, name: 'Kim Namjoon', age: 30 },
    { id: 5, name: 'Park Jimin', age: 29 },
    { id: 6, name: 'Kim Taehyung', age: 29 },
    { id: 7, name: 'Jeon Jungkook', age: 27 },
  ]);

  const [formData, setFormData] = useState({ id: '', name: '', age: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddRow = () => {
    setRows([...rows, { ...formData, id: rows.length + 1 }]);
    setFormData({ id: '', name: '', age: '' });
  };

  return (
    <div>
      <Box mb={2}>
        <TextField
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          sx={{ mr: 2 }}
        />
        <TextField
          name="age"
          label="Age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" onClick={handleAddRow}>
          Add Row
        </Button>
      </Box>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
      </Box>
    </div>
  );
};

export default Table;
