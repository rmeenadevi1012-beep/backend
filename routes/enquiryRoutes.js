import express from 'express';
import Enquiry from '../models/Enquiry.js';

const router = express.Router();

// GET /api/enquiries - Get all course enquiries
router.get('/', async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = {};
    if (status && status !== 'All') filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { course: { $regex: search, $options: 'i' } },
      ];
    }
    const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch enquiries', error: error.message });
  }
});

// POST /api/enquiries - Create a new course enquiry
router.post('/', async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.body);
    res.status(201).json({
      message: 'Course inquiry submitted successfully',
      enquiry,
    });
  } catch (error) {
    res.status(400).json({ message: 'Failed to submit course inquiry', error: error.message });
  }
});

// PUT /api/enquiries/:id - Update enquiry status/details
router.put('/:id', async (req, res) => {
  try {
    const updated = await Enquiry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: 'Enquiry not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update enquiry', error: error.message });
  }
});

// DELETE /api/enquiries/:id - Delete an enquiry
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Enquiry.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Enquiry not found' });
    res.json({ message: 'Enquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete enquiry', error: error.message });
  }
});

export default router;
