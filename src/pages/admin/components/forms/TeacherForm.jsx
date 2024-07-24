import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Paper, Typography, CircularProgress } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

const TeacherForm = ({
  fetchDatas,
  handleToEdit,
  setHandleToEdit,
  handleCreate,
  handleUpdate,
  backendFieldErrors,
  formName
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/subjects/');
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjects();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: handleToEdit ? handleToEdit.name : '',
      id: handleToEdit ? handleToEdit.id : '',
      subject: handleToEdit ? handleToEdit.subject._id : '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
      id: Yup.string().required('ID is required').matches(/^[0-9]+$/, 'ID must be a numeric value'),
      subject: Yup.string().required('Subject is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        if (handleToEdit) {
          await handleUpdate(handleToEdit._id, values);
        } else {
          await handleCreate(values);
        }
        resetForm();
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setTimeout(() => {
          setIsSubmitting(false);
        }, 1000);
      }
    },
  });

  useEffect(() => {
    formik.resetForm();
  }, [handleToEdit]);

  const handleCancel = () => {
    setHandleToEdit(null);
    formik.resetForm();
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 400, mt: '20px', mx: 'auto' }}>
      <Paper sx={{ padding: 4 }}>
        <Typography variant="h6" gutterBottom>
          {handleToEdit ? `Edit ${formName}` : `Add ${formName}`}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name || backendFieldErrors.name)}
            helperText={(formik.touched.name && (formik.errors.name || backendFieldErrors.name)) || ' '}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            id="id"
            name="id"
            label="ID"
            value={formik.values.id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.id && Boolean(formik.errors.id || backendFieldErrors.id)}
            helperText={(formik.touched.id && (formik.errors.id || backendFieldErrors.id)) || ' '}
            sx={{ mb: 2 }}
          />
          <TextField
            select
            fullWidth
            id="subject"
            name="subject"
            label="Subject"
            value={formik.values.subject}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.subject && Boolean(formik.errors.subject || backendFieldErrors.subject)}
            helperText={(formik.touched.subject && (formik.errors.subject || backendFieldErrors.subject)) || ' '}
           
                      sx={{ mb: 2 }}
                      
          >
            <MenuItem value="">Select Subject</MenuItem>
            {subjects.map((subject) => (
              <MenuItem key={subject._id} value={subject._id}>
                {subject.name}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button onClick={handleCancel} variant="text" disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
              {isSubmitting ? <CircularProgress size={24} /> : handleToEdit ? 'Update' : 'Submit'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default TeacherForm;
