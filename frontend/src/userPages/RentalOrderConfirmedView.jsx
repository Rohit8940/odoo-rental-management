import React from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Divider } from "@mui/material";

export default function RentalOrderConfirmedView({ order }) {

  if (!order) {
    return (
      <Box p={3} textAlign="center">
        <Typography variant="h6">No order details available.</Typography>
      </Box>
    );
  }

  const { customer, rentalStartDate, rentalEndDate, products, totalDays, payment } = order;

  const totalPrice = products.reduce(
    (acc, p) => acc + p.pricePerDay * p.quantity * totalDays,
    0
  );

  const maskedCardNumber = payment?.cardNumber
    ? "**** **** **** " + payment.cardNumber.slice(-4)
    : "N/A";

  return (
    <Box maxWidth={700} mx="auto" p={3}>
      <Typography variant="h4" gutterBottom color="primary">
        Rental Order Confirmed
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Thank you, your rental order has been successfully placed.
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Rental Period
      </Typography>
      <Typography>
        <strong>From:</strong> {new Date(rentalStartDate).toLocaleDateString()}
      </Typography>
      <Typography>
        <strong>To:</strong> {new Date(rentalEndDate).toLocaleDateString()}
      </Typography>
      <Typography>
        <strong>Total Days:</strong> {totalDays}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Products Rented
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 2 }}>
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
            {products.map(({ id, name, quantity, pricePerDay }) => (
              <TableRow key={id}>
                <TableCell>{name}</TableCell>
                <TableCell align="right">{quantity}</TableCell>
                <TableCell align="right">${pricePerDay}</TableCell>
                <TableCell align="right">${(pricePerDay * quantity * totalDays).toFixed(2)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} align="right"><strong>Total Price</strong></TableCell>
              <TableCell align="right"><strong>${totalPrice.toFixed(2)}</strong></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Delivery Information
      </Typography>
      <Typography>{customer.fullName}</Typography>
      <Typography>
        {customer.address}, {customer.city} - {customer.postalCode}
      </Typography>
      <Typography>Phone: {customer.phone}</Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Payment Information
      </Typography>
      <Typography>Name on Card: {payment.cardName}</Typography>
      <Typography>Card Number: {maskedCardNumber}</Typography>
    </Box>
  );
}