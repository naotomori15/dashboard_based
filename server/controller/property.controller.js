const User = require('../mongodb/models/user.js');
const Property = require('../mongodb/models/property.js');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');
const mongoose = require('mongoose');

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
module.exports = {
  getAllProperties: async (req, res) => {
    const {
      _end,
      _order,
      _start,
      _sort,
      title_like = '',
      location = '',
      propertyType = '',
    } = req.query;
    const query = {};
    if (propertyType !== '') {
      query.propertyType = propertyType;
    }
    if (location !== '') {
      query.location = location;
    }
    if (title_like) {
      query.title = { $regex: title_like, $options: 'i' };
    }

    try {
      const count = await Property.countDocuments({ query });
      const properties = await Property.find(query)
        .limit(_end)
        .skip(_start)
        .sort({ [_sort]: _order });

      res.header('x-total-count', count);
      res.header('Access-Control-Expose-Headers', 'x-total-count');
      res.status(200).json(properties);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getPropertyDetail: async (req, res) => {
    const { id } = req.params;
    const propertyExists = await Property.findOne({ _id: id }).populate(
      'creator'
    );
    if (propertyExists) {
      res.status(200).json(propertyExists);
    } else {
      res.status(500).json({ msg: 'Property Not Found' });
    }
  },
  createProperty: async (req, res) => {
    try {
      const {
        title,
        description,
        propertyType,
        location,
        price,
        photo,
        email,
      } = req.body;
      // Start a new session...
      const session = await mongoose.startSession();
      session.startTransaction();
      const user = await User.findOne({ email }).session(session);
      if (!user) throw new Error('Users not found');

      const photoUrl = await cloudinary.uploader.upload(photo);

      const newProperty = await Property.create({
        title,
        description,
        location,
        price,
        propertyType,
        photo: photoUrl.url,
        creator: user._id,
      });

      user.allProperties.push(newProperty._id);
      await user.save({ session });

      await session.commitTransaction();

      res.status(200).json({ msg: 'Property successfull created' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  updateProperty: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, propertyType, location, price, photo } =
        req.body;

      const photoUrl = await cloudinary.uploader.upload(photo);
      await Property.findByIdAndUpdate(
        { _id: id },
        {
          title,
          description,
          propertyType,
          location,
          price,
          photo: photoUrl.url || photo,
        }
      );
      res.status(200).json({ msg: 'Sucess Update Property' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  deleteProperty: async (req, res) => {
    try {
      const { id } = req.params;
      const propertyToDelete = await Property.findById({ _id: id }).populate();
      if (!propertyToDelete) throw new Error('Property Not Found');
      const session = await mongoose.startSession();
      session.startTransaction();

      propertyToDelete.remove({ session });
      propertyToDelete.creator.allProperties.pull(propertyToDelete);

      await propertyToDelete.creator.save({ session });
      await session.commitTransaction();
      res.status(200).json({ msg: 'Property Delete Successfully' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};
