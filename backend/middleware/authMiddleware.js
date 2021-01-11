const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../Models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.log(token);
      res.status(401).send({ message: 'אינך מורשה' });
    }
  }

  if (!token) {
    console.log(token);
    res.status(401).send({ message: 'אינך מורשה' });
  }
});

const isAuthor = (req, res, next) => {
  if (req.user && req.user.createdRecipes.includes(req.params.id)) {
    next();
  } else {
    throw new Error('אינך יוצר המתכון');
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'אינך מורשה' });
    throw new Error('אינך מורשה כאדמין');
  }
};
exports.protect = protect;
exports.isAdmin = isAdmin;
exports.isAuthor = isAuthor;
