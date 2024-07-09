const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  code: {
    type: Number,
    required: true,
    unique: true
  },
},
{
  timestamps: true,
}
);

module.exports = mongoose.model('Faculty', FacultySchema);
