import mongoose from "mongoose";
import { DB_CONFIG } from "./constants.js";

const connectDB = async () => {
  try {
    // Optimize mongoose connection
    mongoose.set('strictQuery', false);
    
    // Modern Mongoose (v6+) doesn't need useNewUrlParser or useUnifiedTopology
    // They are enabled by default
    const conn = await mongoose.connect(
      process.env.MONGO_URI || DB_CONFIG.URI,
      {
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      }
    );
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`);
    console.error(`   Make sure MongoDB is running or check your MONGO_URI connection string`);
    process.exit(1);
  }
};

// Handle connection events for better error handling
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

export default connectDB;