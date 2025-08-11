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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// Mock rental orders with products
const rentalOrders = [
  {
    id: "ORD001",
    customerName: "John Doe",
    products: [
      { id: 1, name: "Camera", quantity: 2 },
      { id: 2, name: "Tripod", quantity: 1 },
    ],
  },
  {
    id: "ORD002",
    customerName: "Jane Smith",
    products: [{ id: 3, name: "Lighting Kit", quantity: 1 }],
  },
];

const productConditions = ["Good", "Damaged", "Lost"];

export default function ReturnPage() {
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [returnDate, setReturnDate] = useState(new Date());
  const [productReturns, setProductReturns] = useState({});
  const [conditionSelections, setConditionSelections] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const selectedOrder = rentalOrders.find((order) => order.id === selectedOrderId);

  const handleQuantityChange = (productId, value, maxQty) => {
    let qty = Number(value);
    if (qty < 0) qty = 0;
    if (qty > maxQty) qty = maxQty;
    setProductReturns((prev) => ({ ...prev, [productId]: qty }));
  };

  const handleConditionChange = (productId, condition) => {
    setConditionSelections((prev) => ({ ...prev, [productId]: condition }));
  };

  const canSubmit = () => {
    if (!selectedOrderId) return false;
    // At least one product return with quantity > 0 and condition selected
    return selectedOrder.products.some((p) => {
      const qty = productReturns[p.id] || 0;
      const cond = conditionSelections[p.id];
      return qty > 0 && cond;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit()) {
      alert("Please select at least one product with quantity and condition.");
      return;
    }

    // TODO: Submit return info to backend here

    setSubmitted(true);
  };

  return (
    <Box maxWidth={700} mx="auto" p={3} component={Paper} elevation={3}>
      <Typography variant="h4" gutterBottom>
        Rental Return
      </Typography>

      {submitted ? (
        <Alert severity="success" sx={{ mb: 2 }}>
          Return submitted successfully!
        </Alert>
      ) : null}

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth required sx={{ mb: 3 }}>
          <InputLabel id="order-select-label">Select Rental Order</InputLabel>
          <Select
            labelId="order-select-label"
            value={selectedOrderId}
            label="Select Rental Order"
            onChange={(e) => {
              setSelectedOrderId(e.target.value);
              setProductReturns({});
              setConditionSelections({});
              setSubmitted(false);
            }}
          >
            {rentalOrders.map((order) => (
              <MenuItem key={order.id} value={order.id}>
                {order.id} - {order.customerName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedOrder && (
          <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Return Date"
                value={returnDate}
                onChange={(newDate) => setReturnDate(newDate)}
                renderInput={(params) => (
                  <TextField {...params} fullWidth required sx={{ mb: 3 }} />
                )}
                maxDate={new Date()}
              />
            </LocalizationProvider>

            <TableContainer component={Paper} sx={{ mb: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Rented Qty</TableCell>
                    <TableCell>Return Qty</TableCell>
                    <TableCell>Condition</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedOrder.products.map(({ id, name, quantity }) => (
                    <TableRow key={id}>
                      <TableCell>{name}</TableCell>
                      <TableCell>{quantity}</TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          inputProps={{ min: 0, max: quantity }}
                          value={productReturns[id] || ""}
                          onChange={(e) =>
                            handleQuantityChange(id, e.target.value, quantity)
                          }
                          size="small"
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <FormControl fullWidth required size="small">
                          <Select
                            value={conditionSelections[id] || ""}
                            onChange={(e) => handleConditionChange(id, e.target.value)}
                            displayEmpty
                          >
                            <MenuItem value="" disabled>
                              Select condition
                            </MenuItem>
                            {productConditions.map((cond) => (
                              <MenuItem key={cond} value={cond}>
                                {cond}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!canSubmit()}
          fullWidth
        >
          Submit Return
        </Button>
      </form>
    </Box>
  );
}