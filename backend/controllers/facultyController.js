// controllers/facultyController.js

const Faculty = require('../models/Faculty');
const { validateFacultyInput } = require('../middleware/facultyValidator');
// Create a new faculty
exports.createFaculty = async (req, res) => {
    try {
      const { errors, isValid } = await validateFacultyInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
  
      const faculty = new Faculty(req.body);
      await faculty.save();
      res.status(201).json(faculty);
    } catch (error) {
      console.error('Error creating faculty:', error);
      res.status(500).json({ error: 'Error creating faculty' });
    }
  };

// Get all faculties
exports.getAllFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find();
    res.json(faculties);
  } catch (error) {
    console.error('Error getting faculties:', error);
    res.status(500).json({ error: 'Error getting faculties' });
  }
};

// Get faculty by ID
exports.getFacultyById = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) {
      return res.status(404).json({ error: 'Faculty not found' });
    }
    res.json(faculty);
  } catch (error) {
    console.error('Error getting faculty by ID:', error);
    res.status(500).json({ error: 'Error getting faculty by ID' });
  }
};

// Update faculty by ID
exports.updateFaculty = async (req, res) => {
  try {
    const { errors, isValid } = await validateFacultyInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!faculty) {
      return res.status(404).json({ error: 'Faculty not found' });
    }
    res.json(faculty);
  } catch (error) {
    console.error('Error updating faculty:', error);
    res.status(500).json({ error: 'Error updating faculty' });
  }
};


// Delete faculty by ID
exports.deleteFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findOneAndDelete({ _id: req.params.id });
    if (!faculty) {
      return res.status(404).json({ error: 'Faculty not found' });
    }
    res.json({ message: 'Faculty deleted successfully' });
  } catch (error) {
    console.error('Error deleting faculty:', error);
    res.status(500).json({ error: 'Error deleting faculty' });
  }
};

