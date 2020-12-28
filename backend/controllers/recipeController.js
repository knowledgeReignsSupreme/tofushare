const asyncHandler = require('express-async-handler');
const Recipe = require('../Models/recipeModel');

// *desc Fetch all recipes
// *route GET /api/recipes
// *access Public
const getRecipes = asyncHandler(async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.send(recipes);
  } catch (error) {
    res.status(400).send({ message: 'נא לרענן את הדף' });
  }
});

// *desc Fetch single recipe
// *route GET /api/recipes/:id
// *access Public
const getRecipeById = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (recipe) {
    res.json(recipe);
  } else {
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

exports.getRecipes = getRecipes;
exports.getRecipeById = getRecipeById;
exports.createRecipeComment = createRecipeComment;
