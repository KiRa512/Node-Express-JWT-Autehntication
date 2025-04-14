const express = require('express');
const mainRouter = express.Router();
const requireAuth = require('../middleware/authMiddleware');




mainRouter.get('/', (req, res) => {
    res.render('home');
});

mainRouter.get('/smoothies', requireAuth, (req, res) => {
    res.render('smoothies');
});



module.exports = mainRouter;