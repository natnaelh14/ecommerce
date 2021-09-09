import express  from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import db from './config/connection.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

//initialize express with a variable called 'app'
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 3001;

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`.yellow.bold);
  });
});
