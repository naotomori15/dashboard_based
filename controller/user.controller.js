const User = require('../mongodb/models/user.js');
module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({}).limit(req.query._end);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  createUser: async (req, res) => {
    try {
      const { name, email, avatar } = req.body;
      const userExist = await User.findOne({ email });
      if (userExist) return res.status(200).json(userExist);

      const newUser = await User.create({
        name,
        email,
        avatar,
      });
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getUserInfoByID: async (req, res) => {
    try {
      const { id } = req.params;
      const users = await User.findOne({ _id: id }).populate('allProducts');
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ msg: 'Users Not Found' });
      }
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};
