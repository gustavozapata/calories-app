const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  taken: {
    type: Date,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
});

module.exports = Food = mongoose.model("Food", foodSchema);
