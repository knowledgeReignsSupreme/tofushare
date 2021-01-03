const asyncHandler = require('express-async-handler');
const Recipe = require('../Models/recipeModel');
const mongoose = require('mongoose');

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

// *desc Add new review
// *route POST /api/recipes/:id/comments
// *access Private

const createRecipeComment = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  try {
    if (recipe) {
      const alreadyCommented = recipe.comments.find(
        (comment) => comment.userId === req.body.userId
      );
      if (alreadyCommented) {
        res.status(400).send({ message: 'רשמת כבר תגובה' });
      }

      const comment = {
        name: req.body.name,
        commentBody: req.body.commentBody,
        userId: req.body.userId,
      };

      recipe.comments.push(comment);

      await recipe.save();
      res.status(201).json({ message: 'תגובה נוספה' });
    } else {
      res.status(404).send({ message: 'מתכון לא נמצא' });
    }
  } catch (error) {
    console.log(error);
  }
});

// *desc Add new cooker
// *route PUT /api/recipes/:id/cooked
// *access Private

const userCookedRecipe = asyncHandler(async (req, res) => {
  try {
    await Recipe.findByIdAndUpdate(req.params.id, {
      $push: { cookedBy: req.body.userId },
    });
    res.status(201).json('העדכון בוצע. תודה');
  } catch (error) {
    res.status(404).send({ message: '404 משתמש לא נמצא' });
  }
});

//TODO: Change the Recipe model and even the existing one
//TODO: Creare a private post route
//TODO: Recieve the user id and the recipe id
//TODO: check if the user already cooked
//TODO: save the recipe with its new cooker
//TODO: udate the cookedby to validate who already cooked
//TODO: handle in the action how to know if the user already clicked the button even if he didnt refresh
//TODO: put to the given url, handle error and success
//TODO: handle not logged user

exports.getRecipes = getRecipes;
exports.getRecipeById = getRecipeById;
exports.createRecipeComment = createRecipeComment;
exports.userCookedRecipe = userCookedRecipe;
