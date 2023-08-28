const categoryModel = require("../model/categoryModel");

const addCategoryController = async (req, res) => {
    try {
        const newCategory = new categoryModel(req.body);
        await newCategory.save();
        // console.log(newProduct)
        res.status(201).json({ success: true, message: "category add Successfully" })
    } catch (error) {
        console.log("Feetching Error", error)
        res.status(501).json({ success: false, message: "Failed to Add Product" })
    }
}
const fetchAllCategoryController = async (req, res) => {

    try {

        const allCategory = await categoryModel.find({})
        res.status(201).json(allCategory)
    } catch (error) {
        console.log("Feetching Error", error)
        res.status(501).json({ success: false, message: "Failed to Add Product" })
    }
}
module.exports = { addCategoryController, fetchAllCategoryController }
