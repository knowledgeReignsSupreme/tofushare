const express = require('express');
const router = express.Router();
const {
  authUser,
  getUserProfile,
  registerUser,
  updateUserSavedRecipes,
  updateUserLiked,
} = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');
const app = express();

router.route('/').post(registerUser);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/liked/:id').put(protect, updateUserSavedRecipes);
module.exports = router;
