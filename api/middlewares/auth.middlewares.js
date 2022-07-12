let jwt = require('jsonwebtoken');
const userModel = require('../models/users.model');

module.exports.checkUser = async (req, res, next) => {

    let token = req.cookies.user;
    if (token) {

        jwt.verify(token, process.env.JWT_TOKEN, async(err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                let user = await userModel.findById(decodedToken.id).select("-password -email");
                res.locals.user = user;
                next();
            }
        })

    } else {
        res.locals.user = null;
        next();
    }
}

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.user; 
    if (token) {
        jwt.verify(token, process.env.JWT_TOKEN, async (err, decodedToken) => { 
            if (err) { 
                console.log(err);
            } else { 
                next();
            }
        });
    } else {
        return res.status(200)
    }
}