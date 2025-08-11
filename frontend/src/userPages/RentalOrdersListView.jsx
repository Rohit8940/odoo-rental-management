import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Paper,
} from "@mui/material";

const rentalOrders = [
  {
    id: "ORD001",
    customerName: "John Doe",
    rentalStartDate: "2025-08-10",
    rentalEndDate: "2025-08-15",
    totalDays: 6,
    totalPrice: 660,
    status: "Confirmed",
  },
  {
    id: "ORD002",
    customerName: "Jane Smith",
    rentalStartDate: "2025-08-12",
    rentalEndDate: "2025-08-14",
    totalDays: 3,
    totalPrice: 90,
    status: "Pending",
  },
  {
    id: "ORD003",
    customerName: "Alice Johnson",
    rentalStartDate: "2025-08-01",
    rentalEndDate: "2025-08-05",
    totalDays: 5,
    totalPrice: 250,
    status: "Cancelled",
  },
];

export default function RentalOrdersListView() {
  return (
    <Box
      maxWidth={600}
      mx="auto"
      p={2}
      component={Paper}
      elevation={3}
      sx={{ maxHeight: "70vh", overflowY: "auto" }}
    >
      <Typography variant="h5" gutterBottom>
        Rental Orders List
      </Typography>
      <List>
        {rentalOrders.map((order) => (
          <React.Fragment key={order.id}>
            <ListItem alignItems="flex-start" divider>
              <ListItemText
                primary={
                  <>
                    <Typography
                      component="span"
                      variant="subtitle1"
                      color="primary"
                      fontWeight="bold"
                    >
                      Order ID: {order.id}
                    </Typography>{" "}
                    - <Typography component="span">{order.status}</Typography>
                  </>
                }
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      Customer: {order.customerName}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2" color="text.secondary">
                      Rental Period:{" "}
                      {new Date(order.rentalStartDate).toLocaleDateString()} -{" "}
                      {new Date(order.rentalEndDate).toLocaleDateString()} ({order.totalDays}{" "}
                      days)
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2" color="text.secondary">
                      Total Price: ${order.totalPrice.toFixed(2)}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}