import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Paper, Typography, CircularProgress } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

const ClassForm = ({
  handleToEdit,
  setHandleToEdit,
  handleCreate,
  handleUpdate,
  backendFieldErrors,
  formName
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [shifts, setShifts] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [grades, setGrades] = useState([]);
  const [sections, setSections] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
        const shiftResponse = await fetch('http://localhost:3000/api/shifts/');
        const facultiesResponse = await fetch('http://localhost:3000/api/faculties/');
        const gradesResponse = await fetch('http://localhost:3000/api/grades/');
        const sectionsResponse = await fetch('http://localhost:3000/api/sections/');
        const groupsResponse = await fetch('http://localhost:3000/api/groups/');
        
        const shiftsData = await shiftResponse.json();
        const facultiesData = await facultiesResponse.json();
        const gradesData = await gradesResponse.json();
        const sectionsData = await sectionsResponse.json();
        const groupsData = await groupsResponse.json();
        
        setShifts(shiftsData);
        setFaculties(facultiesData);
        setGrades(gradesData);
        setSections(sectionsData);
        setGroups(groupsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      code: handleToEdit ? handleToEdit.code : '',
      shift: handleToEdit ? handleToEdit.shift?._id : '',
      faculty: handleToEdit ? handleToEdit.faculty?._id : '',
      grade: handleToEdit ? handleToEdit.grade?._id : '',
      section: handleToEdit ? handleToEdit.section?._id : '',
      group: handleToEdit ? handleToEdit.group?._id : ''
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      code: Yup.string().required('Code is required').matches(/^[0-9]+$/, 'Code must be a numeric value'),
      shift: Yup.string().required('Shift is required'),
      faculty: Yup.string().required('Faculty is required'),
      grade: Yup.string().required('Grade is required'),
      section: Yup.string().required('Section is required'),
      group: Yup.string().required('Group is required')
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
          <TextField
            select
            fullWidth
            id="shift"
            name="shift"
            label="Shift"
            value={formik.values.shift}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.shift && Boolean(formik.errors.shift || backendFieldErrors.shift)}
            helperText={(formik.touched.shift && (formik.errors.shift || backendFieldErrors.shift)) || ' '}
            sx={{ mb: 2 }}
         >
         <MenuItem value="">Select Shift</MenuItem>
            {shifts.map((shift) => (
              <MenuItem key={shift._id} value={shift._id}>
                {shift.name}
              </MenuItem>
            ))}
         </TextField>
          <TextField
            select
            fullWidth
            id="faculty"
            name="faculty"
            label="Faculty"
            value={formik.values.faculty}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.faculty && Boolean(formik.errors.faculty || backendFieldErrors.faculty)}
            helperText={(formik.touched.faculty && (formik.errors.faculty || backendFieldErrors.faculty)) || ' '}
            sx={{ mb: 2 }}
          >
            <MenuItem value="">Select Faculty</MenuItem>
            {faculties.map((faculty) => (
              <MenuItem key={faculty._id} value={faculty._id}>
                {faculty.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            id="grade"
            name="grade"
            label="Grade"
            value={formik.values.grade}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.grade && Boolean(formik.errors.grade || backendFieldErrors.grade)}
            helperText={(formik.touched.grade && (formik.errors.grade || backendFieldErrors.grade)) || ' '}
            sx={{ mb: 2 }}
          >
            <MenuItem value="">Select Grade</MenuItem>
            {grades.map((grade) => (
              <MenuItem key={grade._id} value={grade._id}>
                {grade.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            id="section"
            name="section"
            label="Section"
            value={formik.values.section}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.section && Boolean(formik.errors.section || backendFieldErrors.section)}
            helperText={(formik.touched.section && (formik.errors.section || backendFieldErrors.section)) || ' '}
            sx={{ mb: 2 }}
          >
            <MenuItem value="">Select Section</MenuItem>
            {sections.map((section) => (
              <MenuItem key={section._id} value={section._id}>
                {section.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            id="group"
            name="group"
            label="Group"
            value={formik.values.group}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.group && Boolean(formik.errors.group || backendFieldErrors.group)}
            helperText={(formik.touched.group && (formik.errors.group || backendFieldErrors.group)) || ' '}
            sx={{ mb: 2 }}
          >
            <MenuItem value="">Select Group</MenuItem>
            {groups.map((group) => (
              <MenuItem key={group._id} value={group._id}>
                {group.name}
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

export default ClassForm;
