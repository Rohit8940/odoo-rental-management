import React, { useState } from "react";
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
  Button,
  Select,
  MenuItem,
  Collapse,
  IconButton,
  TableFooter,
  TablePagination,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const mockOrders = [
  {
    id: "ORD001",
    customerName: "John Doe",
    rentalStartDate: "2025-08-10",
    rentalEndDate: "2025-08-15",
    totalDays: 6,
    totalPrice: 660,
    status: "Confirmed",
    products: [
      { name: "Camera", quantity: 2, pricePerDay: 50 },
      { name: "Tripod", quantity: 1, pricePerDay: 30 },
    ],
  },
  {
    id: "ORD002",
    customerName: "Jane Smith",
    rentalStartDate: "2025-08-12",
    rentalEndDate: "2025-08-14",
    totalDays: 3,
    totalPrice: 90,
    status: "Pending",
    products: [{ name: "Lighting Kit", quantity: 1, pricePerDay: 30 }],
  },
  {
    id: "ORD003",
    customerName: "Alice Johnson",
    rentalStartDate: "2025-08-01",
    rentalEndDate: "2025-08-05",
    totalDays: 5,
    totalPrice: 250,
    status: "Cancelled",
    products: [{ name: "Camera", quantity: 1, pricePerDay: 50 }],
  },
];

function Row({ order }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow hover>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{order.id}</TableCell>
        <TableCell>{order.customerName}</TableCell>
        <TableCell>{new Date(order.rentalStartDate).toLocaleDateString()}</TableCell>
        <TableCell>{new Date(order.rentalEndDate).toLocaleDateString()}</TableCell>
        <TableCell>{order.totalDays}</TableCell>
        <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
        <TableCell>{order.status}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={8} sx={{ p: 0, borderBottom: "none" }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={2}>
              <Typography variant="subtitle1" gutterBottom>
                Products
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price/Day</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.products.map((p, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{p.name}</TableCell>
                      <TableCell align="right">{p.quantity}</TableCell>
                      <TableCell align="right">${p.pricePerDay}</TableCell>
                      <TableCell align="right">
                        ${(p.pricePerDay * p.quantity * order.totalDays).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function RentalOrders() {
  const [orders, setOrders] = useState(mockOrders);
  const [filterStatus, setFilterStatus] = useState("All");
  const [page, setPage] = useState(0);
  const rowsPerPage = 2;

  const filteredOrders =
    filterStatus === "All"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box p={3} maxWidth={900} mx="auto">
      <Typography variant="h4" gutterBottom>
        Rental Orders
      </Typography>

      <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
        <Typography>Filter by Status:</Typography>
        <Select
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setPage(0);
          }}
          size="small"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Confirmed">Confirmed</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Cancelled">Cancelled</MenuItem>
        </Select>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Total Days</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredOrders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order) => (
                <Row key={order.id} order={order} />
              ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                count={filteredOrders.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[]}
                component="td"
                colSpan={8}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
}