import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const DeliveryPage = () => {
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [invoiceAddress, setInvoiceAddress] = useState("");
  const [sameAsDelivery, setSameAsDelivery] = useState(true);
  const [deliveryMethod, setDeliveryMethod] = useState("free");
  const [coupon, setCoupon] = useState("");

  // Example prices
  const subtotal = 1000;
  const deliveryCharges = deliveryMethod === "free" ? 0 : 50;
  const taxes = 0; // can calculate GST if needed
  const total = subtotal + deliveryCharges + taxes;
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate("/payment")
  };

  return (
    <Container sx={{ mt: 4 }}>
      {/* Breadcrumb */}
      <Typography variant="subtitle1" gutterBottom>
        Review Order &gt; <b>Delivery</b> &gt; Payment
      </Typography>

      <Grid container spacing={3}>
        {/* Left Side - Address & Delivery Method */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Delivery Address
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Enter delivery address"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              sx={{ mb: 2 }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={sameAsDelivery}
                  onChange={(e) => {
                    setSameAsDelivery(e.target.checked);
                    if (e.target.checked) setInvoiceAddress(deliveryAddress);
                  }}
                />
              }
              label="Billing address same as delivery address"
            />

            {!sameAsDelivery && (
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Enter billing/invoice address"
                value={invoiceAddress}
                onChange={(e) => setInvoiceAddress(e.target.value)}
                sx={{ mt: 2 }}
              />
            )}
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Delivery Method
            </Typography>
            <Select
              fullWidth
              value={deliveryMethod}
              onChange={(e) => setDeliveryMethod(e.target.value)}
            >
              <MenuItem value="free">Standard Delivery - ₹0</MenuItem>
              <MenuItem value="express">Express Delivery - ₹50</MenuItem>
            </Select>
          </Paper>
        </Grid>

        {/* Right Side - Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Items (3)</Typography>
              <Typography>₹{subtotal.toFixed(2)}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Delivery Charges</Typography>
              <Typography>
                {deliveryCharges === 0 ? "Free" : `₹${deliveryCharges}`}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Taxes</Typography>
              <Typography>₹{taxes.toFixed(2)}</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                Total
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                ₹{total.toFixed(2)}
              </Typography>
            </Box>

            {/* Coupon */}
            <TextField
              fullWidth
              placeholder="Enter coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              sx={{ mb: 1 }}
            />
            <Button fullWidth variant="outlined" sx={{ mb: 2 }}>
              Apply
            </Button>

            {/* Action Buttons */}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleConfirm}
              sx={{ mb: 1 }}
            >
              Confirm
            </Button>
            <Button fullWidth variant="text" color="secondary">
              Back to Cart
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DeliveryPage;
