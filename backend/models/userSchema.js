import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
  phone: { type: String },
  role:{type:String,enum: ['End User', 'customer'],required:true},

  // List of products they rented (past + active)
  rentedProducts: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      rentStart: { type: Date },
      rentEnd: { type: Date },
      status: { type: String, enum: ["active", "returned"], default: "active" },
    },
  ],

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
