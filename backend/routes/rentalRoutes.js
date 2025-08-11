import express from 'express';
import Rental from '../models/Rental.js';

const router = express.Router();

// Create a rental
router.post('/', async (req, res) => {
  try {
    const rental = new Rental(req.body);
    await rental.save();
    res.json(rental);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
