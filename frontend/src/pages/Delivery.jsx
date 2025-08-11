// Delivery.jsx
import React, { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";

export default function Delivery({ onNext, onBack }) {
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Normally validate here & save delivery info to context/store
    onNext();
  };

  return (
    <Box p={3} maxWidth={600} mx="auto">
      <Typography variant="h5" gutterBottom>Delivery Information</Typography>

      <form onSubmit={handleSubmit} noValidate>
        <TextField
          label="Full Name"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Address"
          name="address"
          value={form.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="City"
          name="city"
          value={form.city}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Postal Code"
          name="postalCode"
          value={form.postalCode}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Phone Number"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <Box mt={3} display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={onBack}>Back to Review</Button>
          <Button type="submit" variant="contained" color="primary">Proceed to Payment</Button>
        </Box>
      </form>
    </Box>
  );
}