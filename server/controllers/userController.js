const User = require("../models/userModel");

exports.updateCalorieLimit = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  user.calorieLimit = req.body.calorieLimit;
  await user.save();

  res.status(200).json({
    status: "success",
    data: user,
  });
};
