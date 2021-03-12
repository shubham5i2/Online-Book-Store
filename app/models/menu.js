const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Menu", menuSchema);
