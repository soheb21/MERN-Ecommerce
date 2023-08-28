const express = require("express");

const { fetchAllProductsController, addProductController, fetchProductById, updateProductById, searchProductController } = require("../controller/productsController");
const router = express.Router();

router.post("/", addProductController)
router.get("/", fetchAllProductsController);
router.get("/:id", fetchProductById)
router.post("/search-product",searchProductController)
router.patch("/:id", updateProductById)





module.exports = router;