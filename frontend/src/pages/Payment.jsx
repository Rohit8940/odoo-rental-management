// Payment.jsx
import React, { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";

export default function Payment({ onBack, onConfirm }) {
  const [form, setForm] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Normally validate & send payment info here
    onConfirm();
  };

  return (
    <Box p={3} maxWidth={600} mx="auto">
      <Typography variant="h5" gutterBottom>Payment Details</Typography>

      <form onSubmit={handleSubmit} noValidate>
        <TextField
          label="Name on Card"
          name="cardName"
          value={form.cardName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Card Number"
          name="cardNumber"
          value={form.cardNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          inputProps={{ maxLength: 16 }}
        />
        <TextField
          label="Expiry Date (MM/YY)"
          name="expiryDate"
          value={form.expiryDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          placeholder="MM/YY"
        />
        <TextField
          label="CVV"
          name="cvv"
          value={form.cvv}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          inputProps={{ maxLength: 3 }}
          type="password"
        />

        <Box mt={3} display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={onBack}>Back to Delivery</Button>
          <Button type="submit" variant="contained" color="primary">Confirm Payment</Button>
        </Box>
      </form>
    </Box>
  );
}