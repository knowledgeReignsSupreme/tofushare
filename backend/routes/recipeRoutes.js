const express = require('express');
const router = express.Router();
const Recipe = require('../Models/recipeModel');
const User = require('../Models/userModel');
const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const {
  getRecipes,
  getRecipeById,
} = require('../controllers/recipeController');

const app = express();

router.route('/').get(getRecipes);
router.route('/:id').get(getRecipeById);

//*! POSTING TO THE USER COLLECTION. USE THIS TO POST TO THE RECIPE COLLECTION
router.post(
  '/',
  asyncHandler(async (req, res) => {
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
    });
    const recipeSave = await theRecipe.save();

    res.status(201).send(theRecipe);
  })
);

const PORT = process.env.PORT || 5001;

module.exports = router;
