import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Paper, Typography, CircularProgress } from '@mui/material';

const ShiftForm = ({
  fetchDatas,
  handleToEdit,
  setHandleToEdit,
  handleCreate,
  handleUpdate,
  backendFieldErrors,
  formName
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: handleToEdit ? handleToEdit.name : '',
      code: handleToEdit ? handleToEdit.code : '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters'),
      code: Yup.string()
        .required('Code is required')
        .matches(/^[0-9]+$/, 'Code must be a numeric value'),
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
            id="code"
            name="code"
            label="Code"
            value={formik.values.code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.code && Boolean(formik.errors.code || backendFieldErrors.code)}
            helperText={(formik.touched.code && (formik.errors.code || backendFieldErrors.code)) || ' '}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <Button
                variant="text"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={formik.isSubmitting}
              sx={{ position: 'relative' }}
            >
              {formik.isSubmitting ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : (
                handleToEdit ? 'Update' : 'Add'
              )}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default ShiftForm;
