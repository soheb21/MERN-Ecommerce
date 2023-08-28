const userModel = require("../model/userModel");
const { senitizeUser } = require("../service/common");

const fetchUserByIdController = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await userModel.findById(id)
        res.status(201).json(senitizeUser(user))
    } catch (error) {
        console.log("Fetching Error", error)
        res.status(501).json({ success: false, message: "Failed to  fetch User Info" })
    }
}
const updateUserByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const updateUser = await userModel.findByIdAndUpdate(id, req.body, { new: true }) //new true se jaga pe update dikhta hai.
        res.status(201).json(updateUser)
    } catch (error) {
        console.log("Fetching Error", error)
        res.status(501).json({ success: false, message: "Failed to update user-Info" })
    }
}
module.exports = { fetchUserByIdController, updateUserByIdController }