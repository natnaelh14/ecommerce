import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import db from './config/connection.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

async function startServer() {
  dotenv.config();

  //initialize express with a variable called 'app'
  const app = express();

  app.use(express.urlencoded({ extended: false }));
  //it allows us to accept JSON in the body
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('API is running...');
  });

  app.use('/api/products', productRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/orders', orderRoutes);

  //PayPal client id is stored in a the .env file.
  app.get('/api/config/paypal', (req, res) =>
    res.send(process.env.PAYPAL_CLIENT_ID)
  );

  app.use(notFound);

  app.use(errorHandler);

  const PORT = process.env.PORT || 3001;

  db.once('open', () => {
    new Promise((resolve) => app.listen(PORT, resolve));
    console.log(`API server running on port ${PORT}!`.yellow.bold);
    return { app };
  });
}

startServer();
