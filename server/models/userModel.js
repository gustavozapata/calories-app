const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  calorieLimit: {
    type: Number,
    default: function () {
      return this.role === "admin" ? undefined : 2100;
    },
  },
});

module.exports = User = mongoose.model("Users", userSchema);
