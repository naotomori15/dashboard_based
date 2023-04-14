const mongoose = require('mongoose');

const ThemeSchema = new mongoose.Schema({
  firstColor: {
    type: String,
    required: true,
  },
  secondColor: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Theme', ThemeSchema);
