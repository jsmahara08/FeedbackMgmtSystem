const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

// POST /api/faculties - Create a new faculty
router.post('/', classController.createClass);
router.get('/', classController.getAllClasses);
router.get('/:id', classController.getClassById);
router.put('/:id', classController.updateClass);
router.delete('/:id', classController.deleteClass);

module.exports = router;
