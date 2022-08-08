const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
});

foodSchema.pre([/^find/, "save"], function (next) {
  this.populate({ path: "user", select: "_id name" });
  next();
});

module.exports = Food = mongoose.model("Food", foodSchema);
