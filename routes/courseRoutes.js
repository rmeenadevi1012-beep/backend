import express from 'express';
import Course from '../models/Course.js';

const router = express.Router();

// GET /api/courses - Get all courses (with optional search & category filter)
router.get('/', async (req, res) => {
  try {
    const { search, category, status } = req.query;
    const filter = {};
    if (category && category !== 'All') filter.category = category;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    const courses = await Course.find(filter).sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch courses', error: error.message });
  }
});

// GET /api/courses/:id - Get single course by ID or slug
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    const course = isObjectId
      ? await Course.findById(id)
      : await Course.findOne({ $or: [{ slug: id }, { code: id }] });

    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch course', error: error.message });
  }
});

// POST /api/courses - Create a new course
router.post('/', async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create course', error: error.message });
  }
});

// PUT /api/courses/:id - Update a course
router.put('/:id', async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: 'Course not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update course', error: error.message });
  }
});

// DELETE /api/courses/:id - Delete a course
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete course', error: error.message });
  }
});

export default router;
