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
  allProperties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
    },
  ],
});
module.exports = mongoose.model('User', UsersSchema);
