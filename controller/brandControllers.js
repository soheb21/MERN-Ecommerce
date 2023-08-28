const brandModel = require("../model/brandModel");

const addBrandController = async (req, res) => {
    try {
        const newBrand = new brandModel(req.body);
        await newBrand.save();
        // console.log(newProduct)
        res.status(201).json({ success: true, message: "Brand add Successfully" })
    } catch (error) {
        console.log("Feetching Error", error)
        res.status(501).json({ success: false, message: "Failed to Add Product" })
    }
}
const fetchAllBrandController = async (req, res) => {

    try {

        const brands = await brandModel.find({})
        res.status(201).json(brands)
    } catch (error) {
        console.log("Feetching Error", error)
        res.status(501).json({ success: false, message: "Failed to Add Product" })
    }
}
module.exports = { addBrandController, fetchAllBrandController }
