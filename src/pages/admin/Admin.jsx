import React from 'react'
import AdminHeader from './components/adminhHeaderFooter/AdminHeader';
import AdminFooter from './components/adminhHeaderFooter/AdminFooter';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';
function Admin() {
  return (
    <>
      <AdminHeader />
      <Container >
       <Link to="/admin/manage-class" >Manage Class</Link>
      </Container>
    
  <AdminFooter/>
    </>
  )
}

export default Admin;
