const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('About', AboutSchema);
