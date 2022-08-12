const User = require("../models/userModel");
const Food = require("../models/foodModel");

exports.getFoods = async (req, res) => {
  let foods = [];
  let users = [];
  if (req.user.role === "admin") {
    foods = await Food.find().sort({ date: -1 });
    users = await User.find().select(["-password", "-__v"]);
    foods.push({
      name: "",
      date: new Date(),
      users: users.filter((user) =>
        foods.every(
          (food) => food.user.name !== user.name && user.role !== "admin"
        )
      ),
    });
  } else {
    foods = await Food.find({ user: req.params.userId }).sort({ date: -1 });
  }
  res.status(200).json({
    status: "success",
    data: foods,
  });
};

exports.createFood = async (req, res) => {
  const newFood = await Food.create(req.body);
  res.status(201).json({
    status: "success",
    data: newFood,
  });
};

exports.editFood = async (req, res) => {
  const food = await Food.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
  });
  res.status(200).json({
    status: "success",
    data: food,
  });
};

exports.deleteFood = async (req, res) => {
  await Food.findByIdAndDelete(req.params.userId);
  res.status(204).json({
    status: "success",
    data: req.params.id,
  });
};
