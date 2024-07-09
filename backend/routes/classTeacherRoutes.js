const express = require('express');
const router = express.Router();
const classTeacherController = require('../controllers/classTeacherController');

// POST /api/faculties - Create a new faculty
router.post('/', classTeacherController.createClassTeacher);
router.get('/', classTeacherController.getAllClassTeachers);
router.get('/:id', classTeacherController.getClassTeacherById);
router.put('/:id', classTeacherController.updateClassTeacher);
router.delete('/:id', classTeacherController.deleteClassTeacher);

module.exports = router;
