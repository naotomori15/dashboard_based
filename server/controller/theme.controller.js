const Theme = require('../mongodb/models/theme.js');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
module.exports = {
  getAllThemes: async (req, res) => {
    try {
      const themes = await Theme.find();

      res.status(200).json(themes);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getDetailsThemes: async (req, res) => {
    const { id } = req.params;
    const themeExist = await Theme.findOne({ _id: id });
    if (themeExist) {
      res.status(200).json(themeExist);
    } else {
      res.status(500).json({ msg: 'Theme Not Found' });
    }
  },
  createThemes: async (req, res) => {
    try {
      const { firstColor, secondColor } = req.body;
      // Start a new session...
      const session = await mongoose.startSession();
      session.startTransaction();
      await Theme.create({
        firstColor,
        secondColor,
      });

      await session.commitTransaction();

      res.status(200).json({ msg: 'Themes successfull created' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  editThemes: async (req, res) => {
    try {
      const { id } = req.params;
      const { firstColor, secondColor } = req.body;

      await Theme.findByIdAndUpdate(
        { _id: id },
        {
          firstColor,
          secondColor,
        }
      );
      res.status(200).json({ msg: 'Sucess Update Themes' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};
