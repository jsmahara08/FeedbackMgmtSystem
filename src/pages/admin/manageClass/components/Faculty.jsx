import React, { useState, useEffect } from 'react';
import DataTable from '../../components/tables/DataTable';
import ShiftForm from '../../components/forms/ShiftForm';
import { Grid, Container, Box, Snackbar, Alert } from '@mui/material';

const Faculty = () => {
  const facultyTableHeader = ["Faculty Name", "Faculty Code", "Action"];
  const tableName = "Faculty Table";

  const [faculties, setFacultys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [facultyToEdit, setFacultyToEdit] = useState(null);
  const [backendFieldErrors, setBackendFieldErrors] = useState({});

  const fetchFaculties = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/faculties/');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setFacultys(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculties();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/faculties/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete faculty');
      }

      await fetchFaculties();
      setSuccessMessage('Faculty deleted successfully.');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.error('Error deleting faculty:', error.message);
      setErrorMessage(error.message || 'Failed to delete faculty');
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/faculties/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update faculty');
      }

      await fetchFaculties();
      setSuccessMessage('Faculty updated successfully.');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.error('Error updating faculty:', error.message);
      setErrorMessage(error.message || 'Failed to update faculty');
    }
  };

  const handleEdit = (faculty) => {
    setFacultyToEdit(faculty);
  };

  const handleCreate = async (newFacultyData) => {
    try {
      const response = await fetch('http://localhost:3000/api/faculties/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFacultyData),
      });
      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setBackendFieldErrors(data.errors);
        } else {
          setErrorMessage(data.message || 'Failed to submit data');
        }
        setSuccessMessage('');
        throw new Error(data.message || 'Failed to create faculty');
      }

      await fetchFaculties();
      setSuccessMessage('Faculty created successfully.');
      setBackendFieldErrors({});

      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.error('Error creating faculty:', error.message);
      setErrorMessage(error.message || 'Failed to create faculty');
    }
  };

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <ShiftForm
              fetchDatas={fetchFaculties}
              handleToEdit={facultyToEdit}
              setHandleToEdit={setFacultyToEdit}
              handleCreate={handleCreate}
              handleUpdate={handleUpdate}
              backendFieldErrors={backendFieldErrors}
              formName="Faculty"
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
              datas={faculties}
              tableHeaders={[...facultyTableHeader]}
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

export default Faculty;
