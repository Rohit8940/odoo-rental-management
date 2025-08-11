// Dashboard.jsx
import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
} from "@mui/material";

// ReviewOrder component
const ReviewOrder = ({ onNext }) => {
  const dummyOrder = {
    items: [
      { id: 1, name: "Camera", qty: 2, price: 50 },
      { id: 2, name: "Tripod", qty: 1, price: 30 },
    ],
    rentalDays: 3,
  };
  const { items, rentalDays } = dummyOrder;
  const subtotal = items.reduce((acc, item) => acc + item.qty * item.price, 0);
  const total = subtotal * rentalDays;

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Review Your Order
      </Typography>

      <Box component="table" sx={{ width: "100%", mb: 3, borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #ccc" }}>
            <th align="left">Product</th>
            <th align="right">Quantity</th>
            <th align="right">Price/Day</th>
            <th align="right">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map(({ id, name, qty, price }) => (
            <tr key={id} style={{ borderBottom: "1px solid #eee" }}>
              <td>{name}</td>
              <td align="right">{qty}</td>
              <td align="right">${price}</td>
              <td align="right">${qty * price}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={3} align="right">
              Rental Days
            </td>
            <td align="right">{rentalDays}</td>
          </tr>
          <tr>
            <td colSpan={3} align="right">
              <strong>Total Price</strong>
            </td>
            <td align="right">
              <strong>${total}</strong>
            </td>
          </tr>
        </tbody>
      </Box>

      <button onClick={onNext} style={{ padding: "8px 16px", backgroundColor: "#1976d2", color: "white", border: "none", borderRadius: 4 }}>
        Proceed to Delivery
      </button>
    </Box>
  );
};

// Delivery component
const Delivery = ({ onNext, onBack }) => {
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Delivery Information
      </Typography>

      <form onSubmit={handleSubmit} noValidate>
        {["fullName", "address", "city", "postalCode", "phone"].map((field) => (
          <div key={field} style={{ marginBottom: 16 }}>
            <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>
              {field
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </label>
            <input
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
            />
          </div>
        ))}

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            type="button"
            onClick={onBack}
            style={{ padding: "8px 16px", backgroundColor: "#ccc", border: "none", borderRadius: 4 }}
          >
            Back to Review
          </button>
          <button
            type="submit"
            style={{ padding: "8px 16px", backgroundColor: "#1976d2", color: "white", border: "none", borderRadius: 4 }}
          >
            Proceed to Payment
          </button>
        </div>
      </form>
    </Box>
  );
};

// Payment component
const Payment = ({ onBack, onConfirm }) => {
  const [form, setForm] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Payment Details
      </Typography>

      <form onSubmit={handleSubmit} noValidate>
        {[
          { label: "Name on Card", name: "cardName", type: "text" },
          { label: "Card Number", name: "cardNumber", type: "text", maxLength: 16 },
          { label: "Expiry Date (MM/YY)", name: "expiryDate", type: "text", placeholder: "MM/YY" },
          { label: "CVV", name: "cvv", type: "password", maxLength: 3 },
        ].map(({ label, name, type, maxLength, placeholder }) => (
          <div key={name} style={{ marginBottom: 16 }}>
            <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>{label}</label>
            <input
              name={name}
              type={type}
              maxLength={maxLength}
              placeholder={placeholder || ""}
              value={form[name]}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
            />
          </div>
        ))}

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            type="button"
            onClick={onBack}
            style={{ padding: "8px 16px", backgroundColor: "#ccc", border: "none", borderRadius: 4 }}
          >
            Back to Delivery
          </button>
          <button
            type="submit"
            style={{ padding: "8px 16px", backgroundColor: "#1976d2", color: "white", border: "none", borderRadius: 4 }}
          >
            Confirm Payment
          </button>
        </div>
      </form>
    </Box>
  );
};

const drawerWidth = 240;

export default function Dashboard() {
  const [selectedPage, setSelectedPage] = useState("Review Order");
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
      setSelectedPage(step === 1 ? "Delivery" : "Payment");
    }
  };
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setSelectedPage(step === 3 ? "Delivery" : "Review Order");
    }
  };

  const handleConfirm = () => {
    alert("Payment Confirmed! Order placed.");
    setStep(1);
    setSelectedPage("Review Order");
  };

  const pages = ["Review Order", "Delivery", "Payment"];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "#1976d2" }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Rental Management Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {pages.map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  selected={selectedPage === text}
                  onClick={() => {
                    setSelectedPage(text);
                    setStep(pages.indexOf(text) + 1);
                  }}
                >
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          mt: 8,
          width: `calc(100% - ${drawerWidth}px)`,
          minHeight: "100vh",
        }}
      >
        {selectedPage === "Review Order" && <ReviewOrder onNext={handleNext} />}
        {selectedPage === "Delivery" && <Delivery onNext={handleNext} onBack={handleBack} />}
        {selectedPage === "Payment" && <Payment onBack={handleBack} onConfirm={handleConfirm} />}
      </Box>
    </Box>
  );
}