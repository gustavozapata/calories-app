const Food = require("../models/foodModel");

exports.getFoods = async (req, res) => {
  let foods = [];
  if (req.user.role === "admin") {
    foods = await Food.find();
  } else {
    foods = await Food.find({ user: req.params.userId });
  }
  res.status(200).json({
    status: "success",
    data: foods,
  });
};

exports.createFood = async (req, res) => {
  console.log("req.body", req.body);
  console.log("req.params.userId", req.params.userId);
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
