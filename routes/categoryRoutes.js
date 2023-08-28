const express = require("express");
const { addCategoryController, fetchAllCategoryController } = require("../controller/categoryController");
const router = express.Router();

router.post("/", addCategoryController);
router.get("/", fetchAllCategoryController);





module.exports = router;