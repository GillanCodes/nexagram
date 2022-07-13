let router = require('express').Router();
let multer = require('multer');
let upload = multer();

let userController = require('../controllers/user.controller');

router.get('/:id', userController.getUser);

router.post('/uplaod/picture', upload.single('file'), userController.uploadProfilPicture)

module.exports = router;