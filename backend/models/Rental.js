import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  // Customer who owns this cart
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  
  // Cart items
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 }, // From quantity selector in UI
    
    // Date range from UI (From/To date pickers)
    rentStart: { type: Date, required: true },
    rentEnd: { type: Date, required: true },
    
    // Pricing breakdown as shown in UI
    pricePerUnit: { type: Number, required: true }, // ₹500 / per unit
    totalItemCost: { type: Number, required: true }, // ₹ 1000 (calculated)
    
    // Applied coupon for this item
    appliedCoupon: {
      code: { type: String },
      discount: { type: Number }, // Discount amount or percentage
      discountType: { type: String, enum: ["percentage", "fixed"] }
    },
    
    addedAt: { type: Date, default: Date.now }
  }],
  
  // Cart totals
  subtotal: { type: Number, default: 0 },
  totalDiscount: { type: Number, default: 0 },
  finalTotal: { type: Number, default: 0 },
  
  // Session management
  isActive: { type: Boolean, default: true },
  expiresAt: { type: Date }, // Cart expiration
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Index for efficient cart lookups
cartSchema.index({ customer: 1, isActive: 1 });

// Method to calculate totals
cartSchema.methods.calculateTotals = function() {
  this.subtotal = this.items.reduce((total, item) => total + item.totalItemCost, 0);
  this.totalDiscount = this.items.reduce((total, item) => 
    total + (item.appliedCoupon ? item.appliedCoupon.discount : 0), 0);
  this.finalTotal = this.subtotal - this.totalDiscount;
};

// Pre-save middleware to update totals and timestamp
cartSchema.pre('save', function(next) {
  this.calculateTotals();
  this.updatedAt = new Date();
  next();
});

export default mongoose.model("Cart", cartSchema);