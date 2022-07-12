const { isValidObjectId } = require("mongoose");
const userModel = require("../../models/users.model");

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