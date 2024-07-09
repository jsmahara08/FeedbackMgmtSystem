import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Admin from '../pages/admin/Admin';
import Shift from '../pages/admin/manageClass/components/Shift';
import ManageClass from '../pages/admin/manageClass/ManageClass';
import Faculty from '../pages/admin/manageClass/components/Faculty';
import Grade from '../pages/admin/manageClass/components/Grade';
import Group from '../pages/admin/manageClass/components/Group';
import Section from '../pages/admin/manageClass/components/Section';
import Course from '../pages/admin/manageClass/components/Course';
import Teacher from '../pages/admin/manageClass/components/Teacher';
import ClassManagement from '../pages/admin/manageClass/components/ClassManagement';
import ClassTeacher from '../pages/admin/manageClass/components/ClassTeacher';

const RouterAll = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/admin' element={<Admin />} />
      <Route path='/admin/manage-class' element={<ManageClass />}>
        <Route path='shift' element={<Shift />} />
        <Route path='faculty' element={<Faculty />} />
        <Route path='grade' element={<Grade />} />
        <Route path='group' element={<Group />} />
        <Route path='section' element={<Section />} />
        <Route path='course' element={<Course />} />
        <Route path='teacher' element={<Teacher />} />
        <Route path='manage-class' element={<ClassManagement />} />
        <Route path='class-teacher' element={<ClassTeacher />} />
        {/* Add other nested routes here */}
      </Route>
    </Routes>
  );
};

export default RouterAll;
