import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const productsList = [
  { id: 1, name: "Camera", pricePerDay: 50 },
  { id: 2, name: "Tripod", pricePerDay: 30 },
  { id: 3, name: "Lighting Kit", pricePerDay: 40 },
];

export default function RentalOrderFormView() {
  const [products, setProducts] = useState(
    productsList.map((p) => ({ ...p, quantity: 0 }))
  );
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [rentalDays, setRentalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (startDate && endDate) {
      const diffTime = endDate.getTime() - startDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setRentalDays(diffDays > 0 ? diffDays : 0);
    } else {
      setRentalDays(0);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    let total = 0;
    products.forEach(({ pricePerDay, quantity }) => {
      total += pricePerDay * quantity * rentalDays;
    });
    setTotalPrice(total);
  }, [products, rentalDays]);

  const handleQuantityChange = (id, qty) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Validate & send data to backend
    alert(`Order submitted! Total: $${totalPrice}`);
  };

  return (
    <Box maxWidth={700} mx="auto" p={3}>
      <Typography variant="h4" gutterBottom>
        Rental Order Form
      </Typography>

      <form onSubmit={handleSubmit}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container spacing={3}>
            {/* Date pickers */}
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Rental Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                renderInput={(params) => (
                  <TextField {...params} fullWidth required />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Rental End Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                renderInput={(params) => (
                  <TextField {...params} fullWidth required />
                )}
                minDate={startDate || undefined}
              />
            </Grid>

            {/* Product quantity inputs */}
            {products.map(({ id, name, pricePerDay, quantity }) => (
              <Grid item xs={12} sm={6} key={id}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="h6">{name}</Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Price per day: ${pricePerDay}
                  </Typography>
                  <TextField
                    label="Quantity"
                    type="number"
                    inputProps={{ min: 0 }}
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(id, Math.max(0, +e.target.value))
                    }
                    fullWidth
                    required={quantity > 0}
                  />
                </Paper>
              </Grid>
            ))}

            {/* Summary */}
            <Grid item xs={12}>
              <Typography variant="h6">
                Rental Days: {rentalDays > 0 ? rentalDays : "--"}
              </Typography>
              <Typography variant="h5" mt={1}>
                Total Price: ${totalPrice.toFixed(2)}
              </Typography>
            </Grid>

            {/* Submit */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={rentalDays === 0 || totalPrice === 0}
              >
                Submit Order
              </Button>
            </Grid>
          </Grid>
        </LocalizationProvider>
      </form>
    </Box>
  );
}