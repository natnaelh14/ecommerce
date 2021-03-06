import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://localhost/3001',
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        // useCreateIndex: true,
      },
    );
/* eslint-disable */
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};
/* eslint-disable */
export default connectDB;
