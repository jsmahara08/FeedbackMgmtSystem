// src/components/Footer.js

import React from 'react';
import { Container, Box, Typography,Grid} from '@mui/material';


const AdminFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        py: 3,
          bottom: 0,
          position: 'fixed',
        width:'100%'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="inherit">
              &copy; 2024 Janak Mahara. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminFooter;
