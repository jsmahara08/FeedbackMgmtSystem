const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');

// POST /api/faculties - Create a new subject
router.post('/', subjectController.createSubject);
router.get('/', subjectController.getAllFaculties);
router.get('/:id', subjectController.getSubjectById);
router.put('/:id', subjectController.updateSubject);
router.delete('/:id', subjectController.deleteSubject);

module.exports = router;
