import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Avatar,
} from "@mui/material";

export default function RentalOrderConfirmedView({ order }) {
  if (!order) {
    return (
      <Box p={3} textAlign="center">
        <Typography variant="h6">No order details available.</Typography>
      </Box>
    );
  }

  const {
    customer,
    rentalOrderDate,
    orderLines,
    untaxedTotal,
    taxTotal,
    total,
    expiration,
    state,
    terms,
  } = order;

  const rentalStartDate = rentalOrderDate;
  const rentalEndDate = expiration;

  const totalDays =
    rentalStartDate && rentalEndDate
      ? Math.ceil(
          (new Date(rentalEndDate) - new Date(rentalStartDate)) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  const totalPrice = orderLines.reduce((acc, line) => {
    const lineSubtotal = line.unitPrice * line.quantity * totalDays + line.tax;
    return acc + lineSubtotal;
  }, 0);

  return (
    <Box maxWidth={800} mx="auto" p={3}>
      <Typography variant="h4" gutterBottom color="primary">
        Rental Order Confirmed
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Thank you, your rental order has been successfully placed.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Rental Period
      </Typography>
      <Typography>
        <strong>From:</strong>{" "}
        {rentalStartDate
          ? new Date(rentalStartDate).toLocaleDateString()
          : "N/A"}
      </Typography>
      <Typography>
        <strong>To:</strong>{" "}
        {rentalEndDate ? new Date(rentalEndDate).toLocaleDateString() : "N/A"}
      </Typography>
      <Typography>
        <strong>Total Days:</strong> {totalDays || "N/A"}
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Products Rented
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price/Day (₹)</TableCell>
              <TableCell align="right">Subtotal (₹)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderLines.map(
              ({ product, quantity, unitPrice, tax }, index) => (
                <TableRow key={product?._id || index}>
                  <TableCell>
                    {product?.name || "Unknown"}
                    <Typography variant="caption" color="textSecondary" display="block">
                      {product?.description || ""}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {product?.imageUrl ? (
                      <Avatar
                        variant="rounded"
                        src={product.imageUrl}
                        alt={product.name}
                        sx={{ width: 56, height: 56 }}
                      />
                    ) : (
                      <Avatar variant="rounded" sx={{ width: 56, height: 56 }}>
                        N/A
                      </Avatar>
                    )}
                  </TableCell>
                  <TableCell>{product?.category || "N/A"}</TableCell>
                  <TableCell align="right">{quantity}</TableCell>
                  <TableCell align="right">₹{unitPrice.toFixed(2)}</TableCell>
                  <TableCell align="right">
                    ₹{(unitPrice * quantity * totalDays + tax).toFixed(2)}
                  </TableCell>
                </TableRow>
              )
            )}
            <TableRow>
              <TableCell colSpan={5} align="right">
                <strong>Total Price</strong>
              </TableCell>
              <TableCell align="right">
                <strong>₹{totalPrice.toFixed(2)}</strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Delivery Information
      </Typography>
      <Typography>{customer?.fullName || "N/A"}</Typography>
      <Typography>
        {customer?.address || "N/A"},{customer?.city || ""} -{" "}
        {customer?.postalCode || ""}
      </Typography>
      <Typography>Phone: {customer?.phone || "N/A"}</Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Terms & Conditions
      </Typography>
      <Typography whiteSpace="pre-line">{terms || "N/A"}</Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Order Status
      </Typography>
      <Typography sx={{ textTransform: "capitalize" }}>{state}</Typography>
    </Box>
  );
}
