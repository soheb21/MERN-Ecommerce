const express = require("express");
const { addCartController, fetchCartByUser, updateCartById, deleteItemCartById } = require("../controller/cartController");

const router = express.Router();

router.post("/", addCartController);
router.get("/", fetchCartByUser);
router.put("/:id",updateCartById);
router.delete("/:id",deleteItemCartById);





module.exports = router;