import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// GET /api/contacts - Get all contact messages
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch contacts', error: error.message });
  }
});

// POST /api/contacts - Save a new contact message
router.post('/', async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({
      message: 'Contact message saved successfully',
      contact,
    });
  } catch (error) {
    res.status(400).json({ message: 'Failed to save contact message', error: error.message });
  }
});

// PUT /api/contacts/:id - Update contact status
router.put('/:id', async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: 'Contact message not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update contact message', error: error.message });
  }
});

// DELETE /api/contacts/:id - Delete a contact message
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Contact message not found' });
    res.json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete contact message', error: error.message });
  }
});

export default router;
