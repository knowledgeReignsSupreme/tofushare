const express = require('express');
const router = express.Router();
const {
  authUserLogin,
  getLoggedUserDetails,
  registerUser,
  updateUserSavedRecipes,
  getUserById,
  updateUserProfile,
  getUsers,
} = require('../controllers/userController');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const app = express();

//*route /api/users

router.route('/').post(registerUser).get(protect, isAdmin, getUsers);
router.post('/login', authUserLogin);
router
  .route('/profile')
  .get(protect, getLoggedUserDetails)
  .put(protect, updateUserProfile);
router.route('/liked/:id').put(protect, updateUserSavedRecipes);
router.get('/:id', getUserById);

module.exports = router;
