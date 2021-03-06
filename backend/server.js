import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import 'colors';
import morgan from 'morgan';
/* eslint-disable */
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

/* eslint-disable */
dotenv.config();

connectDB();

// initialize express with a variable called 'app'
const app = express();

if (process.env.NODE_ENV === 'development') {
  // Using Morgan middleware to log http request
  app.use(morgan('dev'))
}

app.use(express.urlencoded({ extended: false }));
// it allows us to accept JSON in the body
app.use(express.json());
// '__dirname' points to current directory. But It is only available with commonJS not ES modules.
// This is the work around.

// Setting the endpoint
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// PayPal client id is stored in a the .env file.
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

const __dirname = path.resolve()

// We are making the the 'upload' folder static and accessible
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html')));
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold,
  ),
);
