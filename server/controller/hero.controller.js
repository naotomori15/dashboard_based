const User = require('../mongodb/models/user.js');
const Hero = require('../mongodb/models/hero.js');
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
  getAllHero: async (req, res) => {
    try {
      const heros = await Hero.find();

      res.status(200).json(heros);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getHeroDetails: async (req, res) => {
    const { id } = req.params;
    const heroExist = await Hero.findOne({ _id: id }).populate('creator');
    if (heroExist) {
      res.status(200).json(heroExist);
    } else {
      res.status(500).json({ msg: 'Hero Not Found' });
    }
  },
  createHero: async (req, res) => {
    try {
      const { title, description, photo, emailUI, telp, email } = req.body;
      // Start a new session...
      const session = await mongoose.startSession();
      session.startTransaction();
      const user = await User.findOne({ email }).session(session);
      if (!user) throw new Error('Users not found');

      const photoUrl = await cloudinary.uploader.upload(photo, {
        folder: 'ads_db',
      });

      const newHero = await Hero.create({
        title,
        description,
        emailUI,
        telp,
        photo: photoUrl.url,
        creator: user._id,
      });

      user.allHeros.push(newHero._id);
      await user.save({ session });

      await session.commitTransaction();

      res.status(200).json({ msg: 'Hero successfull created' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  editHero: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, photo, emailUI, telp } = req.body;

      const photoUrl = await cloudinary.uploader.upload(photo);
      await Hero.findByIdAndUpdate(
        { _id: id },
        {
          title,
          emailUI,
          telp,
          description,
          photo: photoUrl.url || photo,
        }
      );
      res.status(200).json({ msg: 'Sucess Update Hero' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  deleteHero: async (req, res) => {
    try {
      const { id } = req.params;
      const heroToDelete = await Hero.findById({ _id: id }).populate('creator');
      if (!heroToDelete) throw new Error('Hero Not Found');
      const session = await mongoose.startSession();
      session.startTransaction();

      heroToDelete.remove({ session });
      heroToDelete.creator.allHeros.pull(heroToDelete);

      await heroToDelete.creator.save({ session });
      await session.commitTransaction();
      res.status(200).json({ msg: 'About Delete Successfully' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};
