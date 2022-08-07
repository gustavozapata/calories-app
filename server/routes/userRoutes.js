const express = require("express");
const userController = require("../controllers/userController.js");
const router = express.Router();

router.route("/:id/calorieLimit").patch(userController.updateCalorieLimit);

module.exports = router;
