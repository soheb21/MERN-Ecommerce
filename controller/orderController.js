const OrderModel = require("../model/orderModel");

const addOrderController = async (req, res) => {
    try {
        const newOrder = new OrderModel(req.body);
        const doc = await newOrder.save();
        // const result = await doc.populate("product");

        // console.log(newProduct)
        res.status(201).json(doc)
    } catch (error) {
        console.log("order Error", error)
        res.status(501).json({ success: false, message: "Failed to Add Order" })
    }
}
const fetchOrdertByUser = async (req, res) => {

    try {
        const { id } = req.user;
        const order = await OrderModel.find({ user: id })
        res.status(201).json(order)
    } catch (error) {
        console.log("Feetching Error", error)
        res.status(501).json({ success: false, message: "Failed to fetch Order" })
    }
}
const fetchAllOrdersController = async (req, res) => {
    let query = OrderModel.find({ deleted: { $ne: true } }); //now only fetch the product which is not deleted
    let totalProductsQuery = OrderModel.find({ deleted: { $ne: true } });
    if (req.query._sort && req.query._order) {
        query = query.sort({ [req.query._sort]: req.query._order })
    }
    if (req.query._page && req.query._limit) {
        const pageSize = req.query._limit;
        const page = req.query._page;
        query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }

    try {

        const allOrders = await query.exec();
        const totalDocs = await totalProductsQuery.count().exec();
        res.set('X-Total-Count', totalDocs)
        res.status(201).json(allOrders)
    } catch (error) {
        console.log("Feetching Error", error)
        res.status(501).json({ success: false, message: "Failed to order" })
    }
}
const updateOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedOrder = await OrderModel.findByIdAndUpdate(id, req.body, { new: true }).populate("product")
        res.status(201).json(updatedOrder)
    } catch (error) {
        console.log("Feetching Error", error)
        res.status(501).json({ success: false, message: "Failed to Update Order" })
    }
}
const deleteItemOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        await CartModel.findByIdAndDelete(id)

        res.status(201).json("Order Item Deleted successfully")
    } catch (error) {
        console.log("Feetching Error", error)
        res.status(501).json({ success: false, message: "Failed to delete order" })
    }
}
module.exports = { addOrderController, fetchOrdertByUser, updateOrderById, deleteItemOrderById,fetchAllOrdersController}
