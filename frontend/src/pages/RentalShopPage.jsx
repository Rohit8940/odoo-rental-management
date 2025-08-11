import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  Chip,
  useMediaQuery
} from "@mui/material";
import {
  ShoppingCart,
  FavoriteBorder,
  ViewModule,
  ViewList,
  Search
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const categories = ["Category 1", "Category 2", "Category 3", "Category 4"];
const products = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  name: `Product ${i + 1}`,
  price: 0,
  image: "https://via.placeholder.com/150"
}));

const RentalShopPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [view, setView] = useState("grid");
  const navigate = useNavigate()

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Navbar */}
      <AppBar position="static" color="default" sx={{ mb: 2 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Rental Shop
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Rental Shop</Button>
          <Button color="inherit">Wishlist</Button>
          <IconButton color="inherit">
            <ShoppingCart />
          </IconButton>
          <Button color="inherit">Contact Us</Button>
        </Toolbar>
      </AppBar>

      {/* Categories */}
      <Box sx={{ display: "flex", gap: 1, overflowX: "auto", px: 2, mb: 2 }}>
        {categories.map((cat, idx) => (
          <Chip key={idx} label={cat} clickable variant="outlined" />
        ))}
      </Box>

      <Grid container spacing={2} px={2}>
        {/* Filters */}
        {!isMobile && (
          <Grid item xs={12} sm={3} md={2}>
            <Typography variant="subtitle1" fontWeight="bold">
              Product Attributes
            </Typography>
            <Typography variant="body2">Colors</Typography>
            <Typography variant="body2">- Red</Typography>
            <Typography variant="body2">- Blue</Typography>
            <Typography variant="body2">- Green</Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Price Range
            </Typography>
            <Typography variant="body2">- ₹0 - ₹500</Typography>
            <Typography variant="body2">- ₹500 - ₹1000</Typography>
          </Grid>
        )}

        {/* Main Content */}
        <Grid item xs={12} sm={9} md={10}>
          {/* Top Controls */}
          <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Price List</InputLabel>
              <Select defaultValue="">
                <MenuItem value="">Default</MenuItem>
                <MenuItem value="corporate">Corporate</MenuItem>
                <MenuItem value="vip">VIP</MenuItem>
              </Select>
            </FormControl>

            <TextField
              size="small"
              placeholder="Search..."
              InputProps={{
                endAdornment: <Search />
              }}
            />

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Sort By</InputLabel>
              <Select defaultValue="">
                <MenuItem value="">Default</MenuItem>
                <MenuItem value="priceLow">Price: Low to High</MenuItem>
                <MenuItem value="priceHigh">Price: High to Low</MenuItem>
              </Select>
            </FormControl>

            <IconButton onClick={() => setView("grid")}>
              <ViewModule color={view === "grid" ? "primary" : "inherit"} />
            </IconButton>
            <IconButton onClick={() => setView("list")}>
              <ViewList color={view === "list" ? "primary" : "inherit"} />
            </IconButton>
          </Box>

          {/* Product List */}
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid
                key={product.id}
                item
                xs={6}
                sm={4}
                md={3}
                sx={view === "list" ? { flexBasis: "100%" } : {}}
              >
                <Card sx={{ display: view === "list" ? "flex" : "block" }} onClick={()=>navigate("/product-page")}>
                  <CardMedia
                    component="img"
                    height={view === "list" ? "100" : "140"}
                    image={product.image}
                    alt={product.name}
                    sx={view === "list" ? { width: 140 } : {}}
                  />
                  <Box sx={{ flexGrow: 1 }} >
                    <CardContent>
                      <Typography variant="subtitle1">
                        {product.name}
                      </Typography>
                      <Typography variant="body2">
                        ₹{product.price.toFixed(2)}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button variant="contained" size="small">
                        Add to Cart
                      </Button>
                      <IconButton>
                        <FavoriteBorder />
                      </IconButton>
                    </CardActions>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Pagination count={10} color="primary" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RentalShopPage;
