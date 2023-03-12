var mongoose = require('mongoose');
var seeder = require('mongoose-seed');

seeder.connect(
  'mongodb+srv://dulabdul:dulabdul1521@cluster0.n8sczaa.mongodb.net/carmania_db?retryWrites=true&w=majority',
  function () {
    // Load Mongoose models
    seeder.loadModels(['./mongodb/models/Property', './mongodb/models/User']);

    // Clear specified collections
    seeder.clearModels(['Property', 'User'], function () {
      // Callback to populate DB once collections have been cleared
      seeder.populateModels(data, function () {
        seeder.disconnect();
      });
    });
  }
);

var data = [
  {
    model: 'Property',
    documents: [
      {
        //Grand Palace
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902222'),
        title: 'Grand Palace',
        description:
          ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. In fuga eaque tenetur suscipit neque, molestias autem, ab recusandae vel earum rerum non officia, dignissimos ratione!',
        propertyType: 'apartement',
        location: 'jakarta',
        price: 200,
        photo:
          'https://res.cloudinary.com/di8zdyqjp/image/upload/v1678138303/if1ie9e9stmqzhipxl9k.jpg',
        creator: mongoose.Types.ObjectId('6406759d057db383eaa66eb3'),
      },
      {
        //Sunter palace
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902223'),
        title: 'Sunter Palace',
        description:
          ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. In fuga eaque tenetur suscipit neque, molestias autem, ab recusandae vel earum rerum non officia, dignissimos ratione!',
        propertyType: 'villa',
        location: 'bandung',
        price: 240,
        photo:
          'https://res.cloudinary.com/di8zdyqjp/image/upload/v1678138282/yve5u07gryaabjkgewox.jpg',
        creator: mongoose.Types.ObjectId('6406759d057db383eaa66eb3'),
      },
      {
        //Grand Palm Residence
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902224'),
        title: 'Grand Palm Residence',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. In fuga eaque tenetur suscipit neque, molestias autem, ab recusandae vel earum rerum non officia, dignissimos ratione!',
        propertyType: 'apartement',
        location: 'yogyakarta',
        price: 150,
        photo:
          'https://res.cloudinary.com/di8zdyqjp/image/upload/v1678138252/czf1j7z91u7thvssibgl.jpg',
        creator: mongoose.Types.ObjectId('6406759d057db383eaa66eb3'),
      },
      {
        //Pacific Place
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902225'),
        title: 'Pacific Place',
        description:
          ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. In fuga eaque tenetur suscipit neque, molestias autem, ab recusandae vel earum rerum non officia, dignissimos ratione!',
        propertyType: 'apartement',
        location: 'serang',
        price: 300,
        photo:
          'https://res.cloudinary.com/di8zdyqjp/image/upload/v1678137759/apunig8xgyidydugygks.jpg',
        creator: mongoose.Types.ObjectId('6406759d057db383eaa66eb3'),
      },
      {
        //OYO Makota
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902204'),
        title: 'OYO Makota',
        description:
          ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. In fuga eaque tenetur suscipit neque, molestias autem, ab recusandae vel earum rerum non officia, dignissimos ratione!',
        propertyType: 'condos',
        location: 'yogyakarta',
        price: 200,
        photo:
          'https://res.cloudinary.com/di8zdyqjp/image/upload/v1678137555/gwghkgwqkm38edhkbdup.jpg',
        creator: mongoose.Types.ObjectId('6406759d057db383eaa66eb3'),
      },
      {
        //Ritz Carlton Indonesia
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902227'),
        title: 'Ritz Carlton Indonesia',
        description:
          ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. In fuga eaque tenetur suscipit neque, molestias autem, ab recusandae vel earum rerum non officia, dignissimos ratione!',
        propertyType: 'villa',
        location: 'bandung',
        price: 220,
        photo:
          'https://res.cloudinary.com/di8zdyqjp/image/upload/v1678136779/q3zpnszgxrnwh9c6s7x1.jpg',
        creator: mongoose.Types.ObjectId('6406759d057db383eaa66eb3'),
      },
      {
        //Grand Sunter
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902228'),
        title: 'Grand Sunter',
        description:
          ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. In fuga eaque tenetur suscipit neque, molestias autem, ab recusandae vel earum rerum non officia, dignissimos ratione!',
        propertyType: 'apartement',
        location: 'solo',
        price: 120,
        photo:
          'https://res.cloudinary.com/di8zdyqjp/image/upload/v1678136346/dtiy4b6ruhxiovdyiqpb.jpg',
        creator: mongoose.Types.ObjectId('6406759d057db383eaa66eb3'),
      },
      {
        //Puri Residence
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902229'),
        title: 'Puri Residence',
        description:
          ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. In fuga eaque tenetur suscipit neque, molestias autem, ab recusandae vel earum rerum non officia, dignissimos ratione!',
        propertyType: 'apartement',
        location: 'duplex',
        price: 100,
        photo:
          'https://res.cloudinary.com/di8zdyqjp/image/upload/v1678139367/ralph-ravi-kayden-2d4lAQAlbDA-unsplash_1_kmeprr.jpg',
        creator: mongoose.Types.ObjectId('6406759d057db383eaa66eb3'),
      },
      {
        //Town Apartement
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902201'),
        title: 'Town Apartement',
        description:
          ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. In fuga eaque tenetur suscipit neque, molestias autem, ab recusandae vel earum rerum non officia, dignissimos ratione!',
        propertyType: 'apartement',
        location: 'bandung',
        price: 200,
        photo:
          'https://res.cloudinary.com/di8zdyqjp/image/upload/v1678138303/if1ie9e9stmqzhipxl9k.jpg',
        creator: mongoose.Types.ObjectId('6406759d057db383eaa66eb3'),
      },
      {
        //Pixie Villa
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902202'),
        title: 'Pixie Vila',
        description:
          ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. In fuga eaque tenetur suscipit neque, molestias autem, ab recusandae vel earum rerum non officia, dignissimos ratione!',
        propertyType: 'villa',
        location: 'bogor',
        price: 350,
        photo:
          'https://res.cloudinary.com/di8zdyqjp/image/upload/v1678138189/fdihuzxh57197u6mjecr.jpg',
        creator: mongoose.Types.ObjectId('6406759d057db383eaa66eb3'),
      },
      {
        //Airy Indonesia
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902203'),
        title: 'Airy Indonesia',
        description:
          ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. In fuga eaque tenetur suscipit neque, molestias autem, ab recusandae vel earum rerum non officia, dignissimos ratione!',
        propertyType: 'condos',
        location: 'jakarta',
        price: 120,
        photo:
          'https://res.cloudinary.com/di8zdyqjp/image/upload/v1678138104/tcluc4ldcn2x12z5ubzu.jpg',
        creator: mongoose.Types.ObjectId('6406759d057db383eaa66eb3'),
      },
    ],
  },
  {
    model: 'User',
    documents: [
      {
        _id: mongoose.Types.ObjectId('6406759d057db383eaa66eb3'),
        name: 'Abdul Rahman',
        email: 'dul.abdoel21@gmail.com',
        avatar:
          'https://lh3.googleusercontent.com/a/AGNmyxbUwsGOnYcyiWGSJnFU2bKeX2WPasqELQ9VM8PSkw=s96-c',
        allProperties: [
          {
            _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902222'),
          },
          {
            _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902223'),
          },
          {
            _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902224'),
          },
          {
            _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902225'),
          },
          {
            _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902204'),
          },
          {
            _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902227'),
          },
          {
            _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902228'),
          },
          {
            _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902229'),
          },
          {
            _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902201'),
          },
          {
            _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902202'),
          },
          {
            _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902203'),
          },
        ],
      },
    ],
  },
];
