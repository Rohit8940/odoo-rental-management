// src/pages/ReviewOrder.jsx
import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { FavoriteBorder, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ReviewOrder = () => {
  const [cart, setCart] = useState([
    { id: 1, name: "Product Name", price: 0, qty: 1 },
    { id: 2, name: "Product Name", price: 0, qty: 1 },
  ]);
  const [coupon, setCoupon] = useState("");

  const handleQtyChange = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };
  const navigate = useNavigate();

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.03; // Example: 3% tax
  const total = subtotal + tax;

  return (
    <Box p={3}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" sx={{ cursor: "pointer" }}>
          Review Order
        </Link>
        <Typography color="text.primary">Delivery</Typography>
        <Typography color="text.primary">Payment</Typography>
      </Breadcrumbs>

      <Typography variant="h5" color="error" sx={{ mb: 2 }}>
        Order Overview
      </Typography>

      <Box display="flex" gap={3} flexWrap={{ xs: "wrap", md: "nowrap" }}>
        {/* Cart Items */}
        <Box flex={2}>
          {cart.map((item) => (
            <Box
              key={item.id}
              display="flex"
              alignItems="center"
              mb={2}
              p={2}
              sx={{ border: "1px solid #ddd", borderRadius: 2 }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  backgroundColor: "#f0f0f0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 2,
                  mr: 2,
                }}
              >
                📦
              </Box>
              <Box flex={1}>
                <Typography>{item.name}</Typography>
                <Typography>₹{item.price.toFixed(2)}</Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <Button
                    variant="outlined"
                    onClick={() => handleQtyChange(item.id, -1)}
                  >
                    -
                  </Button>
                  <Typography>{item.qty}</Typography>
                  <Button
                    variant="outlined"
                    onClick={() => handleQtyChange(item.id, 1)}
                  >
                    +
                  </Button>
                  <IconButton>
                    <FavoriteBorder />
                  </IconButton>
                  <IconButton onClick={() => handleRemove(item.id)}>
                    <Delete />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Summary */}
        <Box
          flex={1}
          sx={{
            border: "1px solid #ddd",
            borderRadius: 2,
            p: 2,
            height: "fit-content",
          }}
        >
          <Typography sx={{ mb: 1 }}>Delivery Charge: -</Typography>
          <Typography sx={{ mb: 1 }}>Sub Total: ₹{subtotal.toFixed(2)}</Typography>
          <Typography sx={{ mb: 1 }}>Taxes: ₹{tax.toFixed(2)}</Typography>
          <Typography sx={{ mb: 2, borderTop: "1px solid red", pt: 1 }}>
            Total: ₹{total.toFixed(2)}
          </Typography>

          {/* Coupon */}
          <Box display="flex" gap={1} mb={2}>
            <TextField
              placeholder="Coupon Code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              size="small"
              fullWidth
            />
            <Button
              variant="contained"
              sx={{ backgroundColor: "black", color: "white" }}
            >
              Apply
            </Button>
          </Box>

          {/* Checkout */}
          <Button
            variant="contained"
            fullWidth
            onClick={()=>navigate("/delivery")}
            sx={{
              backgroundColor: "pink",
              color: "black",
              fontWeight: "bold",
            }}
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ReviewOrder;
