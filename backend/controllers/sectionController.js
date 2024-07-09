const Section = require('../models/Section');
const { validateSectionInput } = require('../middleware/sectionValidator');
// Create a new section
exports.createSection = async (req, res) => {
    try {
      const { errors, isValid } = await validateSectionInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
  
      const section = new Section(req.body);
      await section.save();
      res.status(201).json(section);
    } catch (error) {
      console.error('Error creating section:', error);
      res.status(500).json({ error: 'Error creating section' });
    }
  };

// Get all sections
exports.getAllSections = async (req, res) => {
  try {
    const sections = await Section.find();
    res.json(sections);
  } catch (error) {
    console.error('Error getting sections:', error);
    res.status(500).json({ error: 'Error getting sections' });
  }
};

// Get section by ID
exports.getSectionById = async (req, res) => {
  try {
    const section = await Section.findById(req.params.id);
    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }
    res.json(section);
  } catch (error) {
    console.error('Error getting section by ID:', error);
    res.status(500).json({ error: 'Error getting section by ID' });
  }
};

// Update section by ID
exports.updateSection = async (req, res) => {
  try {
    const { errors, isValid } = await validateSectionInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const section = await Section.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }
    res.json(section);
  } catch (error) {
    console.error('Error updating section:', error);
    res.status(500).json({ error: 'Error updating section' });
  }
};


// Delete section by ID
exports.deleteSection = async (req, res) => {
  try {
    const section = await Section.findOneAndDelete({ _id: req.params.id });
    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }
    res.json({ message: 'Section deleted successfully' });
  } catch (error) {
    console.error('Error deleting section:', error);
    res.status(500).json({ error: 'Error deleting section' });
  }
};

