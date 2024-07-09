import React, { useState, useEffect } from 'react';
import DataTable from '../../components/tables/DataTable';
import ShiftForm from '../../components/forms/ShiftForm';
import { Grid, Container, Box, Snackbar, Alert } from '@mui/material';

const Group = () => {
  const groupTableHeader = ["Group Name", "Group Code", "Action"];
  const tableName = "Group Table";

  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [groupToEdit, setGroupToEdit] = useState(null);
  const [backendFieldErrors, setBackendFieldErrors] = useState({});

  const fetchGroups = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/groups/');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setGroups(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/groups/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete group');
      }

      await fetchGroups();
      setSuccessMessage('Group deleted successfully.');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.error('Error deleting group:', error.message);
      setErrorMessage(error.message || 'Failed to delete group');
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/groups/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update group');
      }

      await fetchGroups();
      setSuccessMessage('Group updated successfully.');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.error('Error updating group:', error.message);
      setErrorMessage(error.message || 'Failed to update group');
    }
  };

  const handleEdit = (group) => {
    setGroupToEdit(group);
  };

  const handleCreate = async (newGroupData) => {
    try {
      const response = await fetch('http://localhost:3000/api/groups/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGroupData),
      });
      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setBackendFieldErrors(data.errors);
        } else {
          setErrorMessage(data.message || 'Failed to submit data');
        }
        setSuccessMessage('');
        throw new Error(data.message || 'Failed to create group');
      }

      await fetchGroups();
      setSuccessMessage('Group created successfully.');
      setBackendFieldErrors({});

      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.error('Error creating group:', error.message);
      setErrorMessage(error.message || 'Failed to create group');
    }
  };

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <ShiftForm
              fetchDatas={fetchGroups}
              handleToEdit={groupToEdit}
              setHandleToEdit={setGroupToEdit}
              handleCreate={handleCreate}
              handleUpdate={handleUpdate}
              backendFieldErrors={backendFieldErrors}
              formName="Group"
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
              datas={groups}
              tableHeaders={[...groupTableHeader]}
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

export default Group;
