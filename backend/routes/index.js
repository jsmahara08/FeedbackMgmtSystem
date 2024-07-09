const express = require('express');
const router = express.Router();
const facultyRoutes = require('./facultyRoutes');
const gradeRoutes = require('./gradeRoutes');
const sectionRoutes = require('./sectionRoutes');
const shiftRoutes = require('./shiftRoutes');
const groupRoutes = require('./groupRoutes');
const classRoutes = require('./classRoutes');
const subjectRoutes = require('./subjectRoutes');
const teacherRoutes = require('./teacherRoutes');
const classTeacherRoutes = require('./classTeacherRoutes');


router.use('/faculties', facultyRoutes);
router.use('/grades', gradeRoutes);
router.use('/sections', sectionRoutes);
router.use('/shifts',shiftRoutes);
router.use('/groups',groupRoutes);
router.use('/classes',classRoutes);
router.use('/subjects',subjectRoutes);
router.use('/teachers',teacherRoutes);
router.use('/classteachers',classTeacherRoutes);
// You can add more routes here if needed

module.exports = router;
