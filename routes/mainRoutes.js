const express = require('express');
const mainRouter = express.Router();




mainRouter.get('/', (req, res) => {
    res.render('home');
});

mainRouter.get('/smoothies', (req, res) => {
    res.render('smoothies');
});



module.exports = mainRouter;