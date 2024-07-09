const mongoose = require('mongoose');
const { Schema } = mongoose;

const gradeSchema = new Schema({
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
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
