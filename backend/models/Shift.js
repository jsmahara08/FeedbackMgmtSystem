const mongoose = require('mongoose');
const { Schema } = mongoose;

const shiftSchema = new Schema({
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
const Shift = mongoose.model('Shift', shiftSchema);

module.exports = Shift;
