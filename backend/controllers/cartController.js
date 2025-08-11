// controllers/cartController.js
import Cart from '../models/Rental.js';

// Assuming you have user info from auth middleware: req.user._id

export const addToCart = async (req, res) => {
  const customerId = req.user._id;
  const { product, quantity, rentStart, rentEnd, pricePerUnit, appliedCoupon } = req.body;

  try {
    let cart = await Cart.findOne({ customer: customerId, isActive: true });

    if (!cart) {
      cart = new Cart({ customer: customerId, items: [] });
    }

    // Check if product with same date range exists - optional logic
    const existingItemIndex = cart.items.findIndex(item =>
      item.product.equals(product) &&
      item.rentStart.toISOString() === new Date(rentStart).toISOString() &&
      item.rentEnd.toISOString() === new Date(rentEnd).toISOString()
    );

    const totalItemCost = pricePerUnit * quantity;

    if (existingItemIndex >= 0) {
      // Update existing item quantity and cost
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].totalItemCost += totalItemCost;
      cart.items[existingItemIndex].appliedCoupon = appliedCoupon || null;
    } else {
      // Add new item
      cart.items.push({
        product,
        quantity,
        rentStart,
        rentEnd,
        pricePerUnit,
        totalItemCost,
        appliedCoupon: appliedCoupon || null,
      });
    }

    await cart.save();

    res.status(200).json({ message: "Added to cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add to cart" });
  }
};
