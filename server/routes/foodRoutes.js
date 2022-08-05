const express = require("express");
const foodController = require("../controllers/foodController.js");
const authController = require("../controllers/authController.js");
const router = express.Router();

router
  .route("/")
  .get(foodController.getFoods)
  .post(authController.restrictTo("admin"), foodController.createFood);
router
  .route("/:id")
  .patch(authController.restrictTo("admin"), foodController.editFood)
  .delete(authController.restrictTo("admin"), foodController.deleteFood);

module.exports = router;
