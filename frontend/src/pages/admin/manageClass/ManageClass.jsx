import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/adminhHeaderFooter/AdminHeader';
import AdminFooter from '../components/adminhHeaderFooter/AdminFooter';
import DropdownMenu from '../components/drops/DropdownMenu';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Paper } from '@mui/material/';

const ManageClass = () => {
  const menuItems = [
    { text: 'Shift', link: 'shift' },
    { text: 'Faculty', link: 'faculty' },
    { text: 'Grade', link: 'grade' },
    { text: 'Section', link: 'section' },
    { text: 'Manage Class', link: 'manage-class' },
    { text: 'Group', link: 'group' },
    { text: 'Course', link: 'course' },
    { text: 'Teacher', link: 'teacher' },
    { text: 'Class Teacher', link: 'class-teacher' },
  ];
  const initialTitle = "Manage Class";
  return (
    <React.Fragment>
      <CssBaseline />
      <AdminHeader />
      <DropdownMenu initialTitle={initialTitle} menuItems={menuItems} />
      <Box sx={{ width: '100%', mx: 'auto',minHeight:'600px'}}>
        <Paper sx={{ padding: 4 }}>
          <Outlet />
       </Paper>
      </Box>
      <AdminFooter />
    </React.Fragment>
  );
};

export default ManageClass;
