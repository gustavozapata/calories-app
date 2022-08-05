const Food = require("../models/foodModel");

exports.getFoods = async (req, res) => {
  const food = await Food.find({});
  res.status(200).json({
    status: "success",
    data: food,
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
  const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    status: "success",
    data: food,
  });
};

exports.deleteFood = async (req, res) => {
  await Food.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: req.params.id,
  });
};
