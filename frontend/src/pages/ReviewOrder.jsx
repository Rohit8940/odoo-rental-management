import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Breadcrumbs,
  Link,
  Card,
  CardContent,
  Divider,
  Alert,
  CircularProgress,
  Grid,
  Chip,
} from "@mui/material";
import { FavoriteBorder, Delete, Add, Remove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ReviewOrder = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [coupon, setCoupon] = useState("");
  const [applyCouponLoading, setApplyCouponLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch cart on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        
        if (!token) {
          setError("Please login to view your cart");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        setCart(response.data.cart);
        setError("");
      } catch (error) {
        console.error("Failed to fetch cart:", error);
        setError("Failed to load cart. Please try again.");
        setCart({ items: [], subtotal: 0, totalDiscount: 0, finalTotal: 0 });
      } finally {
        setLoading(false);
      }
    };
    
    fetchCart();
  }, []);

  // Update quantity
  const handleQtyChange = async (productId, delta) => {
    try {
      const token = localStorage.getItem("token");
      const currentItem = cart.items.find(item => item.product._id === productId);
      const newQuantity = Math.max(1, currentItem.quantity + delta);
      
      const response = await axios.put(
        `http://localhost:5000/api/cart/update-quantity`,
        {
          productId,
          quantity: newQuantity
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      setCart(response.data.cart);
    } catch (error) {
      console.error("Failed to update quantity:", error);
      setError("Failed to update quantity");
    }
  };

  // Remove item from cart
    const handleRemove = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:5000/api/cart/remove/${itemId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      setCart(response.data.cart);
    } catch (error) {
      console.error("Failed to remove item:", error);
      setError("Failed to remove item");
    }
  };

  // Apply coupon function


  // Apply coupon


  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Calculate rental duration
  const getRentalDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading your cart...</Typography>
      </Box>
    );
  }

  return (
    <Box p={3} maxWidth="1200px" mx="auto">
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link 
          underline="hover" 
          color="inherit" 
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/rental-shop")}
        >
          Shop
        </Link>
        <Typography color="primary" fontWeight="bold">Review Order</Typography>
        <Typography color="text.secondary">Delivery</Typography>
        <Typography color="text.secondary">Payment</Typography>
      </Breadcrumbs>

      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        Order Overview
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Cart Items ({cart?.items?.length || 0})
          </Typography>
          
          {!cart?.items?.length ? (
            <Card sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                Your cart is empty
              </Typography>
              <Button 
                variant="contained" 
                sx={{ mt: 2 }}
                onClick={() => navigate("/rental-shop")}
              >
                Continue Shopping
              </Button>
            </Card>
          ) : (
            cart.items.map((item) => (
              <Card key={item.product._id} sx={{ mb: 2, overflow: 'visible' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box display="flex" gap={2}>
                    {/* Product Image */}
                    <Box
                      sx={{
                        width: 120,
                        height: 120,
                        backgroundColor: "#f5f5f5",
                        borderRadius: 2,
                        overflow: 'hidden',
                        flexShrink: 0
                      }}
                    >
                      <img
                        src={item.product.imageUrl || "https://via.placeholder.com/120x120/f0f0f0/666666?text=No+Image"}
                        alt={item.product.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </Box>

                    {/* Product Details */}
                    <Box flex={1}>
                      <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                        {item.product.name}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Category: {item.product.category}
                      </Typography>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                          <strong>Rental Period:</strong>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(item.rentStart)} - {formatDate(item.rentEnd)}
                        </Typography>
                        <Chip 
                          label={`${getRentalDuration(item.rentStart, item.rentEnd)} days`}
                          size="small"
                          variant="outlined"
                          sx={{ mt: 0.5 }}
                        />
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2">
                          Price per day: <strong>₹{item.pricePerUnit.toFixed(2)}</strong>
                        </Typography>
                        <Typography variant="body2">
                          Quantity: <strong>{item.quantity}</strong>
                        </Typography>
                        <Typography variant="h6" color="primary" fontWeight="bold">
                          Total: ₹{item.totalItemCost.toFixed(2)}
                        </Typography>
                      </Box>

                      {/* Applied Coupon */}
                      {item.appliedCoupon && (
                        <Box sx={{ mb: 2 }}>
                          <Chip
                            label={`Coupon: ${item.appliedCoupon.code} - ${item.appliedCoupon.discount}${item.appliedCoupon.discountType === "percentage" ? "%" : "₹"} OFF`}
                            color="success"
                            size="small"
                          />
                        </Box>
                      )}

                      {/* Quantity Controls & Actions */}
                      <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="body2" sx={{ mr: 1 }}>Quantity:</Typography>
                          <IconButton 
                            size="small"
                            onClick={() => handleQtyChange(item.product._id, -1)}
                            disabled={item.quantity <= 1}
                            sx={{ border: '1px solid #ddd' }}
                          >
                            <Remove fontSize="small" />
                          </IconButton>
                          <Typography sx={{ 
                            minWidth: 40, 
                            textAlign: 'center',
                            border: '1px solid #ddd',
                            borderRadius: 1,
                            py: 0.5
                          }}>
                            {item.quantity}
                          </Typography>
                          <IconButton 
                            size="small"
                            onClick={() => handleQtyChange(item.product._id, 1)}
                            sx={{ border: '1px solid #ddd' }}
                          >
                            <Add fontSize="small" />
                          </IconButton>
                        </Box>

                        <IconButton 
                          color="primary"
                          sx={{ border: '1px solid', borderColor: 'primary.main' }}
                        >
                          <FavoriteBorder />
                        </IconButton>
                        
                        <IconButton 
                          color="error"
                          onClick={() => handleRemove(item.product._id)}
                          sx={{ border: '1px solid', borderColor: 'error.main' }}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))
          )}
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Card sx={{ position: 'sticky', top: 20 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                Order Summary
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography>Subtotal:</Typography>
                  <Typography>₹{cart?.subtotal?.toFixed(2) || '0.00'}</Typography>
                </Box>
                
                <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography>Total Discount:</Typography>
                  <Typography color="success.main">
                    -₹{cart?.totalDiscount?.toFixed(2) || '0.00'}
                  </Typography>
                </Box>
                
                <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography>Delivery Charge:</Typography>
                  <Typography color="success.main">FREE</Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6" fontWeight="bold">Total:</Typography>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    ₹{cart?.finalTotal?.toFixed(2) || '0.00'}
                  </Typography>
                </Box>
              </Box>

              {/* Coupon Section */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Have a coupon code?
                </Typography>
                <Box display="flex" gap={1}>
                  <TextField
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                    size="small"
                    fullWidth
                    disabled={applyCouponLoading}
                  />
                  <Button
                    variant="contained"
                    onClick={handleApplyCoupon}
                    disabled={!coupon.trim() || applyCouponLoading}
                    sx={{
                      backgroundColor: "black",
                      color: "white",
                      minWidth: 80,
                      '&:hover': {
                        backgroundColor: "#333"
                      }
                    }}
                  >
                    {applyCouponLoading ? <CircularProgress size={20} /> : "Apply"}
                  </Button>
                </Box>
              </Box>

              {/* Applied Coupons Display */}
              {cart?.items?.some(item => item.appliedCoupon) && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Applied Coupons:
                  </Typography>
                  {cart.items
                    .filter(item => item.appliedCoupon)
                    .map((item, index) => (
                      <Chip
                        key={index}
                        label={`${item.appliedCoupon.code} - ${item.appliedCoupon.discount}${item.appliedCoupon.discountType === "percentage" ? "%" : "₹"} OFF`}
                        color="success"
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))
                  }
                </Box>
              )}

              {/* Checkout Button */}
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={() => navigate("/delivery")}
                disabled={!cart?.items?.length}
                sx={{
                  backgroundColor: "#ff69b4",
                  color: "white",
                  fontWeight: "bold",
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: "#ff1493"
                  },
                  '&:disabled': {
                    backgroundColor: "#ccc"
                  }
                }}
              >
                Proceed to Checkout
              </Button>

              <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block', textAlign: 'center' }}>
                Free delivery • Secure payment • Easy returns
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  // Apply coupon function
  async function handleApplyCoupon() {
    if (!coupon.trim()) return;
    
    try {
      setApplyCouponLoading(true);
      setError("");
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/api/cart/apply-coupon`,
        { couponCode: coupon },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      setCart(response.data.cart);
      setCoupon("");
    } catch (error) {
      console.error("Failed to apply coupon:", error);
      setError(error.response?.data?.message || "Invalid coupon code");
    } finally {
      setApplyCouponLoading(false);
    }
  }
};

export default ReviewOrder;