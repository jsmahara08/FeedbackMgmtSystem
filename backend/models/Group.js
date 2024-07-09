const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupSchema = new Schema({
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

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
