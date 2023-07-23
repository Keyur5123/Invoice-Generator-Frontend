import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link } from 'react-router-dom';

export default function CenteredTabs({ currTab, setCurrTab }) {

  const handleChange = (event, newValue) => {
    setCurrTab(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', marginBottom: '20px' }}>
      <Tabs value={currTab} onChange={handleChange} centered>
        <Tab label="Add Items" />
        <Tab label="View Products" />
        <Tab label="View Party" />
      </Tabs>
    </Box>
  );
}