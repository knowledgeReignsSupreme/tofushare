const asyncHandler = require('express-async-handler');
const User = require('../Models/userModel');
const generateToken = require('../utils/generateToken');
const Recipe = require('../Models/recipeModel');

// *desc Auth user and get token
// *route POST /api/users/login
// *access Public
const authUser = asyncHandler(async (req, res) => {
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
      createdRecipes: user.createdRecipe,
      bio: user.bio,
      image: user.image,
      instagramLink: user.instagramLink,
      facebookLink: user.facebookLink,
      createdAt: user.createdAt,
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
  const { name, email, password } = req.body;

  const isExists = await User.findOne({ email });

  if (isExists) {
    res.status(400).send({ message: 'משתמש כבר קיים' });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      savedRecipes: user.savedRecipes,
      createdRecipes: user.createdRecipe,
      bio: user.bio,
      image: user.image,
      instagramLink: user.instagramLink,
      facebookLink: user.facebookLink,
      createdAt: user.createdAt,
    });
  } else {
    res.status(400).send({ message: 'מידע שגוי' });
  }
});

// *desc Get user profile
// *route GET /api/users/profile
// *access Private
const getLoggedUserDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    userInfo = user;

    const recipes = await Recipe.find({ createdBy: req.user.id });
    userInfo.createdRecipes = recipes;

    const savedRecipesIds = user.savedRecipes;
    const savedRecipes = [];

    await Promise.all(
      savedRecipesIds.map(async (recipeId) => {
        const recipe = await Recipe.findById(recipeId);
        savedRecipes.push(recipe);
      })
    ).then(() => {
      userInfo.savedRecipes = savedRecipes;
    });

    res.json({
      userInfo,
    });
  } else {
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

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      createdRecipes: updatedUser.createdRecipe,
      savedRecipes: updatedUser.savedRecipes,
      instagramLink: updatedUser.instagramLink,
      facebookLink: updatedUser.facebookLink,
      bio: updatedUser.bio,
      image: updatedUser.image,
      token: generateToken(updatedUser._id),
      createdAt: updatedUser.createdAt,
    });
  } else {
    res.status(404).send({ message: 'משתמש לא נמצא' });
  }
});

// *desc add or delete a recipe from user's liked recipes
// *route PUT /api/users/liked/:id
const updateUserSavedRecipes = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const recipe = await Recipe.findById(req.body.recipeId);

  if (user && recipe) {
    user.savedRecipes = req.body.savedRecipes || user.savedRecipes;
    user.bio = '';
    const updatedUser = await user.save();

    res.json({
      savedRecipes: updatedUser.savedRecipes,
    });
  } else {
    res.status(401).send({ message: 'אינך מורשה' });
  }
});

// *desc Fetch single user
// *route GET /api/users/:id
// *access Public
const getUserById = asyncHandler(async (req, res) => {
  let userInfo = {};

  const user = await User.findById(req.params.id);
  if (user) {
    userInfo = user;

    const recipes = await Recipe.find({ createdBy: req.params.id });
    userInfo.createdRecipes = recipes;

    const savedRecipesIds = user.savedRecipes;
    const savedRecipes = [];

    await Promise.all(
      savedRecipesIds.map(async (recipeId) => {
        const recipe = await Recipe.findById(recipeId);
        savedRecipes.push(recipe);
      })
    ).then(() => {
      userInfo.savedRecipes = savedRecipes;
    });

    res.json(userInfo);
  } else {
    res.status(404).send({ message: '404 משתמש לא נמצא' });
  }
});

exports.authUser = authUser;
exports.getLoggedUserDetails = getLoggedUserDetails;
exports.registerUser = registerUser;
exports.updateUserProfile = updateUserProfile;
exports.updateUserSavedRecipes = updateUserSavedRecipes;
exports.getUserById = getUserById;
