import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Paper, Typography, CircularProgress } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

const ClassTeacherForm = ({
  handleToEdit,
  setHandleToEdit,
  handleCreate,
  handleUpdate,
  backendFieldErrors,
  formName
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    
  const [teachersId, setTeachersId] = useState([]);
  const [classesId, setClassesId] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
        const teachersResponse = await fetch('http://localhost:3000/api/teachers/');
        const classesResponse = await fetch('http://localhost:3000/api/classes');
        
        const teachersData = await teachersResponse.json();
        const classesData = await classesResponse.json();
        
        setTeachersId(teachersData);
        setClassesId(classesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
        teacherId: handleToEdit ? handleToEdit.teacherId?._id : '',
        classId: handleToEdit ? handleToEdit.classId?._id : '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      teacherId: Yup.string().required('Teacher is required'),
      classId: Yup.string().required('Class is required')
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
            select
            fullWidth
            id="teacherId"
            name="teacherId"
            label="Teacher"
            value={formik.values.teacherId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.teacherId && Boolean(formik.errors.teacherId || backendFieldErrors.teacherId)}
            helperText={(formik.touched.teacherId && (formik.errors.teacherId || backendFieldErrors.teacherId)) || ' '}
            sx={{ mb: 2 }}
         >
         <MenuItem value="">Select Teacher</MenuItem>
            {teachersId.map((teacher) => (
              <MenuItem key={teacher._id} value={teacher._id}>
                    {teacher.name} ({teacher.subject.name} {teacher.subject.code})
              </MenuItem>
            ))}
         </TextField>
          <TextField
            select
            fullWidth
            id="classId"
            name="classId"
            label="Class"
            value={formik.values.classId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.classId && Boolean(formik.errors.classId || backendFieldErrors.classId)}
            helperText={(formik.touched.classId && (formik.errors.classId || backendFieldErrors.classId)) || ' '}
            sx={{ mb: 2 }}
          >
            <MenuItem value="">Select Class</MenuItem>
            {classesId.map((classId) => (
              <MenuItem key={classId._id} value={classId._id}>
                {classId.faculty.name}({classId.section.name})
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

export default ClassTeacherForm;
