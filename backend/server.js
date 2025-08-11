// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authMiddleware from './middleware/authMiddleware.js';

import authRoutes from './routes/authRoutes.js';
// import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
// import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import { addToCart } from './controllers/cartController.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);        // Signup/Login
// app.use('/api/users', userRoutes);       // Insert/View users
app.use('/api/products', productRoutes); // Insert/View products
// app.use('/api/orders', orderRoutes);     // Insert/View orders
app.use('/api/payments', paymentRoutes); // Insert/View payments
app.post('/api/cart/add', authMiddleware, addToCart);

// MongoDB connect
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => console.error(err));
