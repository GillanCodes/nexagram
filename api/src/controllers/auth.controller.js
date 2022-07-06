const userModel = require('../../models/users.model');
let jwt = require('jsonwebtoken');

const maxAge = 3*21*60*60*1000 

/**
 * 
 * @param {ObjectId} id 
 * @returns {String} token
 */

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_TOKEN, {
        expiresIn: maxAge
    });
}

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 */

module.exports.register = async(req, res) => {
    const {username, password, email} = req.body;

    try {
        const user = await userModel.create({username, email, password});
        res.status(201).json({user:user._id});

    } catch (error) {
        res.status(200).send(error);
    }
}

module.exports.login = async(req, res) => {
    const {username, password} = req.body;

    try {
        var user = await userModel.login(username, password);
        userModel.find(user._id, 
            (err, data) => {
            const token = createToken(user._id);
            res.cookie('user', token, {httpOnly: true, maxAge});
            res.status(201).json({user:user.username, id:user._id});
        })
    } catch (error) {
        res.status(200).send(error);
    }
}

module.exports.logout = (req, res) => {
    res.cookie('user', '',{httpOnly: true, maxAge: 1});
    res.status(200).send();
}