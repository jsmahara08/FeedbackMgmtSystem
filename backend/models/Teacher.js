const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true,
    unique: true
  },
  subject:{type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true }
},
{
  timestamps: true,
}
);

module.exports = mongoose.model('Teacher', TeacherSchema);
