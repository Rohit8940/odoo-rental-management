import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Your User model

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized, no token provided' });
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET; // Your JWT secret key

    // Verify token
    const decoded = jwt.verify(token, secret);

    // Attach user info to request
    // Option 1: Just attach user id from token payload
    req.user = { _id: decoded.userId };

    // Option 2: If you want full user from DB:
    // const user = await User.findById(decoded.userId);
    // if (!user) return res.status(401).json({ error: 'User not found' });
    // req.user = user;

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ error: 'Unauthorized, invalid token' });
  }
};

export default authMiddleware;
