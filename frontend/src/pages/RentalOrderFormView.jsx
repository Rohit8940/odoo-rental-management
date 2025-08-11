import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Grid
} from "@mui/material";

export default function RentalOrderFormView() {
  // Dummy data
  const order = {
    id: "RENT-0001",
    status: "Draft",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 9876543210"
    },
    products: [
      {
        name: "Camera Lens",
        quantity: 2,
        unit: "Day",
        startDate: "2025-08-15",
        endDate: "2025-08-17",
        price: 500
      },
      {
        name: "Tripod",
        quantity: 1,
        unit: "Day",
        startDate: "2025-08-15",
        endDate: "2025-08-17",
        price: 200
      }
    ]
  };

  const totalPrice = order.products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Box>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Rental Order - {order.id}
          </Typography>
          <Typography variant="body1">Status: {order.status}</Typography>
        </Toolbar>
      </AppBar>

      {/* Customer Info */}
      <Box sx={{ p: 2 }}>
        <Card>
          <CardContent>
            <Typography variant="h6">Customer Details</Typography>
            <Typography>Name: {order.customer.name}</Typography>
            <Typography>Email: {order.customer.email}</Typography>
            <Typography>Phone: {order.customer.phone}</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Product Table */}
      <Box sx={{ p: 2 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Rented Products
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Unit</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.products.map((p, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.quantity}</TableCell>
                    <TableCell>{p.unit}</TableCell>
                    <TableCell>{p.startDate}</TableCell>
                    <TableCell>{p.endDate}</TableCell>
                    <TableCell>₹{p.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Total: ₹{totalPrice}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Action Buttons */}
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item>
          <Button variant="outlined" color="secondary">
            Edit Order
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Confirm Rental
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="error">
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}