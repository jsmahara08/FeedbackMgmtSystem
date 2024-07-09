// controllers/subjectController.js

const Subject = require('../models/Subject');
const { validateSubjectInput } = require('../middleware/subjectValidator');
// Create a new subject
exports.createSubject = async (req, res) => {
    try {
      const { errors, isValid } = await validateSubjectInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
  
      const subject = new Subject(req.body);
      await subject.save();
      res.status(201).json(subject);
    } catch (error) {
      console.error('Error creating subject:', error);
      res.status(500).json({ error: 'Error creating subject' });
    }
  };

// Get all faculties
exports.getAllFaculties = async (req, res) => {
  try {
    const faculties = await Subject.find();
    res.json(faculties);
  } catch (error) {
    console.error('Error getting faculties:', error);
    res.status(500).json({ error: 'Error getting faculties' });
  }
};

// Get subject by ID
exports.getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    res.json(subject);
  } catch (error) {
    console.error('Error getting subject by ID:', error);
    res.status(500).json({ error: 'Error getting subject by ID' });
  }
};

// Update subject by ID
exports.updateSubject = async (req, res) => {
  try {
    const { errors, isValid } = await validateSubjectInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!subject) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    res.json(subject);
  } catch (error) {
    console.error('Error updating subject:', error);
    res.status(500).json({ error: 'Error updating subject' });
  }
};


// Delete subject by ID
exports.deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findOneAndDelete({ _id: req.params.id });
    if (!subject) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    res.json({ message: 'Subject deleted successfully' });
  } catch (error) {
    console.error('Error deleting subject:', error);
    res.status(500).json({ error: 'Error deleting subject' });
  }
};

