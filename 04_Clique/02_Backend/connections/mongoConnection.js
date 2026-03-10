const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './.env.dev' });

const mongoURI = process.env.MONGO_URI || process.env.MONGO_URI;

mongoose.connect(mongoURI)
.then(() => console.log(`MongoDB connected successfully to MONGO DB: ${process.env.DB}`))
.catch(err => console.error('MongoDB connection error:', err));