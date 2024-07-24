import React, { useState, useEffect } from 'react';
import DataTable from '../../components/tables/DataTable';
import ClassForm from '../../components/forms/ClassForm';
import { Grid, Container, Box, Snackbar, Alert } from '@mui/material';

const ClassManagement = () => {
  const classTableHeader = ["Class Code", "Shift","Faculty","Grade","Section","Group", "Action"];
  const tableName = "Class Table";

  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [classToEdit, setClassToEdit] = useState(null);
  const [backendFieldErrors, setBackendFieldErrors] = useState({});

  const fetchClasses = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/classes/');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setClasses(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/classes/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete class');
      }

      await fetchClasses();
      setSuccessMessage('Class deleted successfully.');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.error('Error deleting class:', error.message);
      setErrorMessage(error.message || 'Failed to delete class');
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/classes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update class');
      }

      await fetchClasses();
      setSuccessMessage('Class updated successfully.');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.error('Error updating class:', error.message);
      setErrorMessage(error.message || 'Failed to update class');
    }
  };

  const handleEdit = (classes) => {
    setClassToEdit(classes);
  };

  const handleCreate = async (newClassData) => {
    try {
      const response = await fetch('http://localhost:3000/api/classes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClassData),
      });
      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setBackendFieldErrors(data.errors);
        } else {
          setErrorMessage(data.message || 'Failed to submit data');
        }
        setSuccessMessage('');
        throw new Error(data.message || 'Failed to create class');
      }

      await fetchClasses();
      setSuccessMessage('Class created successfully.');
      setBackendFieldErrors({});

      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.error('Error creating class:', error.message);
      setErrorMessage(error.message || 'Failed to create class');
    }
  };

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <ClassForm
              fetchDatas={fetchClasses}
              handleToEdit={classToEdit}
              setHandleToEdit={setClassToEdit}
              handleCreate={handleCreate}
              handleUpdate={handleUpdate}
              backendFieldErrors={backendFieldErrors}
              formName="Class"
            />
          </Grid>
          <Grid item xs={8}>
            {error && <Alert severity="error">{error}</Alert>}
            <DataTable
              isLoading={isLoading}
              datas={classes}
              tableHeaders={[...classTableHeader]}
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

export default ClassManagement;
