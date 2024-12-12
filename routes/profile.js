// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Middleware to protect the route (if applicable)
const { ensureAuthenticated } = require('../middleware/auth');

// Profile route
router.get('/profile', ensureAuthenticated, userController.getProfile);

module.exports = router;
