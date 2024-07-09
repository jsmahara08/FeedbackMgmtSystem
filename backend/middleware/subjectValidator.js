const Subject = require('../models/Subject');
async function validateSubjectInput(data, id = null) {
  let errors = {};
// Check if name is provided and not empty
  if (!data.name || data.name.trim() === '') {
    errors.name = 'Name field is required';
  } 

  // Check if code is provided and is a number
  if (!data.code || data.code.trim()==='') {
    errors.code = 'Subject code field is required';
  } 
  else {
    // Check if code already exists
    const existingSubjectWithCode = await Subject.findOne({ code: data.code });
    if (existingSubjectWithCode && (!id || existingSubjectWithCode._id.toString() !== id)) {
      errors.code = 'Subject code already exists';
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}

module.exports = { validateSubjectInput };
