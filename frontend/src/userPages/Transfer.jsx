import React, { useState } from "react";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  TextField,
  Paper,
  Grid,
} from "@mui/material";

// Sample products and locations (replace with API data)
const productsList = [
  { id: 1, name: "Camera" },
  { id: 2, name: "Tripod" },
  { id: 3, name: "Lighting Kit" },
];

const locationsList = [
  { id: "wh1", name: "Warehouse 1" },
  { id: "wh2", name: "Warehouse 2" },
  { id: "store1", name: "Store 1" },
];

export default function Transfer() {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedFromLocation, setSelectedFromLocation] = useState("");
  const [selectedToLocation, setSelectedToLocation] = useState("");
  const [quantity, setQuantity] = useState("");
  const [transferConfirmed, setTransferConfirmed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !selectedProduct ||
      !selectedFromLocation ||
      !selectedToLocation ||
      !quantity ||
      Number(quantity) <= 0
    ) {
      alert("Please fill all fields with valid values.");
      return;
    }
    if (selectedFromLocation === selectedToLocation) {
      alert("Source and destination locations cannot be the same.");
      return;
    }

    // TODO: Add API call or backend logic here

    setTransferConfirmed(true);
  };

  return (
    <Box maxWidth={600} mx="auto" p={3} component={Paper} elevation={3}>
      <Typography variant="h4" gutterBottom>
        Product Transfer
      </Typography>

      {transferConfirmed ? (
        <Typography color="success.main" variant="h6" mt={2}>
          Transfer successful! {quantity} units of{" "}
          {productsList.find((p) => p.id === Number(selectedProduct))?.name}{" "}
          moved from{" "}
          {
            locationsList.find((l) => l.id === selectedFromLocation)?.name
          } to {locationsList.find((l) => l.id === selectedToLocation)?.name}.
        </Typography>
      ) : (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Product select */}
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="product-label">Select Product</InputLabel>
                <Select
                  labelId="product-label"
                  value={selectedProduct}
                  label="Select Product"
                  onChange={(e) => setSelectedProduct(e.target.value)}
                >
                  {productsList.map((product) => (
                    <MenuItem key={product.id} value={product.id}>
                      {product.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* From location */}
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="from-location-label">From Location</InputLabel>
                <Select
                  labelId="from-location-label"
                  value={selectedFromLocation}
                  label="From Location"
                  onChange={(e) => setSelectedFromLocation(e.target.value)}
                >
                  {locationsList.map((location) => (
                    <MenuItem key={location.id} value={location.id}>
                      {location.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* To location */}
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="to-location-label">To Location</InputLabel>
                <Select
                  labelId="to-location-label"
                  value={selectedToLocation}
                  label="To Location"
                  onChange={(e) => setSelectedToLocation(e.target.value)}
                >
                  {locationsList.map((location) => (
                    <MenuItem key={location.id} value={location.id}>
                      {location.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Quantity */}
            <Grid item xs={12}>
              <TextField
                label="Quantity"
                type="number"
                fullWidth
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                inputProps={{ min: 1 }}
              />
            </Grid>

            {/* Submit */}
            <Grid item xs={12} textAlign="center">
              <Button variant="contained" color="primary" type="submit">
                Confirm Transfer
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Box>
  );
}