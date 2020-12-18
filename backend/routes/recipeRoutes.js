const express = require('express');
const router = express.Router();
const Recipe = require('../Models/recipeModel');
const User = require('../Models/userModel');
const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');

const app = express();
// Fetch all recipes //GET // PUBLIC
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const recipes = await Recipe.find({});
    res.send(recipes);
  })
);

// Fetch single recipes //GET // PUBLIC
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);

    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ message: 'Recipe not found.' });
    }
  })
);
router.use(bodyParser.json());

//!* POSTING TO THE USER COLLECTION. USE THIS TO POST TO THE RECIPE COLLECTION
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const theRecipe = new Recipe({
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      images: req.body.images,
      prepTime: req.body.prepTime,
      totalTime: req.body.totalTime,
      remarks: req.body.remarks,
      tags: req.body.tags,
      difficulty: req.body.difficulty,
    });
    const recipeSave = await theRecipe.save();

    res.status(201).send(theRecipe);
  })
);

const PORT = process.env.PORT || 5001;

module.exports = router;
