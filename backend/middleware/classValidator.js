
const Class = require('../models/Class');

async function validateClassInput(data, id = null) {
  let errors = {};
  // Check if code is provided and is a number
  if (!data.code) {
    errors.code = 'Code field is required';
  } 
  else if (isNaN(data.code)) {
    errors.code = 'Code must be a number';
  } else {
    // Check if code already exists
    const existingClassWithCode = await Class.findOne({ code: data.code });
    if (existingClassWithCode && (!id || existingClassWithCode._id.toString() !== id)) {
      errors.code = 'Class code already exists';
    }
  }
   // Check if shift, faculty, grade, section, and group are provided
   if (!data.shift) {
    errors.shift = 'Shift field is required';
}
if (!data.faculty) {
    errors.faculty = 'Faculty field is required';
}
if (!data.grade) {
    errors.grade = 'Grade field is required';
}
if (!data.section) {
    errors.section = 'Section field is required';
}
if (!data.group) {
    errors.group = 'Group field is required';
}
  // Check for duplicate combinations
  const existingClass = await Class.findOne({
    shift: data.shift,
    faculty: data.faculty,
    grade: data.grade,
    section: data.section,
    group: data.group
});

if (existingClass && (!id || existingClass._id.toString() !== id)) {
    errors.duplicate = 'Duplicate combination found';
}

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}
module.exports = { validateClassInput };
