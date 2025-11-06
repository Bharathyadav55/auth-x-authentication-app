import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error('❌ MONGODB_URI is not defined in .env file');
    }

    console.log('Connecting to MongoDB...');
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Database connected successfully');
    console.log(`✅ Connected to: ${mongoose.connection.host}`);
    
  } catch (error) {
    console.error('❌ Error in connecting with database:', error.message);
    process.exit(1);
  }
};
