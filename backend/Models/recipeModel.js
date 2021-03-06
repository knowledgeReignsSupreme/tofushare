const mongoose = require('mongoose');
const User = require('./userModel');

const ingredientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ammount: {
    type: Number,
    required: false,
  },
  measurement: {
    type: String,
    required: false,
  },
});

const commentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    commentBody: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const recipeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: false,
    },
    ingredients: [ingredientSchema],
    instructions: {
      type: Array,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    prepTime: {
      type: Number,
      required: true,
    },
    cookingTime: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
    remarks: {
      type: String,
      required: false,
    },
    dishesAmmount: {
      type: Number,
      required: true,
    },
    comments: [commentSchema],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    isApproved: {
      type: Boolean,
      required: false,
      default: false,
    },
    cookedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
