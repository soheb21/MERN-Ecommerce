const ProductModel = require("../model/productmodel")


const addProductController = async (req, res) => {
    try {
        const newProduct = new ProductModel(req.body);
        await newProduct.save();
        res.status(201).json({ success: true, message: "product add Successfully" })
    } catch (error) {
        console.log("Fetching Error", error)
        res.status(501).json({ success: false, message: "Failed to Add Product" })
    }
}
const fetchAllProductsController = async (req, res) => {
    let condition = {};
    if (!req.query.admin) {
        condition.deleted = { $ne: true };
    }
    let query = ProductModel.find(condition); //now only fetch the product which is not deleted
    let totalProductsQuery = ProductModel.find(condition);
    if (req.query.category) {
        query = query.find({ category: req.query.category })
        totalProductsQuery = totalProductsQuery.find({ category: req.query.category })
    }
    if (req.query.brand) {
        query = query.find({ brand: req.query.brand })
        totalProductsQuery = totalProductsQuery.find({ brand: req.query.category })

    }
    if (req.query._sort && req.query._order) {
        query = query.sort({ [req.query._sort]: req.query._order })
    }
    if (req.query._page && req.query._limit) {
        const pageSize = req.query._limit;
        const page = req.query._page;
        query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }

    try {

        const allProduct = await query.exec();
        const totalDocs = await totalProductsQuery.count().exec();
        res.set('X-Total-Count', totalDocs)
        res.status(201).json(allProduct)
    } catch (error) {
        console.log("Feetching Error", error)
        res.status(501).json({ success: false, message: "Failed to Add Product" })
    }
}
const fetchProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById(id)
        res.status(201).json(product)
    } catch (error) {
        console.log("Feetching Error", error)
        res.status(501).json({ success: false, message: "Failed to fetch Product" })
    }
}
const updateProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const updateProduct = await ProductModel.findByIdAndUpdate(id, req.body, { new: true }) //new true se jaga pe update dikhta hai.
        res.status(201).json(updateProduct)
    } catch (error) {
        console.log("Feetching Error", error)
        res.status(501).json({ success: false, message: "Failed to update Product" })
    }
}

const searchProductController = async (req, res) => {
    try {
        const {search} = req.body;
        const result = await ProductModel.find({title: { $regex: search, $options: "i" }});
        if (result.length > 0) {
            res.status(201).send(result)
        } else {
            res.status(201).json([])
        }
    } catch (error) {
        console.log("Feetching Error", error)
        res.status(501).json({ success: false, message: "Failed to search Product" })
    }
}
module.exports = { addProductController, fetchAllProductsController, fetchProductById, updateProductById, searchProductController }