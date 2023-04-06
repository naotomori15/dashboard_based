const mongoose = require('mongoose');

const GamblingSchema = new mongoose.Schema({
  isGambling: {
    type: Boolean,
    default: false,
    required: true,
  },
  photo: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Gambling', GamblingSchema);
