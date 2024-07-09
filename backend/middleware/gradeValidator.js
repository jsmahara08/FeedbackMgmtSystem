const Grade = require('../models/Grade');
async function validateGradeInput(data, id = null) {
  let errors = {};

  // Check if name is provided and not empty
  if (!data.name || data.name.trim() === '') {
    errors.name = 'Name field is required';
  } else {
    // Check if name already exists
    const existingGrade = await Grade.findOne({ name: data.name });
    if (existingGrade && (!id || existingGrade._id.toString() !== id)) {
      errors.name = 'Grade name already exists';
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
    const existingGradeWithCode = await Grade.findOne({ code: data.code });
    if (existingGradeWithCode && (!id || existingGradeWithCode._id.toString() !== id)) {
      errors.code = 'Grade code already exists';
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}

module.exports = { validateGradeInput };
