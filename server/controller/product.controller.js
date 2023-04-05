const User = require('../mongodb/models/user.js');
const Products = require('../mongodb/models/product.js');
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
  getAllProducts: async (req, res) => {
    const { _end, _order, _start, _sort, title_like = '' } = req.query;
    const query = {};
    if (title_like) {
      query.title = { $regex: title_like, $options: 'i' };
    }

    try {
      const count = await Products.countDocuments({ query });
      const products = await Products.find(query)
        .limit(_end)
        .skip(_start)
        .sort({ [_sort]: _order });

      res.header('x-total-count', count);
      res.header('Access-Control-Expose-Headers', 'x-total-count');
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getProductsDetails: async (req, res) => {
    const { id } = req.params;
    const productExist = await Products.findOne({ _id: id }).populate(
      'creator'
    );
    if (productExist) {
      res.status(200).json(productExist);
    } else {
      res.status(500).json({ msg: 'Product Not Found' });
    }
  },
  createProducts: async (req, res) => {
    try {
      const { title, description, photo, email } = req.body;
      // Start a new session...
      const session = await mongoose.startSession();
      session.startTransaction();
      const user = await User.findOne({ email }).session(session);
      if (!user) throw new Error('Users not found');

      const photoUrl = await cloudinary.uploader.upload(photo, {
        folder: 'sneaker_db',
      });

      const newProduct = await Products.create({
        title,
        description,
        photo: photoUrl.url,
        creator: user._id,
      });

      user.allProducts.push(newProduct._id);
      await user.save({ session });

      await session.commitTransaction();

      res.status(200).json({ msg: 'Products successfull created' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  updateProducts: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, photo } = req.body;

      const photoUrl = await cloudinary.uploader.upload(photo);
      await Products.findByIdAndUpdate(
        { _id: id },
        {
          title,
          description,
          photo: photoUrl.url || photo,
        }
      );
      res.status(200).json({ msg: 'Sucess Update Product' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  deleteProducs: async (req, res) => {
    try {
      const { id } = req.params;
      const productToDelete = await Products.findById({ _id: id }).populate(
        'creator'
      );
      if (!productToDelete) throw new Error('Product Not Found');
      const session = await mongoose.startSession();
      session.startTransaction();

      productToDelete.remove({ session });
      productToDelete.creator.allProducts.pull(productToDelete);

      await productToDelete.creator.save({ session });
      await session.commitTransaction();
      res.status(200).json({ msg: 'Product Delete Successfully' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};
