import mongoose from 'mongoose';
const rentalSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  renter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  rentStart: { type: Date, required: true },
  rentEnd: { type: Date, required: true },
  totalCost: { type: Number, required: true },

  status: { type: String, enum: ["pending", "active", "completed", "cancelled"], default: "pending" },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Rental", rentalSchema);
