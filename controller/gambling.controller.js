const Gambling = require('../mongodb/models/gambling.js');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
module.exports = {
  getAllGambling: async (req, res) => {
    try {
      const gamblings = await Gambling.find();

      res.status(200).json(gamblings);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getGamblingDetails: async (req, res) => {
    const { id } = req.params;
    const gamblingExist = await Gambling.findOne({ _id: id });
    if (gamblingExist) {
      res.status(200).json(gamblingExist);
    } else {
      res.status(500).json({ msg: 'Gambling Not Found' });
    }
  },
  creataGambling: async (req, res) => {
    try {
      const { isGambling, photo, url } = req.body;
      // Start a new session...
      const session = await mongoose.startSession();
      session.startTransaction();
      const photoUrl = await cloudinary.uploader.upload(photo, {
        folder: 'ads_db',
      });
      await Gambling.create({
        url,
        isGambling,
        photo: photoUrl.url,
      });

      await session.commitTransaction();

      res.status(200).json({ msg: 'Gambling successfull created' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  editGambling: async (req, res) => {
    try {
      const { id } = req.params;
      const { isGambling, url, photo } = req.body;
      const updates = {
        isGambling,
        url,
      };
      if (photo) {
        const photoUrl = await cloudinary.uploader.upload(photo);
        updates.photo = photoUrl.url;
      }

      await Gambling.findByIdAndUpdate(
        { _id: id },
        {
          $set: updates,
        }
      );
      res.status(200).json({ msg: 'Sucess Update Gambling' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};
