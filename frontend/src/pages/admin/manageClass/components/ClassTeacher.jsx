import React, { useState, useEffect } from 'react';
import ClassTeacherTable from '../../components/tables/ClassTeacherTable';
import ClassTeacherForm from '../../components/forms/ClassTeacherForm';
import { Grid, Container, Box, Snackbar, Alert } from '@mui/material';

const ClassTeacher = () => {
  const classTeacherTableHeader = ["Teacher", "Subject","Shift","Faculty","Grade","Section","Group", "Action"];
  const tableName = "ClassTeacher Table";

  const [classTeachers, setClassTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [classTeacherToEdit, setClassTeacherToEdit] = useState(null);
  const [backendFieldErrors, setBackendFieldErrors] = useState({});

  const fetchClassTeachers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/classTeachers/');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setClassTeachers(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClassTeachers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/classTeachers/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete classTeacher');
      }

      await fetchClassTeachers();
      setSuccessMessage('ClassTeacher deleted successfully.');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.error('Error deleting classTeacher:', error.message);
      setErrorMessage(error.message || 'Failed to delete classTeacher');
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/classTeachers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update classTeacher');
      }

      await fetchClassTeachers();
      setSuccessMessage('ClassTeacher updated successfully.');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.error('Error updating classTeacher:', error.message);
      setErrorMessage(error.message || 'Failed to update classTeacher');
    }
  };

  const handleEdit = (classTeacher) => {
    setClassTeacherToEdit(classTeacher);
  };

  const handleCreate = async (newClassTeacherData) => {
    try {
      const response = await fetch('http://localhost:3000/api/classTeachers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClassTeacherData),
      });
      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setBackendFieldErrors(data.errors);
        } else {
          setErrorMessage(data.message || 'Failed to submit data');
        }
        setSuccessMessage('');
        throw new Error(data.message || 'Failed to create classTeacher');
      }

      await fetchClassTeachers();
      setSuccessMessage('ClassTeacher created successfully.');
      setBackendFieldErrors({});

      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.error('Error creating classTeacher:', error.message);
      setErrorMessage(error.message || 'Failed to create classTeacher');
    }
  };

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <ClassTeacherForm
              fetchDatas={fetchClassTeachers}
              handleToEdit={classTeacherToEdit}
              setHandleToEdit={setClassTeacherToEdit}
              handleCreate={handleCreate}
              handleUpdate={handleUpdate}
              backendFieldErrors={backendFieldErrors}
              formName="ClassTeacher"
            />
          </Grid>
          <Grid item xs={8}>
            {error && <Alert severity="error">{error}</Alert>}
            <ClassTeacherTable
              isLoading={isLoading}
              datas={classTeachers}
              tableHeaders={[...classTeacherTableHeader]}
              tableName={tableName}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              successMessage={successMessage}
              errorMessage={errorMessage}
              setSuccessMessage={setSuccessMessage}
              setErrorMessage={setErrorMessage}
            /> 
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ClassTeacher;
