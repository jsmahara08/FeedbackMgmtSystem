import React, { useState, useEffect } from 'react';
import DataTable from '../../components/tables/DataTable';
import ShiftForm from '../../components/forms/ShiftForm';
import { Grid, Container, Box, Snackbar, Alert } from '@mui/material';

const Shift = () => {
  const shiftTableHeader = ["Shift Name", "Shift Code", "Action"];
  const tableName = "Shift Table";

  const [shifts, setShifts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [shiftToEdit, setShiftToEdit] = useState(null);
  const [backendFieldErrors, setBackendFieldErrors] = useState({});

  const fetchShifts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/shifts/');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setShifts(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/shifts/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete shift');
      }

      await fetchShifts();
      setSuccessMessage('Shift deleted successfully.');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.error('Error deleting shift:', error.message);
      setErrorMessage(error.message || 'Failed to delete shift');
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/shifts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update shift');
      }

      await fetchShifts();
      setSuccessMessage('Shift updated successfully.');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.error('Error updating shift:', error.message);
      setErrorMessage(error.message || 'Failed to update shift');
    }
  };

  const handleEdit = (shift) => {
    setShiftToEdit(shift);
  };

  const handleCreate = async (newShiftData) => {
    try {
      const response = await fetch('http://localhost:3000/api/shifts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newShiftData),
      });
      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setBackendFieldErrors(data.errors);
        } else {
          setErrorMessage(data.message || 'Failed to submit data');
        }
        setSuccessMessage('');
        throw new Error(data.message || 'Failed to create shift');
      }

      await fetchShifts();
      setSuccessMessage('Shift created successfully.');
      setBackendFieldErrors({});

      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.error('Error creating shift:', error.message);
      setErrorMessage(error.message || 'Failed to create shift');
    }
  };

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <ShiftForm
              fetchDatas={fetchShifts}
              handleToEdit={shiftToEdit}
              setHandleToEdit={setShiftToEdit}
              handleCreate={handleCreate}
              handleUpdate={handleUpdate}
              backendFieldErrors={backendFieldErrors}
              formName="Shift"
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
              datas={shifts}
              tableHeaders={[...shiftTableHeader]}
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

export default Shift;
