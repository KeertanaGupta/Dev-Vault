// We are using the new ES-Module 'import' syntax
import mongoose from 'mongoose';

// This is an asynchronous function to connect to our database.
// "async" means it will run in the background without blocking the rest of the app.
const connectDB = async () => {
  try {
    // We try to connect to the database using the MONGODB_URI from our .env file
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    // If the connection is successful, we log it to the console.
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If there's an error, we log the error and...
    console.error(`Error: ${error.message}`);
    // ...exit the whole application. If we can't talk to the DB, our app is useless.
    process.exit(1);
  }
};

// We export the function so we can use it in server.js
export default connectDB;