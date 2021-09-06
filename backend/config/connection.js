import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        })
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (e) {
        console.error(`Error: ${error.message}`)
    }
    //'1' means that it will exist with failure.
    process.exit(1)
}

export default connectDB;