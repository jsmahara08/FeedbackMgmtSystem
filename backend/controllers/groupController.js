const Group = require('../models/Group');
const { validateGroupInput } = require('../middleware/groupValidator');
// Create a new group
exports.createGroup = async (req, res) => {
    try {
      const { errors, isValid } = await validateGroupInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
  
      const group = new Group(req.body);
      await group.save();
      res.status(201).json(group);
    } catch (error) {
      console.error('Error creating group:', error);
      res.status(500).json({ error: 'Error creating group' });
    }
  };

// Get all groups
exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    console.error('Error getting groups:', error);
    res.status(500).json({ error: 'Error getting groups' });
  }
};

// Get group by ID
exports.getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    res.json(group);
  } catch (error) {
    console.error('Error getting group by ID:', error);
    res.status(500).json({ error: 'Error getting group by ID' });
  }
};

// Update group by ID
exports.updateGroup = async (req, res) => {
  try {
    const { errors, isValid } = await validateGroupInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const group = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    res.json(group);
  } catch (error) {
    console.error('Error updating group:', error);
    res.status(500).json({ error: 'Error updating group' });
  }
};


// Delete group by ID
exports.deleteGroup = async (req, res) => {
  try {
    const group = await Group.findOneAndDelete({ _id: req.params.id });
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    res.json({ message: 'Group deleted successfully' });
  } catch (error) {
    console.error('Error deleting group:', error);
    res.status(500).json({ error: 'Error deleting group' });
  }
};

