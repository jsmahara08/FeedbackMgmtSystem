const Group = require('../models/Group');
async function validateGroupInput(data, id = null) {
  let errors = {};

  // Check if name is provided and not empty
  if (!data.name || data.name.trim() === '') {
    errors.name = 'Name field is required';
  } else {
    // Check if name already exists
    const existingGroup = await Group.findOne({ name: data.name });
    if (existingGroup && (!id || existingGroup._id.toString() !== id)) {
      errors.name = 'Group name already exists';
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
    const existingGroupWithCode = await Group.findOne({ code: data.code });
    if (existingGroupWithCode && (!id || existingGroupWithCode._id.toString() !== id)) {
      errors.code = 'Group code already exists';
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}

module.exports = { validateGroupInput };
