const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/gradeController');

// POST /api/faculties - Create a new grade
router.post('/', gradeController.createGrade);
router.get('/', gradeController.getAllGrades);
router.get('/:id', gradeController.getGradeById);
router.put('/:id', gradeController.updateGrade);
router.delete('/:id', gradeController.deleteGrade);

module.exports = router;
