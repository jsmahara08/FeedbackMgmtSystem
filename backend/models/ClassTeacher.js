const mongoose = require('mongoose');

const ClassTeacherSchema = new mongoose.Schema({
  teacherId:{type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  classId:{type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true }
},
{
  timestamps: true,
}
);

module.exports = mongoose.model('ClassTeacher', ClassTeacherSchema);
