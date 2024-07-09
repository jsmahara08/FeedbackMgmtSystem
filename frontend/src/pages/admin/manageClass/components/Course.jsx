import React, { useState, useEffect } from 'react';
import DataTable from '../../components/tables/DataTable';
import ShiftForm from '../../components/forms/ShiftForm';
import { Grid, Container, Box, Snackbar, Alert } from '@mui/material';

const Course = () => {
  const courseTableHeader = ["Course Name", "Course Code", "Action"];
  const tableName = "Course Table";

  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [courseToEdit, setCourseToEdit] = useState(null);
  const [backendFieldErrors, setBackendFieldErrors] = useState({});

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/subjects/');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setCourses(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/subjects/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete course');
      }

      await fetchCourses();
      setSuccessMessage('Course deleted successfully.');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.error('Error deleting course:', error.message);
      setErrorMessage(error.message || 'Failed to delete course');
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/subjects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update course');
      }

      await fetchCourses();
      setSuccessMessage('Course updated successfully.');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.error('Error updating course:', error.message);
      setErrorMessage(error.message || 'Failed to update course');
    }
  };

  const handleEdit = (course) => {
    setCourseToEdit(course);
  };

  const handleCreate = async (newCourseData) => {
    try {
      const response = await fetch('http://localhost:3000/api/subjects/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCourseData),
      });
      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setBackendFieldErrors(data.errors);
        } else {
          setErrorMessage(data.message || 'Failed to submit data');
        }
        setSuccessMessage('');
        throw new Error(data.message || 'Failed to create course');
      }

      await fetchCourses();
      setSuccessMessage('Course created successfully.');
      setBackendFieldErrors({});

      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.error('Error creating course:', error.message);
      setErrorMessage(error.message || 'Failed to create course');
    }
  };

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <ShiftForm
              fetchDatas={fetchCourses}
              handleToEdit={courseToEdit}
              setHandleToEdit={setCourseToEdit}
              handleCreate={handleCreate}
              handleUpdate={handleUpdate}
              backendFieldErrors={backendFieldErrors}
              formName="Course"
            />
          </Grid>
          <Grid item xs={8}>
            {error && <Alert severity="error">{error}</Alert>}
            <Snackbar
              open={Boolean(successMessage)}
              autoHideDuration={5000}
              onClose={() => setSuccessMessage(null)}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <Alert severity="success" onClose={() => setSuccessMessage(null)}>
                {successMessage}
              </Alert>
            </Snackbar>
            <Snackbar
              open={Boolean(errorMessage)}
              autoHideDuration={5000}
              onClose={() => setErrorMessage(null)}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <Alert severity="error" onClose={() => setErrorMessage(null)}>
                {errorMessage}
              </Alert>
            </Snackbar>
            <DataTable
              isLoading={isLoading}
              datas={courses}
              tableHeaders={[...courseTableHeader]}
              tableName={tableName}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Course;
