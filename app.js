const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes')
const mainRouter = require('./routes/mainRoutes')
const cookieParser = require('cookie-parser');
dotenv.config({ path: './config.env' });
const app = express();
const checkUser = require('./middleware/authMiddleware');

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = process.env.DB_URI.replace
  ('<db_password>', process.env.DB_PASSWORD);

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useCreateIndex: true, // to remove deprecation warning
  useUnifiedTopology: true
})
  .then(() => {
    console.log('DB Connection Successful');
  })
  .catch((err) => console.log('DB Connection Error:', err));

  app.get('*', checkUser);
  app.use(authRoutes);
  app.use(mainRouter);
  
  // routes 
  app.listen(3001, () => {
    console.log('Server is running on port 3001');
  });


