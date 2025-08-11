import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function ConfirmRentalForm() {
  const [pickupDate, setPickupDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  const product = {
    name: "Camera Lens",
    quantity: 2,
    price: 500,
    tax: 50,
    discount: 0
  };

  const total = product.price * product.quantity + product.tax - product.discount;

  const handleConfirm = () => {
    alert(`Order confirmed with ${paymentMethod}!`);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 2 }}>
        <Card>
          <CardHeader title="Confirm Rental Order" />
          <CardContent>
            {/* Order Summary */}
            <Typography variant="h6" sx={{ mb: 2 }}>
              Order Summary
            </Typography>
            <Typography>Product: {product.name}</Typography>
            <Typography>Quantity: {product.quantity}</Typography>
            <Typography>Price: ₹{product.price}</Typography>
            <Typography>Tax: ₹{product.tax}</Typography>
            <Typography>Discount: ₹{product.discount}</Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>
              Total: ₹{total}
            </Typography>

            {/* Date Pickers */}
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} md={6}>
                <DateTimePicker
                  label="Pickup Date & Time"
                  value={pickupDate}
                  onChange={(newValue) => setPickupDate(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DateTimePicker
                  label="Return Date & Time"
                  value={returnDate}
                  onChange={(newValue) => setReturnDate(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
            </Grid>

            {/* Payment Method */}
            <Typography variant="h6" sx={{ mt: 3 }}>
              Payment Method
            </Typography>
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="razorpay"
                control={<Radio />}
                label="Razorpay"
              />
              <FormControlLabel
                value="stripe"
                control={<Radio />}
                label="Stripe"
              />
              <FormControlLabel
                value="paypal"
                control={<Radio />}
                label="PayPal"
              />
            </RadioGroup>

            {/* Buttons */}
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleConfirm}
                >
                  Confirm & Pay
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="error">
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </LocalizationProvider>
  );
}