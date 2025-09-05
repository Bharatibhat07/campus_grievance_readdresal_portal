// backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();

// TEMPORARY HARD-CODED USERS for testing
// Later, we will replace this with MongoDB + Mongoose User model
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Priya Sharma', email: 'priya@example.com' }
];

// ✅ GET: /api/users
// Fetch all users
router.get('/', (req, res) => {
  res.json(users);
});

// ✅ GET: /api/users/:id
// Fetch single user by ID
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

module.exports = router;
