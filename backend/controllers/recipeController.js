const asyncHandler = require('express-async-handler');
const Recipe = require('../Models/recipeModel');
const User = require('../Models/userModel');
const mongoose = require('mongoose');
const { REFUSED } = require('dns');

mongoose.set('useFindAndModify', false);
// *desc Fetch all recipes
// *route GET /api/recipes
// *access Public
const getRecipes = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const approved = {
    isApproved: true,
  };

  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const tag = req.query.searchTag
    ? {
        tags: {
          $in: [req.query.searchTag],
        },
      }
    : {};

  const category = req.query.category
    ? {
        category: {
          $regex: req.query.category,
          $options: 'i',
        },
      }
    : {};

  try {
    const count = await Recipe.countDocuments({
      ...approved,
      ...keyword,
      ...tag,
      ...category,
    });
    const recipes = await Recipe.find({
      ...approved,
      ...keyword,
      ...tag,
      ...category,
    })
      .sort({ _id: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.send({ recipes, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(400).send({ message: 'נא לרענן את הדף' });
  }
});

// *desc Fetch single recipe
// *route GET /api/recipes/:id
// *access Public
const getRecipeById = asyncHandler(async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (recipe && recipe.isApproved) {
      res.json(recipe);
    } else {
      res.status(404).send({ message: '404 מתכון לא נמצא' });
    }
  } catch (error) {
    res.status(404).send({ message: '404 מתכון לא נמצא' });
  }
});

// *desc Add new recipe
// *route POST /api/recipes
// *access Private
const postRecipe = asyncHandler(async (req, res) => {
  try {
    const theRecipe = new Recipe({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      author: req.body.author,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      images: req.body.images,
      prepTime: req.body.prepTime,
      cookingTime: req.body.cookingTime,
      remarks: req.body.remarks,
      tags: req.body.tags,
      difficulty: req.body.difficulty,
      dishesAmmount: req.body.dishesAmmount,
      website: req.body.website,
      createdBy: req.body.createdBy,
    });
    const newRecipe = await theRecipe.save();

    const user = req.user;
    await user.update({
      $push: { createdRecipes: newRecipe._id.toString() },
    });
    res.status(201).send(theRecipe);
  } catch (error) {
    res.status(404).send({ message: 'משתמש לא נמצא' });
  }
});

// *desc get unapproved recipes
// *route GET /api/recipes/admin
// *access Private/Admin
const getUnapprovedRecipes = asyncHandler(async (req, res) => {
  try {
    const unapprovedRecipes = await Recipe.find({ isApproved: false });
    res.json(unapprovedRecipes);
  } catch (error) {
    res.status(401).send({ message: 'אין גישה' });
  }
});

// *desc approve recipe
// *route PUT /api/recipes/admin
// *access Private/Admin
const approveRecipe = asyncHandler(async (req, res) => {
  console.log(req.body.recipeId);
  try {
    const recipe = await Recipe.findById(req.body.recipeId);
    recipe.isApproved = true;
    const savedRecipe = await recipe.save();
    res.json(savedRecipe);
  } catch (error) {
    res.status(401).send({ message: 'מתכון לא קיים או שכבר אושר' });
  }
});

// *desc approve recipe
// *route DELETE /api/recipes/admin
// *access Private/Admin
const deleteRecipe = asyncHandler(async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.body.recipeId);
    await User.findOneAndUpdate(
      { createdRecipes: { $in: req.params.id } },
      { $pull: { createdRecipes: recipe._id } }
    );
    await User.updateMany(
      { savedRecipes: { $in: req.params.id } },
      { $pull: { savedRecipes: recipe._id } }
    );
    await Recipe.findByIdAndRemove(req.body.recipeId);
    res.json('Deleted Successfully');
  } catch (error) {
    res.status(404).send({ message: 'מתכון לא קיים או שכבר אושר' });
  }
});

// *desc Edit Recipe Status
// *route PUT /api/recipes
// *access Private
const editRecipeStatus = asyncHandler(async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (recipe) {
      recipe.cookedBy = req.body.cookedBy || recipe.cookedBy;
      recipe.comments = req.body.comment || recipe.comments;

      const updatedRecipe = await recipe.save();

      res.json({
        updatedRecipe,
      });
    } else {
      res.status(404).send({ message: 'מתכון לא נמצא' });
    }
  } catch (error) {
    res.status(404).send({ message: 'מתכון לא קיים' });
  }
});

// *desc Edit Recipe
// *route PUT /api/recipes/author
// *access Private/Author
const authorEditRecipe = asyncHandler(async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.body.recipeId);
    recipe.website = req.body.website || recipe.website;

    const updatedRecipe = await recipe.save();

    res.json(updatedRecipe);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: 'מתכון לא קיים' });
  }
});

exports.getRecipes = getRecipes;
exports.getRecipeById = getRecipeById;
exports.postRecipe = postRecipe;
exports.getUnapprovedRecipes = getUnapprovedRecipes;
exports.approveRecipe = approveRecipe;
exports.deleteRecipe = deleteRecipe;
exports.authorEditRecipe = authorEditRecipe;
exports.editRecipeStatus = editRecipeStatus;
