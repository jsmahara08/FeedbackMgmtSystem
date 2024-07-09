const Shift = require('../models/Shift');
async function validateShiftInput(data, id = null) {
  let errors = {};

  // Check if name is provided and not empty
  if (!data.name || data.name.trim() === '') {
    errors.name = 'Name field is required';
  } else {
    // Check if name already exists
    const existingShift = await Shift.findOne({ name: data.name });
    if (existingShift && (!id || existingShift._id.toString() !== id)) {
      errors.name = 'Shift name already exists';
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
    const existingShiftWithCode = await Shift.findOne({ code: data.code });
    if (existingShiftWithCode && (!id || existingShiftWithCode._id.toString() !== id)) {
      errors.code = 'Shift code already exists';
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}

module.exports = { validateShiftInput };
