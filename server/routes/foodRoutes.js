const express = require("express");
const foodController = require("../controllers/foodController.js");
const authController = require("../controllers/authController.js");
const router = express.Router();

router
  .route("/:userId")
  .get(foodController.getFoods)
  .post(foodController.createFood)
  .patch(authController.restrictTo("admin"), foodController.editFood)
  .delete(authController.restrictTo("admin"), foodController.deleteFood);

module.exports = router;
