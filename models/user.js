const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      "vegetable",
      "fruit",
      "meat",
      "dairy",
      "grains",
      "baking",
      "snack",
      "beverage"
    ]
  },
  quantity: {
    type: Number,
    required: true
  }
});

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  pantry: [foodSchema]

});

const User = mongoose.model('User', userSchema);

module.exports = User;
