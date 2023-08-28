const express = require("express");
const { addBrandController, fetchAllBrandController } = require("../controller/brandControllers");

const router = express.Router();

router.post("/", addBrandController);
router.get("/", fetchAllBrandController);

module.exports = router;