const Food = require('../models/Food');

// Add a food entry
exports.addFood = async (req, res) => {
  const { name, calories } = req.body;
  try {
    const newFood = new Food({
      user: req.user.id,
      name,
      calories,
    });
    const food = await newFood.save();
    res.json(food);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all food entries for a user
exports.getFoods = async (req, res) => {
  try {
    const foods = await Food.find({ user: req.user.id });
    res.json(foods);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a food entry
exports.deleteFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ msg: 'Food not found' });
    }
    if (food.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    await food.remove();
    res.json({ msg: 'Food removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
