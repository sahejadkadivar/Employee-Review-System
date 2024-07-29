// importing necessary modules
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve('config/.env') });

// Handle Mongoose deprecation warning for `strictQuery`
mongoose.set('strictQuery', false);

// Connect to the MongoDB database using the environment variable or local database as a fallback
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/employee_review_system';

// console.log('MongoDB URI:', mongoURI); // Add this line to check the URI is correct or not for connecting cloud database

if (!mongoURI) {
    throw new Error('The MongoDB URI is not defined.');
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connecting to MongoDB'));

db.once('open', function () {
    console.log('Connected to Database :: MongoDB');
});

export default mongoose;
