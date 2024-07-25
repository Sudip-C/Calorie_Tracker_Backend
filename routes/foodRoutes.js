const express = require('express');
const router = express.Router();
const { addFood, getFoods, deleteFood } = require('../controllers/foodController');
const auth = require('../middleware/authMiddleware');

// Add food entry
router.post('/', auth, addFood);

// Get all food entries
router.get('/', auth, getFoods);

// Delete food entry
router.delete('/:id', auth, deleteFood);

module.exports = router;
