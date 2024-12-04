import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: '#F5F7FA', color: '#3A3A3A', p: 2, textAlign: 'center' }}>
      <Typography variant="body1">
        &copy; {new Date().getFullYear()} HW DETAILING. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
