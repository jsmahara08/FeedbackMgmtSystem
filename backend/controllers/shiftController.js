const Shift = require('../models/Shift');
const { validateShiftInput } = require('../middleware/shiftValidator');
// Create a new shift
exports.createShift = async (req, res) => {
    try {
      const { errors, isValid } = await validateShiftInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
  
      const shift = new Shift(req.body);
      await shift.save();
      res.status(201).json(shift);
    } catch (error) {
      console.error('Error creating shift:', error);
      res.status(500).json({ error: 'Error creating shift' });
    }
  };

// Get all shifts
exports.getAllShifts = async (req, res) => {
  try {
    const shifts = await Shift.find();
    res.json(shifts);
  } catch (error) {
    console.error('Error getting shifts:', error);
    res.status(500).json({ error: 'Error getting shifts' });
  }
};

// Get shift by ID
exports.getShiftById = async (req, res) => {
  try {
    const shift = await Shift.findById(req.params.id);
    if (!shift) {
      return res.status(404).json({ error: 'Shift not found' });
    }
    res.json(shift);
  } catch (error) {
    console.error('Error getting shift by ID:', error);
    res.status(500).json({ error: 'Error getting shift by ID' });
  }
};

// Update shift by ID
exports.updateShift = async (req, res) => {
  try {
    const { errors, isValid } = await validateShiftInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const shift = await Shift.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!shift) {
      return res.status(404).json({ error: 'Shift not found' });
    }
    res.json(shift);
  } catch (error) {
    console.error('Error updating shift:', error);
    res.status(500).json({ error: 'Error updating shift' });
  }
};


// Delete shift by ID
exports.deleteShift = async (req, res) => {
  try {
    const shift = await Shift.findOneAndDelete({ _id: req.params.id });
    if (!shift) {
      return res.status(404).json({ error: 'Shift not found' });
    }
    res.json({ message: 'Shift deleted successfully' });
  } catch (error) {
    console.error('Error deleting shift:', error);
    res.status(500).json({ error: 'Error deleting shift' });
  }
};

