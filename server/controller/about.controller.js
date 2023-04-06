const User = require('../mongodb/models/user.js');
const About = require('../mongodb/models/about.js');
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
  getAllAbouts: async (req, res) => {
    try {
      const abouts = await About.find();

      res.status(200).json(abouts);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getAboutDetails: async (req, res) => {
    const { id } = req.params;
    const aboutExist = await About.findOne({ _id: id }).populate('creator');
    if (aboutExist) {
      res.status(200).json(aboutExist);
    } else {
      res.status(500).json({ msg: 'About Not Found' });
    }
  },
  createAbout: async (req, res) => {
    try {
      const { description, photo, email } = req.body;
      // Start a new session...
      const session = await mongoose.startSession();
      session.startTransaction();
      const user = await User.findOne({ email }).session(session);
      if (!user) throw new Error('Users not found');

      const photoUrl = await cloudinary.uploader.upload(photo, {
        folder: 'sneaker_db',
      });

      const newAbout = await About.create({
        description,
        photo: photoUrl.url,
        creator: user._id,
      });

      user.allAbouts.push(newAbout._id);
      await user.save({ session });

      await session.commitTransaction();

      res.status(200).json({ msg: 'About successfull created' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  editAbout: async (req, res) => {
    try {
      const { id } = req.params;
      const { description, photo } = req.body;

      const photoUrl = await cloudinary.uploader.upload(photo);
      await About.findByIdAndUpdate(
        { _id: id },
        {
          description,
          photo: photoUrl.url,
        }
      );
      res.status(200).json({ msg: 'Sucess Update About' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  deleteAbout: async (req, res) => {
    try {
      const { id } = req.params;
      const aboutToDelete = await About.findById({ _id: id }).populate(
        'creator'
      );
      if (!aboutToDelete) throw new Error('About Not Found');
      const session = await mongoose.startSession();
      session.startTransaction();

      aboutToDelete.remove({ session });
      aboutToDelete.creator.allAbouts.pull(aboutToDelete);

      await aboutToDelete.creator.save({ session });
      await session.commitTransaction();
      res.status(200).json({ msg: 'About Delete Successfully' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};
