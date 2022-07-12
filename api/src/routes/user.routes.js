let router = require('express').Router();

let userController = require('../controllers/user.controller');

router.get('/:id', userController.getUser);

module.exports = router;