// ReviewOrder.jsx
import React from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const dummyOrder = {
  items: [
    { id: 1, name: "Camera", qty: 2, price: 50 },
    { id: 2, name: "Tripod", qty: 1, price: 30 },
  ],
  rentalDays: 3,
};

export default function ReviewOrder({ onNext }) {
  const { items, rentalDays } = dummyOrder;

  const subtotal = items.reduce((acc, item) => acc + item.qty * item.price, 0);
  const total = subtotal * rentalDays;

  return (
    <Box p={3} maxWidth={600} mx="auto">
      <Typography variant="h5" gutterBottom>Review Your Order</Typography>

      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price/Day</TableCell>
              <TableCell align="right">Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(({ id, name, qty, price }) => (
              <TableRow key={id}>
                <TableCell>{name}</TableCell>
                <TableCell align="right">{qty}</TableCell>
                <TableCell align="right">${price}</TableCell>
                <TableCell align="right">${qty * price}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} align="right">Rental Days</TableCell>
              <TableCell align="right">{rentalDays}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} align="right"><strong>Total Price</strong></TableCell>
              <TableCell align="right"><strong>${total}</strong></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained" color="primary" onClick={onNext}>
        Proceed to Delivery
      </Button>
    </Box>
  );
}