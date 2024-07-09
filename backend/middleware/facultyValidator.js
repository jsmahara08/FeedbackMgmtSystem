// validators/facultyValidator.js

const Faculty = require('../models/Faculty');

async function validateFacultyInput(data, id = null) {
  let errors = {};

  // Check if name is provided and not empty
  if (!data.name || data.name.trim() === '') {
    errors.name = 'Name field is required';
  } else {
    // Check if name already exists
    const existingFaculty = await Faculty.findOne({ name: data.name });
    if (existingFaculty && (!id || existingFaculty._id.toString() !== id)) {
      errors.name = 'Faculty name already exists';
    }
  }

  // Check if code is provided and is a number
  if (!data.code || data.code.trim()==='') {
    errors.code = 'Code field is required';
  } 
  else if (isNaN(data.code)) {
    errors.code = 'Code must be a number';
  } else {
    // Check if code already exists
    const existingFacultyWithCode = await Faculty.findOne({ code: data.code });
    if (existingFacultyWithCode && (!id || existingFacultyWithCode._id.toString() !== id)) {
      errors.code = 'Faculty code already exists';
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}

module.exports = { validateFacultyInput };
