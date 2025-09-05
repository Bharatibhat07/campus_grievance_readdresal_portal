const express = require('express');
const Complaint = require('../models/complaint');

const router = express.Router();

// POST — Submit complaint
router.post('/', async (req, res) => {
  try {
    const { userId, description } = req.body;
    if (!userId || !description) {
      return res.status(400).json({ error: 'userId and description are required' });
    }

    let category = 'General';
    const text = description.toLowerCase();
    if (text.includes('wifi') || text.includes('internet')) category = 'IT Department';
    else if (text.includes('hostel')) category = 'Hostel Office';
    else if (text.includes('security')) category = 'Security';

    const complaint = new Complaint({ userId, category, description });
    await complaint.save();

    res.status(201).json({ message: 'Complaint submitted', complaint });
  } catch (err) {
    console.error("ERROR submitting complaint:", err);
    res.status(500).json({ error: 'Failed to submit complaint' });
  }
});

// GET — Complaints of a user
router.get('/:userId', async (req, res) => {
  try {
    const complaints = await Complaint.find({ userId: req.params.userId });
    res.json(complaints);
  } catch (err) {
    console.error("ERROR fetching complaints:", err);
    res.status(500).json({ error: 'Failed to fetch complaints' });
  }
});

// PATCH — Update complaint status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: 'status is required' });

    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Complaint not found' });

    res.json(updated);
  } catch (err) {
    console.error("ERROR updating complaint status:", err);
    res.status(500).json({ error: 'Failed to update complaint status' });
  }
});

// PATCH — Add feedback after resolution
router.patch('/:id/feedback', async (req, res) => {
  try {
    const { rating, comments } = req.body;
    if (!rating) return res.status(400).json({ error: 'rating is required' });

    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      { feedback: { rating, comments } },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Complaint not found' });

    res.json(updated);
  } catch (err) {
    console.error("ERROR submitting feedback:", err);
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

module.exports = router;
