const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');

// POST /api/faculties - Create a new faculty
router.post('/', facultyController.createFaculty);
router.get('/', facultyController.getAllFaculties);
router.get('/:id', facultyController.getFacultyById);
router.put('/:id', facultyController.updateFaculty);
router.delete('/:id', facultyController.deleteFaculty);

module.exports = router;
