// src/pages/ProductPage.jsx
import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Breadcrumbs,
  Link,
  MenuItem,
  Select,
} from "@mui/material";
import { ShoppingCart, FavoriteBorder } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [priceOption, setPriceOption] = useState("default");
  const [coupon, setCoupon] = useState("");

  return (
    <Box p={3}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link
          underline="hover"
          color="inherit"
          onClick={() => navigate("/rental-shop")}
          sx={{ cursor: "pointer" }}
        >
          All Products
        </Link>
        <Typography color="text.primary">Product Name</Typography>
      </Breadcrumbs>

      <Box display="flex" gap={4}>
        {/* Left side: Product image & wishlist */}
        <Box flex={1} display="flex" flexDirection="column" alignItems="center">
          <Box
            sx={{
              width: 200,
              height: 200,
              backgroundColor: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
            }}
          >
            📦 {/* Replace with <img src="..." alt="Product" /> */}
          </Box>
          <Button
            variant="outlined"
            startIcon={<FavoriteBorder />}
            sx={{ mt: 2 }}
            onClick={() => console.log("Added to wishlist")}
          >
            Add to Wishlist
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Product descriptions...
          </Typography>
          <Link sx={{ mt: 1, cursor: "pointer" }}>Read More</Link>
        </Box>

        {/* Right side: Product details */}
        <Box flex={2}>
          <Typography variant="h5">Product Name</Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            ₹1000{" "}
            <Typography variant="body2" component="span">
              (₹500 / per unit)
            </Typography>
          </Typography>

          {/* Date range using plain date inputs */}
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Typography>From:</Typography>
            <TextField
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              size="small"
            />
            <Typography>to:</Typography>
            <TextField
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              size="small"
            />
          </Box>

          {/* Quantity & Add to Cart */}
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Button variant="outlined" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              -
            </Button>
            <Typography>{quantity}</Typography>
            <Button variant="outlined" onClick={() => setQuantity(quantity + 1)}>
              +
            </Button>

            <Button
              variant="contained"
              startIcon={<ShoppingCart />}
              onClick={() => console.log("Added to cart")}
            >
              Add to Cart
            </Button>
          </Box>

          {/* Price List Dropdown */}
          <Box mb={2}>
            <Select value={priceOption} onChange={(e) => setPriceOption(e.target.value)}>
              <MenuItem value="default">Price List</MenuItem>
              <MenuItem value="weekly">Weekly Rate</MenuItem>
              <MenuItem value="monthly">Monthly Rate</MenuItem>
            </Select>
          </Box>

          {/* Coupon */}
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <TextField
              placeholder="Coupon Code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              size="small"
            />
            <Button variant="contained" onClick={() => console.log("Coupon applied")}>
              Apply
            </Button>
          </Box>

          {/* Terms & Conditions */}
          <Typography variant="subtitle1">Terms & Conditions</Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            ...
          </Typography>

          {/* Share */}
          <Typography variant="subtitle1">Share:</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductPage;
