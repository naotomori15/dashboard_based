const express = require('express');
const dotenv = require('dotenv');

const cors = require('cors');
const connectDB = require('./mongodb/connect.js');
const userRouter = require('./routes/user.routes.js');
const propertyRoute = require('./routes/property.routes.js');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.get('/', (req, res) => {
  res.send({ message: 'Hello World' });
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/properties', propertyRoute);
const PORT = 8080;
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
startServer();
