import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  TextField,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import RentalOrderFormView from "./RentalOrderFormView"; // <-- import your form

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const topCategories = [
    { category: "Rental - Service", ordered: 25, revenue: 2940 },
  ];

  const topProducts = [
    { product: "Wheelchairs", ordered: 10, revenue: 3032 },
    { product: "Tables", ordered: 5, revenue: 1008 },
    { product: "Chairs", ordered: 4, revenue: 3008 },
  ];

  const topCustomers = [
    { customer: "Customer1", ordered: 10, revenue: 3032 },
    { customer: "Customer2", ordered: 5, revenue: 1008 },
    { customer: "Customer3", ordered: 4, revenue: 3008 },
  ];

  // Handle logout functionality
  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    
    // You can add additional cleanup here if needed
    // For example: clear user data, redirect to login page, etc.
    
    // Redirect to login page or reload the page
    window.location.href = "/login"; // or use your routing method
    
    // Alternative: if using React Router
    // navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Top Navigation */}
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton color="inherit" onClick={() => setActiveTab("dashboard")}>
            <HomeIcon />
          </IconButton>
          {["Dashboard", "Rental", "Order", "Products", "Reporting", "Setting"].map(
            (tab) => (
              <Button
                key={tab}
                color="inherit"
                sx={{ textTransform: "none" }}
                onClick={() => setActiveTab(tab.toLowerCase())}
              >
                {tab}
              </Button>
            )
          )}
          <Box sx={{ flexGrow: 1 }} />
          
          {/* Logout Button */}
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ textTransform: "none" }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Conditional Content */}
      {activeTab === "dashboard" && (
        <>
          {/* Search & Filter */}
          <Box display="flex" alignItems="center" p={2} gap={2}>
            <TextField
              size="small"
              placeholder="Search..."
              InputProps={{
                startAdornment: <SearchIcon />,
              }}
            />
            <Button variant="outlined">Last 30 days</Button>
          </Box>

          {/* Stats */}
          <Grid container spacing={2} px={2}>
            {[{ label: "Quotations", value: 10 },
              { label: "Rentals", value: 26 },
              { label: "Revenue", value: 10599 }].map((stat) => (
              <Grid item xs={12} sm={4} key={stat.label}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle2">{stat.label}</Typography>
                    <Typography variant="h5">{stat.value}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Tables */}
          <Grid container spacing={2} p={2}>
            {/* Top Product Categories */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Top Product Categories
                  </Typography>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Category</TableCell>
                        <TableCell>Ordered</TableCell>
                        <TableCell>Revenue</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {topCategories.map((row, i) => (
                        <TableRow key={i}>
                          <TableCell>{row.category}</TableCell>
                          <TableCell>{row.ordered}</TableCell>
                          <TableCell>{row.revenue}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </Grid>

            {/* Top Products */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Top Products
                  </Typography>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>Ordered</TableCell>
                        <TableCell>Revenue</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {topProducts.map((row, i) => (
                        <TableRow key={i}>
                          <TableCell>{row.product}</TableCell>
                          <TableCell>{row.ordered}</TableCell>
                          <TableCell>{row.revenue}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </Grid>

            {/* Top Customers */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Top Customers
                  </Typography>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Customer</TableCell>
                        <TableCell>Ordered</TableCell>
                        <TableCell>Revenue</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {topCustomers.map((row, i) => (
                        <TableRow key={i}>
                          <TableCell>{row.customer}</TableCell>
                          <TableCell>{row.ordered}</TableCell>
                          <TableCell>{row.revenue}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}

      {activeTab === "rental" && <RentalOrderFormView />}
    </Box>
  );
}