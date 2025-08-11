import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  imageUrl: { type: String },
  pricePerDay: { type: Number, required: true },

  // Who owns this product (rental owner)
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  // Availability
  available: { type: Boolean, default: true },
  
  // Fields visible in UI
  pricePerUnit: { type: Number }, // For "₹500 / per unit" display
  totalPrice: { type: Number }, // For "₹ 1000" display
  
  // Date range selection (From/To dates in UI)
  availableFrom: { type: Date },
  availableTo: { type: Date },
  
  // Terms & conditions section in UI
  terms: { type: String },
  
  // Wishlist functionality (Add to wish list button)
  wishlistedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Product", productSchema);
