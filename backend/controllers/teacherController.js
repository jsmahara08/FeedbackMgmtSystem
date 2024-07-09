const Teacher = require('../models/Teacher');
const { validateTeacherInput } = require('../middleware/teacherValidator');
// Create a new teacher
exports.createTeacher = async (req, res) => {
  const { id, name, subject} = req.body;
    try {
      const { errors, isValid } = await validateTeacherInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const teacher = new Teacher({
        id,
        name,
        subject
    });
      await teacher.save();
      res.status(201).json(teacher);
    } catch (error) {
      console.error('Error creating teacher:', error);
      res.status(500).json({ error: 'Error creating teacher' });
    }
  };

// Get all teachers
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find()
        .populate('subject');                       
    res.json(teachers);
  } catch (error) {
    console.error('Error getting teachers:', error);
    res.status(500).json({ error: 'Error getting teachers' });
  }
};

// Get teacher by ID
exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
      .populate('subject');
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (error) {
    console.error('Error getting teacher by ID:', error);
    res.status(500).json({ error: 'Error getting teacher by ID' });
  }
};

// Update teacher by ID
exports.updateTeacher = async (req, res) => {
  try {
    const { errors, isValid } = await validateTeacherInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (error) {
    console.error('Error updating teacher:', error);
    res.status(500).json({ error: 'Error updating teacher' });
  }
};


// Delete teacher by ID
exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findOneAndDelete({ _id: req.params.id });
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    console.error('Error deleting teacher:', error);
    res.status(500).json({ error: 'Error deleting teacher' });
  }
};

