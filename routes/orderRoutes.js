const express = require("express");
const { addOrderController, fetchOrdertByUser, updateOrderById, deleteItemOrderById, fetchAllOrdersController } = require("../controller/orderController");

const router = express.Router();

router.post("/", addOrderController);
router.get("/own", fetchOrdertByUser);
router.get("/", fetchAllOrdersController);
router.put("/:id", updateOrderById);
router.delete("/:id", deleteItemOrderById);

module.exports = router;