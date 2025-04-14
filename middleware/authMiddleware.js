const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/user');

const verifyToken = promisify(jwt.verify);

const requireAuth = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const decoded = await verifyToken(token, process.env.JWT_SECRET);
        console.log(decoded);
        next();
    } catch (err) {
        return res.redirect('/login');
    }
};

const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return next();   // return to avoid further execution
    }

    try {
        const decoded = await verifyToken(token, process.env.JWT_SECRET);
        console.log(decoded);
        const user = await User.findById(decoded.id); // await the DB query
        res.locals.user = user;     //  store the current user info for the duration of a single request
        next();
    } catch (err) {
        console.error("Error in checkUser middleware:", err.message);
        return next(); 
    }
};

module.exports = requireAuth;

module.exports = checkUser;

