const ClassSchema = require('../models/Class');
const { validateClassInput } = require('../middleware/classValidator');

// Create a new class
exports.createClass = async (req, res) => {
    const { errors, isValid } = await validateClassInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const { code, shift, faculty, grade, section, group } = req.body;

    try {
        const newClass = new ClassSchema({
            code,
            shift,
            faculty,
            grade,
            section,
            group
        });

        await newClass.save();
        res.status(201).json(newClass);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all classes
exports.getAllClasses = async (req, res) => {
    try {
        const classes = await ClassSchema.find()
            .populate('shift')
            .populate('faculty')
            .populate('grade')
            .populate('section')
            .populate('group');
        res.json(classes);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get a single class by ID
exports.getClassById = async (req, res) => {
    try {
        const classObj = await ClassSchema.findById(req.params.id)
            .populate('shift')
            .populate('faculty')
            .populate('grade')
            .populate('section')
            .populate('group');
        if (!classObj) {
            return res.status(404).json({ error: 'Class not found' });
        }
        res.json(classObj);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update a class by ID
exports.updateClass = async (req, res) => {
    const { code, shift, faculty, grade, section, group } = req.body;

    try {
        const updatedClass = await ClassSchema.findByIdAndUpdate(
            req.params.id,
            { code, shift, faculty, grade, section, group },
            { new: true }
        );

        if (!updatedClass) {
            return res.status(404).json({ error: 'Class not found' });
        }

        res.json(updatedClass);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a class by ID
exports.deleteClass = async (req, res) => {
    try {
        const deletedClass = await ClassSchema.findOneAndDelete({ _id: req.params.id});

        if (!deletedClass) {
            return res.status(404).json({ error: 'Class not found' });
        }

        res.json({ message: 'Class deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
