
const Class = require('../models/ClassTeacher');

async function validateClassTeacherInput(data, id = null) {
  let errors = {};
  // Check if teacher is provided and not empty
 if (!data.teacherId || data.teacherId.trim() === '') {
    errors.teacherId = 'Teacher field is required';
  }
// Check if class  provided and not empty
if (!data.classId || data.classId.trim()==='') {
    errors.classId = 'class field is required';
}
// Check for duplicate combinations
const existingClassTeacher = await Class.findOne({
    teacher: data.teacherId,
    class: data.classId
});

if (existingClassTeacher && (!id || existingClassTeacher._id.toString() !== id)) {
    errors.duplicate = 'Duplicate combination found';
}
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}
module.exports = { validateClassTeacherInput };
