const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Recipe = require('./recipeModel');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
    createdRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    bio: {
      type: String,
      required: false,
      default: '',
    },
    instagramLink: {
      type: String,
      required: false,
      default: '',
    },
    facebookLink: {
      type: String,
      required: false,
      default: '',
    },
    websiteLink: {
      type: String,
      required: false,
      default: '',
    },
    isVerified: {
      type: Boolean,
      required: false,
      default: false,
    },
    image: {
      type: Object,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model('User', userSchema);

module.exports = User;
