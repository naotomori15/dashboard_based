const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  allProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  allAbouts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'About',
    },
  ],
  allHeros: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hero',
    },
  ],
});
module.exports = mongoose.model('User', UsersSchema);
