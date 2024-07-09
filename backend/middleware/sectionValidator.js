const Section = require('../models/Section');
async function validateSectionInput(data, id = null) {
  let errors = {};

  // Check if name is provided and not empty
  if (!data.name || data.name.trim() === '') {
    errors.name = 'Name field is required';
  } else {
    // Check if name already exists
    const existingSection = await Section.findOne({ name: data.name });
    if (existingSection && (!id || existingSection._id.toString() !== id)) {
      errors.name = 'Section name already exists';
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
    const existingSectionWithCode = await Section.findOne({ code: data.code });
    if (existingSectionWithCode && (!id || existingSectionWithCode._id.toString() !== id)) {
      errors.code = 'Section code already exists';
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}

module.exports = { validateSectionInput };
