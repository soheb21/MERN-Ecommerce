const CartModel = require("../model/cartModel");

const addCartController = async (req, res) => {
    try {
        const { id } = req.user;
        const newCart = new CartModel({ ...req.body, user: id });
        const doc = await newCart.save();
        const result = await doc.populate("product");

        // console.log(newProduct)
        res.status(201).json(result)
    } catch (error) {
        console.log("Feetching Error", error)
        res.status(501).json({ success: false, message: "Failed to Add Product in Cart" })
    }
}
const fetchCartByUser = async (req, res) => {

    try {
        const { id } = req.user;
        const cart = await CartModel.find({ user: id }).populate("product")
      
        res.status(201).json(cart)
    } catch (error) {
        console.log("Feetching Error", error)
        res.status(501).json({ success: false, message: "Failed to Cart" })
    }
}
const updateCartById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCart = await CartModel.findByIdAndUpdate(id, req.body, { new: true }).populate("product")
        res.status(201).json(updatedCart)
    } catch (error) {
        console.log("Feetching Error", error)
        res.status(501).json({ success: false, message: "Failed to Update QTy in Cart" })
    }
}
const deleteItemCartById = async (req, res) => {
    try {
        const { id } = req.params;
        await CartModel.findByIdAndDelete(id)

        res.status(201).json("Item Deleted successfully")
    } catch (error) {
        console.log("Feetching Error", error)
        res.status(501).json({ success: false, message: "Failed to Update QTy in Cart" })
    }
}
module.exports = { addCartController, fetchCartByUser, updateCartById, deleteItemCartById }
