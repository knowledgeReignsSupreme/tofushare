const asyncHandler = require('express-async-handler');
const User = require('../Models/userModel');
const generateToken = require('../utils/generateToken');
const Recipe = require('../Models/recipeModel');
const { findById } = require('../Models/recipeModel');

// *desc Auth user and get token
// *route POST /api/users/login
// *access Public
const authUserLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      savedRecipes: user.savedRecipes,
      createdRecipes: user.createdRecipes,
      bio: user.bio,
      image: user.image,
      instagramLink: user.instagramLink,
      facebookLink: user.facebookLink,
      createdAt: user.createdAt,
      websiteLink: user.websiteLink,
      isVerified: user.isVerified,
    });
  } else {
    res.status(401);
    throw new Error('אימייל או סיסמה לא תקינים');
  }
});

// *desc Register new user
// *route POST /api/users
// *access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, websiteLink } = req.body;

  const isExists = await User.findOne({ email });

  if (isExists) {
    res.status(400).send({ message: 'משתמש כבר קיים' });
  }

  const user = await User.create({
    name,
    email,
    password,
    websiteLink,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      savedRecipes: user.savedRecipes,
      createdRecipes: user.createdRecipes,
      bio: user.bio,
      image: user.image,
      instagramLink: user.instagramLink,
      facebookLink: user.facebookLink,
      createdAt: user.createdAt,
      websiteLink: user.websiteLink,
      isVerified: user.isVerified,
    });
  } else {
    res.status(400).send({ message: 'מידע שגוי' });
  }
});

// *desc Get user profile
// *route GET /api/users/profile
// *access Private
const getLoggedUserDetails = asyncHandler(async (req, res) => {
  try {
    await User.findById(req.user._id)
      .populate({
        path: 'savedRecipes',
        match: { isApproved: true },
        options: { sort: { _id: -1 } },
      })
      .populate({
        path: 'createdRecipes',
        match: { isApproved: true },
        options: { sort: { _id: -1 } },
      })
      .then((data) => {
        res.json(data);
      });
  } catch (error) {
    res.status(404).send({ message: 'משתמש לא נמצא' });
  }
});

// *desc Fetch single user
// *route GET /api/users/:id
// *access Public
const getUserById = asyncHandler(async (req, res) => {
  try {
    await User.findById(req.params.id)
      .populate({
        path: 'createdRecipes',
        match: { isApproved: true },
        options: { sort: { _id: -1 } },
      })
      .populate({
        path: 'savedRecipes',
        match: { isApproved: true },
        options: { sort: { _id: -1 } },
      })

      .then((data) => {
        res.json(data);
      });
  } catch (error) {
    res.status(404).send({ message: 'משתמש לא נמצא' });
  }
});

// *desc Update user profile
// *route PUT /api/users/profile
// *access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.likedRecipes = req.body.likedRecipes || user.likedRecipes;
    user.createdRecipes = req.body.createdRecipes || user.createdRecipes;
    user.bio = req.body.bio || user.bio;
    user.instagramLink = req.body.instagramLink || user.instagramLink;
    user.facebookLink = req.body.facebookLink || user.facebookLink;
    user.image = req.body.image || user.image;
    user.websiteLink = req.body.websiteLink || user.websiteLink;
    user.isVerified = req.body.isVerified || user.isVerified;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      createdRecipes: updatedUser.createdRecipes,
      savedRecipes: updatedUser.savedRecipes,
      instagramLink: updatedUser.instagramLink,
      facebookLink: updatedUser.facebookLink,
      bio: updatedUser.bio,
      image: updatedUser.image,
      token: generateToken(updatedUser._id),
      createdAt: updatedUser.createdAt,
      websiteLink: user.websiteLink,
      isVerified: user.isVerified,
    });
  } else {
    res.status(404).send({ message: 'משתמש לא נמצא' });
  }
});

// *desc add or delete a recipe from user's liked recipes
// *route PUT /api/users/liked/:id
const updateUserSavedRecipes = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const recipe = await Recipe.findById(req.body.recipeId);

    if (user && recipe) {
      user.savedRecipes = req.body.savedRecipes || user.savedRecipes;
      const updatedUser = await user.save();

      res.json({
        savedRecipes: updatedUser.savedRecipes,
      });
    } else {
      res.status(401).send({ message: 'אינך מורשה' });
    }
  } catch (error) {
    res.status(404).send({ message: 'משתמש לא קיים 404' });
  }
});

// *desc Fetch all users
// *route GET /api/users
// *access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}).sort({ _id: -1 });
    res.json(users);
  } catch (error) {
    res.status(404).send({ message: 'משתמש לא נמצא' });
  }
});

exports.authUserLogin = authUserLogin;
exports.getLoggedUserDetails = getLoggedUserDetails;
exports.registerUser = registerUser;
exports.updateUserProfile = updateUserProfile;
exports.updateUserSavedRecipes = updateUserSavedRecipes;
exports.getUserById = getUserById;
exports.getUsers = getUsers;
