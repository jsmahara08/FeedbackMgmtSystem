const Grade = require('../models/Grade');
const { validateGradeInput } = require('../middleware/gradeValidator');
// Create a new grade
exports.createGrade = async (req, res) => {
    try {
      const { errors, isValid } = await validateGradeInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
  
      const grade = new Grade(req.body);
      await grade.save();
      res.status(201).json(grade);
    } catch (error) {
      console.error('Error creating grade:', error);
      res.status(500).json({ error: 'Error creating grade' });
    }
  };

// Get all grades
exports.getAllGrades = async (req, res) => {
  try {
    const grades = await Grade.find();
    res.json(grades);
  } catch (error) {
    console.error('Error getting grades:', error);
    res.status(500).json({ error: 'Error getting grades' });
  }
};

// Get grade by ID
exports.getGradeById = async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id);
    if (!grade) {
      return res.status(404).json({ error: 'Grade not found' });
    }
    res.json(grade);
  } catch (error) {
    console.error('Error getting grade by ID:', error);
    res.status(500).json({ error: 'Error getting grade by ID' });
  }
};

// Update grade by ID
exports.updateGrade = async (req, res) => {
  try {
    const { errors, isValid } = await validateGradeInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const grade = await Grade.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!grade) {
      return res.status(404).json({ error: 'Grade not found' });
    }
    res.json(grade);
  } catch (error) {
    console.error('Error updating grade:', error);
    res.status(500).json({ error: 'Error updating grade' });
  }
};


// Delete grade by ID
exports.deleteGrade = async (req, res) => {
  try {
    const grade = await Grade.findOneAndDelete({ _id: req.params.id });
    if (!grade) {
      return res.status(404).json({ error: 'Grade not found' });
    }
    res.json({ message: 'Grade deleted successfully' });
  } catch (error) {
    console.error('Error deleting grade:', error);
    res.status(500).json({ error: 'Error deleting grade' });
  }
};

