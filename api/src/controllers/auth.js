const { registerUserErrors, loginUserErrors } = require('../../utils/errors.utils');
const userModel = require('../../models/user.model');
const notificationModel = require('../../models/notification.model');
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
        
        const newNotification = await notificationModel.create({
            adressee: user._id,
            title: "Bienvenu !",
            content: "Bienvenu sur RTB, en te souhaitant de bonne revisions !",
            icon: "welcome"
        });

    } catch (error) {
        console.log(error);
        let errors = registerUserErrors(error);
        res.status(200).send({errors});
    }
}

module.exports.login = async(req, res) => {
    const {username, password} = req.body;

    try {
        var user = await userModel.login(username, password);
        userModel.findByIdAndUpdate(user._id, {
            $addToSet: {
                logs: {
                    date: Date.now()
                },
            }, 
        }, { new: true}, (err, data) => {
            const token = createToken(user._id);
            res.cookie('revtonbac_user', token, {httpOnly: true, maxAge});
            if (user.permissions.has('DASHBOARD')) {
                res.cookie('revtonbac_dashboard', token, {httpOnly: true, maxAge});
            }
            res.status(201).json({user:user.username, permissions: user.permissions});
        })
    } catch (error) {
        const errors = loginUserErrors(error);
        res.status(200).send({errors});
    }
}

module.exports.logout = (req, res) => {
    res.cookie('revtonbac_user', '',{httpOnly: true, maxAge: 1});
    res.cookie('revtonbac_dashboard', '',{httpOnly: true, maxAge: 1});
    res.status(200).send();
}