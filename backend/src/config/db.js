const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    await mongoose.connect(mongoURI);
    console.log("MongoDB Atlas connected successfully");
  } catch (error) {
    console.log("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;