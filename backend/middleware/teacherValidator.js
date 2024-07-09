
const Class = require('../models/Teacher');

async function validateTeacherInput(data, id = null) {
  let errors = {};
  // Check if id is provided and is a number
  if (!data.id || data.id.trim()==='') {
    errors.id = 'Id field is required';
  } 
  else if (isNaN(data.id)) {
    errors.id = 'Id must be a number';
  } else {
    // Check if id already exists
    const existingClassWithId = await Class.findOne({ id: data.id });
    if (existingClassWithId && (!id || existingClassWithId._id.toString() !== id)) {
      errors.id = 'Teacher id already exists';
    }
  }
  // Check if name is provided and not empty
 if (!data.name || data.name.trim() === '') {
    errors.name = 'Name field is required';
  }
// Check if subject  provided and not empty
if (!data.subject || data.name.trim()==='') {
    errors.name = 'Subject field is required';
}
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}
module.exports = { validateTeacherInput };
