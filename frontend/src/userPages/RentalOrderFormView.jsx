import React, { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Paper,
  Grid,
} from "@mui/material";

// Helper function to get user ID from JWT token
function getUserIdFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.id || decoded._id || null;
  } catch (e) {
    console.error("Invalid token", e);
    return null;
  }
}

export default function UserProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    imageUrl: "",
    pricePerDay: "",
    pricePerUnit: "",
    totalPrice: "",
    availableFrom: "",
    availableTo: "",
    terms: "",
  });

  // Fetch products for this user
  const fetchProducts = async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      setProducts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/products/owner/${userId}`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit new product
  const handleSubmit = async () => {
    if (!formData.name || !formData.pricePerDay) {
      alert("Name and Price Per Day are required");
      return;
    }

    try {
      const userId = getUserIdFromToken();
      if (!userId) {
        alert("User not authenticated");
        return;
      }

      const payload = {
        ...formData,
        pricePerDay: Number(formData.pricePerDay),
        pricePerUnit: formData.pricePerUnit ? Number(formData.pricePerUnit) : undefined,
        totalPrice: formData.totalPrice ? Number(formData.totalPrice) : undefined,
        availableFrom: formData.availableFrom ? new Date(formData.availableFrom) : undefined,
        availableTo: formData.availableTo ? new Date(formData.availableTo) : undefined,
        owner: userId,
        available: true,
        createdAt: new Date(),
      };

      await axios.post("http://localhost:5000/api/products", payload);

      // Reset form & close modal
      setFormData({
        name: "",
        description: "",
        category: "",
        imageUrl: "",
        pricePerDay: "",
        pricePerUnit: "",
        totalPrice: "",
        availableFrom: "",
        availableTo: "",
        terms: "",
      });
      setOpenCreateModal(false);
      fetchProducts();
    } catch (err) {
      console.error("Error creating product:", err);
      alert("Failed to create product. See console.");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Your Products
      </Typography>

      <Button variant="contained" onClick={() => setOpenCreateModal(true)} sx={{ mb: 3 }}>
        Create New Product
      </Button>

      {loading ? (
        <Typography>Loading products...</Typography>
      ) : products.length === 0 ? (
        <Typography>No products found for your account.</Typography>
      ) : (
        <Grid container spacing={2}>
          {products.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p._id}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">{p.name}</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Category: {p.category || "N/A"}
                </Typography>
                {p.imageUrl && (
                  <Box
                    component="img"
                    src={p.imageUrl}
                    alt={p.name}
                    sx={{ width: "100%", maxHeight: 150, objectFit: "cover", my: 1 }}
                  />
                )}
                <Typography>Price Per Day: ₹{p.pricePerDay}</Typography>
                <Typography>Description: {p.description || "No description"}</Typography>
                <Typography>Available: {p.available ? "Yes" : "No"}</Typography>
                <Typography>Terms: {p.terms || "N/A"}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Create Product Modal */}
      <Dialog open={openCreateModal} onClose={() => setOpenCreateModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Product</DialogTitle>
        <DialogContent dividers>
          <TextField
            label="Name *"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price Per Day *"
            name="pricePerDay"
            type="number"
            value={formData.pricePerDay}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price Per Unit"
            name="pricePerUnit"
            type="number"
            value={formData.pricePerUnit}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Total Price"
            name="totalPrice"
            type="number"
            value={formData.totalPrice}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Available From"
            name="availableFrom"
            type="date"
            value={formData.availableFrom}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Available To"
            name="availableTo"
            type="date"
            value={formData.availableTo}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Terms & Conditions"
            name="terms"
            value={formData.terms}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            multiline
            rows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Create Product
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
