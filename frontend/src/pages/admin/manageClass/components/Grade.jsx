import React, { useState, useEffect } from 'react';
import DataTable from '../../components/tables/DataTable';
import ShiftForm from '../../components/forms/ShiftForm';
import { Grid, Container, Box, Snackbar, Alert } from '@mui/material';

const Grade = () => {
  const gradeTableHeader = ["Grade Name", "Grade Code", "Action"];
  const tableName = "Grade Table";

  const [grades, setGrades] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [gradeToEdit, setGradeToEdit] = useState(null);
  const [backendFieldErrors, setBackendFieldErrors] = useState({});

  const fetchGrades = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/grades/');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setGrades(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGrades();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/grades/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete grade');
      }

      await fetchGrades();
      setSuccessMessage('Grade deleted successfully.');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.error('Error deleting grade:', error.message);
      setErrorMessage(error.message || 'Failed to delete grade');
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/grades/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update grade');
      }

      await fetchGrades();
      setSuccessMessage('Grade updated successfully.');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.error('Error updating grade:', error.message);
      setErrorMessage(error.message || 'Failed to update grade');
    }
  };

  const handleEdit = (grade) => {
    setGradeToEdit(grade);
  };

  const handleCreate = async (newGradeData) => {
    try {
      const response = await fetch('http://localhost:3000/api/grades/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGradeData),
      });
      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setBackendFieldErrors(data.errors);
        } else {
          setErrorMessage(data.message || 'Failed to submit data');
        }
        setSuccessMessage('');
        throw new Error(data.message || 'Failed to create grade');
      }

      await fetchGrades();
      setSuccessMessage('Grade created successfully.');
      setBackendFieldErrors({});

      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.error('Error creating grade:', error.message);
      setErrorMessage(error.message || 'Failed to create grade');
    }
  };

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <ShiftForm
              fetchDatas={fetchGrades}
              handleToEdit={gradeToEdit}
              setHandleToEdit={setGradeToEdit}
              handleCreate={handleCreate}
              handleUpdate={handleUpdate}
              backendFieldErrors={backendFieldErrors}
              formName="Grade"
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
              datas={grades}
              tableHeaders={[...gradeTableHeader]}
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

export default Grade;
