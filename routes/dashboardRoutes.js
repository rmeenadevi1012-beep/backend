import express from 'express';
import Course from '../models/Course.js';
import Student from '../models/Student.js';
import Enquiry from '../models/Enquiry.js';
import Contact from '../models/Contact.js';

const router = express.Router();

// GET /api/dashboard/stats
router.get('/dashboard/stats', async (_req, res) => {
  try {
    const [totalCourses, totalStudents, totalEnquiries, totalContacts] = await Promise.all([
      Course.countDocuments(),
      Student.countDocuments(),
      Enquiry.countDocuments(),
      Contact.countDocuments(),
    ]);

    res.json({
      totalCourses,
      totalStudents,
      totalEnquiries,
      totalContacts,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load dashboard stats', error: error.message });
  }
});

// GET /api/enrollments
router.get('/enrollments', async (_req, res) => {
  try {
    const enrollments = await Student.find().sort({ createdAt: -1 }).limit(10);
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load enrollments', error: error.message });
  }
});

// GET /api/events
router.get('/events', async (_req, res) => {
  res.json([
    { id: 1, title: 'New MERN Batch Orientation', date: '01 Dec 2026', type: 'Orientation' },
    { id: 2, title: 'Python Full Stack Workshop', date: '05 Dec 2026', type: 'Workshop' },
  ]);
});

export default router;
