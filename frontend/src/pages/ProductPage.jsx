// src/pages/ProductPage.jsx
import React, { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import { ShoppingCart, FavoriteBorder } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // get product id from url params
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [priceOption, setPriceOption] = useState("default");
  const [coupon, setCoupon] = useState("");
  const handleAddToCart = async () => {
  if (!fromDate || !toDate) {
    alert("Please select rental start and end dates.");
    return;
  }
  if (new Date(fromDate) > new Date(toDate)) {
    alert("End date must be after start date.");
    return;
  }

  try {
    const pricePerUnit = product.pricePerDay; // or calculate based on priceOption
    // TODO: Calculate discount based on coupon if needed

    const payload = {
      product: product._id,
      quantity,
      rentStart: fromDate,
      rentEnd: toDate,
      pricePerUnit,
      appliedCoupon: coupon ? { code: coupon, discount: 0, discountType: "fixed" } : null,
    };

    const token = localStorage.getItem("token"); // or however you store auth token

    const response = await axios.post(
      "http://localhost:5000/api/cart/add",
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log(response.data.message);
    alert("Added to cart!");

  } catch (error) {
    console.error("Failed to add to cart:", error);
    alert("Failed to add to cart.");
  }
};


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        console.log(id);
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box p={3} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box p={3} textAlign="center">
        <Typography variant="h6">Product not found.</Typography>
        <Button onClick={() => navigate("/rental-shop")} sx={{ mt: 2 }}>
          Back to Shop
        </Button>
      </Box>
    );
  }

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
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      <Box display="flex" gap={4} flexWrap="wrap">
        {/* Left side: Product image & wishlist */}
        <Box flex={1} display="flex" flexDirection="column" alignItems="center" minWidth={250}>
          <Box
            sx={{
              width: 200,
              height: 200,
              backgroundColor: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <img
              src={product.imageUrl || "https://via.placeholder.com/200"}
              alt={product.name}
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
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
            {product.description || "No description available."}
          </Typography>
          <Link sx={{ mt: 1, cursor: "pointer" }} onClick={() => alert("More details coming soon!")}>
            Read More
          </Link>
        </Box>

        {/* Right side: Product details */}
        <Box flex={2} minWidth={300}>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            ₹{product.pricePerDay.toFixed(2)}{" "}
            <Typography variant="body2" component="span">
              (per day)
            </Typography>
          </Typography>

          {/* Date range using plain date inputs */}
          <Box display="flex" alignItems="center" gap={2} mb={2} flexWrap="wrap">
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
          <Box display="flex" alignItems="center" gap={2} mb={2} flexWrap="wrap">
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
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Box>

          {/* Price List Dropdown */}
          <Box mb={2}>
            <Select value={priceOption} onChange={(e) => setPriceOption(e.target.value)} size="small">
              <MenuItem value="default">Price List</MenuItem>
              <MenuItem value="weekly">Weekly Rate</MenuItem>
              <MenuItem value="monthly">Monthly Rate</MenuItem>
            </Select>
          </Box>

          {/* Coupon */}
          <Box display="flex" alignItems="center" gap={1} mb={2} flexWrap="wrap">
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
            Please read the rental terms carefully before booking.
          </Typography>

          {/* Share */}
          <Typography variant="subtitle1">Share:</Typography>
          {/* Add social share buttons here if needed */}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductPage;
