const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    code: { type: Number, required: true,unique:true },
    shift: { type: mongoose.Schema.Types.ObjectId, ref: 'Shift', required: true },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
    grade: { type: mongoose.Schema.Types.ObjectId, ref: 'Grade', required: true },
    section: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true }
});

module.exports = mongoose.model('Class', classSchema);
