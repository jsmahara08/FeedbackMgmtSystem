const mongoose = require('mongoose');
const { Schema } = mongoose;

const sectionSchema = new Schema({
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

const Section = mongoose.model('Section', sectionSchema);

module.exports = Section;
