const { isValidObjectId } = require("mongoose");
const userModel = require("../../models/users.model");
let fs = require('fs')

module.exports.getUser = async (req, res) => {

    const {id} = req.params;

    if (!isValidObjectId(id))
        return Error('Id is not valid!');

    const user = await userModel.findById(id).select('-password');
    console.log(user)
    if (user) {
        return res.status(200).json(user);
    }

    return
}

module.exports.uploadProfilPicture = (req, res) => {
    if (res.locals.user) {
        const fileName = req.body.username + ".png";
        if (req.file) {
            console.log(req.file);
            try {
                if (req.file.mimetype !== "image/jpg" && req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpeg" && req.file.mimetype !== "application/octet-stream") throw Error('invalid_type');
                if (req.file.size > 2500000) throw Error('max_size'); //Taille en KO
            } catch (error) {
                console.log(error)
                return res.status(201).json(error)
            }

            fs.writeFile(`${process.env.CDN_URL}/profile/${fileName}`, req.file.buffer, (err) =>{
                if (err) console.log(err);
            });

            try {
                userModel.findByIdAndUpdate(res.locals.user._id, {
                    $set: {
                        userPic: "./cdn/profile/" + fileName
                    }
                }, {new: true, upsert: true, setDefaultsOnInsert: true}, 
                (err, data) => {
                    if (err) throw Error(err);
                    else res.status(201).send(data);
                })
            } catch (error) {
                console.log(error)
            }
        }

    }
}