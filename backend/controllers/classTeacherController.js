const ClassTeacherSchema = require('../models/ClassTeacher');
const { validateClassTeacherInput } = require('../middleware/classTeacherValidator');

// Create a new classTeacher
exports.createClassTeacher = async (req, res) => {
    try {
        const { errors, isValid } = await validateClassTeacherInput(req.body);
        if (!isValid) {
          return res.status(400).json(errors);
        }
        const newClassTeacher= new ClassTeacherSchema(req.body);
        await newClassTeacher.save();
        res.status(201).json(newClassTeacher);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all classTeacheres
exports.getAllClassTeachers = async (req, res) => {
    try {
        const classTeachers = await ClassTeacherSchema.find()
      .populate({
        path: 'teacherId',
        populate: { path: 'subject' }
      })
      .populate({
        path: 'classId',
        populate: [
          { path: 'shift' },
          { path: 'faculty' },
          { path: 'grade' },
          { path: 'section' },
          { path: 'group' }
        ]
      });
      if(!classTeachers){
        res.status(404).json({message:'Class teacher not found'});
      }
          res.status(200).json(classTeachers);
    } catch (error) {
        console.error('Error fetching class teachers:', error); // Log the error to the console
        res.status(500).json({ message: 'Error fetching class teachers', error: error.message || 'Unknown error' });
    }
};

// Get a single classTeacher by ID
exports.getClassTeacherById = async (req, res) => {
    try {
        const classTeacherObj = await ClassTeacherSchema.findById(req.params.id)
                .populate('teacher')
                .populate('class');
        if (!classTeacherObj) {
            return res.status(404).json({ error: 'Class teacher not found' });
        }
        res.json(classTeacherObj);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update a classTeacher by ID
exports.updateClassTeacher = async (req, res) => {
    try {
        const { errors, isValid } = await validateClassTeacherInput(req.body);
        if (!isValid) {
          return res.status(400).json(errors);
        }
        const classTeacher = await ClassTeacherSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!classTeacher) {
          return res.status(404).json({ error: 'Class teacher not found' });
        }
        res.json(classTeacher);
 
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a classTeacher by ID
exports.deleteClassTeacher = async (req, res) => {
    try {
        const deletedClassTeacher = await ClassTeacherSchema.findOneAndDelete({ _id: req.params.id})

        if (!deletedClassTeacher) {
            return res.status(404).json({ error: 'Class teacher not found' });
        }

        res.json({ message: 'Class teacher deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
