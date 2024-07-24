import React, { useState, useEffect } from 'react';
import DataTable from '../../components/tables/DataTable';
import TeacherForm from '../../components/forms/TeacherForm';
import { Grid, Container, Box, Snackbar, Alert } from '@mui/material';

const Teacher = () => {
  const teacherTableHeader = ["Teacher Name", "Teacher Code","Subject", "Action"];
  const tableName = "Teacher Table";

  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [teacherToEdit, setTeacherToEdit] = useState(null);
  const [backendFieldErrors, setBackendFieldErrors] = useState({});

  const fetchTeachers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/teachers/');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setTeachers(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/teachers/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete teacher');
      }

      await fetchTeachers();
      setSuccessMessage('Teacher deleted successfully.');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.error('Error deleting teacher:', error.message);
      setErrorMessage(error.message || 'Failed to delete teacher');
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/teachers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update teacher');
      }

      await fetchTeachers();
      setSuccessMessage('Teacher updated successfully.');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.error('Error updating teacher:', error.message);
      setErrorMessage(error.message || 'Failed to update teacher');
    }
  };

  const handleEdit = (teacher) => {
    setTeacherToEdit(teacher);
  };

  const handleCreate = async (newTeacherData) => {
    try {
      const response = await fetch('http://localhost:3000/api/teachers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTeacherData),
      });
      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setBackendFieldErrors(data.errors);
        } else {
          setErrorMessage(data.message || 'Failed to submit data');
        }
        setSuccessMessage('');
        throw new Error(data.message || 'Failed to create teacher');
      }

      await fetchTeachers();
      setSuccessMessage('Teacher created successfully.');
      setBackendFieldErrors({});

      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.error('Error creating teacher:', error.message);
      setErrorMessage(error.message || 'Failed to create teacher');
    }
  };

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TeacherForm
              fetchDatas={fetchTeachers}
              handleToEdit={teacherToEdit}
              setHandleToEdit={setTeacherToEdit}
              handleCreate={handleCreate}
              handleUpdate={handleUpdate}
              backendFieldErrors={backendFieldErrors}
              formName="Teacher"
            />
          </Grid>
          <Grid item xs={8}>
            {error && <Alert severity="error">{error}</Alert>}
            <DataTable
              isLoading={isLoading}
              datas={teachers}
              tableHeaders={[...teacherTableHeader]}
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

export default Teacher;
