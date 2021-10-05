import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors'
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

//We are doing this because we are not connected to the server from here.
dotenv.config();

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    //retrieving admin user.
    const adminUser = createdUsers[0]._id;
    //mapping over the admin user
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);
    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (e) {
    console.error(`${e}`.red.inverse);
    //exiting with a failure.
    process.exit(1);
  }
}

importData();
