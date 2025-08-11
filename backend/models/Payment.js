import mongoose from 'mongoose';
const paymentSchema = new mongoose.Schema({
  rental: { type: mongoose.Schema.Types.ObjectId, ref: "Rental", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  paymentMethod: { type: String, enum: ["card", "upi", "paypal", "cash"], required: true },
  paymentStatus: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
});

export default mongoose.model("Payment", paymentSchema);
