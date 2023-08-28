const express = require("express");
const { fetchUserByIdController, updateUserByIdController } = require("../controller/userController");
const router = express.Router();

router.get("/own", fetchUserByIdController);
router.put("/:id", updateUserByIdController)

module.exports = router;