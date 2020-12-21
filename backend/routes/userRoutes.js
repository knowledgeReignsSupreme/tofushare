const express = require('express');
const router = express.Router();
const { authUser } = require('../controllers/userController');

const app = express();

router.post('/login', authUser);

module.exports = router;
