// RentalShopPage.jsx
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Pagination,
  Box
} from '@mui/material';
import { ShoppingCart, AccountCircle, ViewList, FavoriteBorder } from '@mui/icons-material';

export default function RentalList() {
  const [priceFilter, setPriceFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const products = [
    { id: 1, name: 'Product 1', price: 160, image: 'https://via.placeholder.com/80' },
    { id: 2, name: 'Product 2', price: 160, image: 'https://via.placeholder.com/80' },
    { id: 3, name: 'Product 3', price: 160, image: 'https://via.placeholder.com/80' },
    { id: 4, name: 'Product 4', price: 160, image: 'https://via.placeholder.com/80' },
  ];

  return (
    <>
      {/* Top Navigation */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" gap={2}>
            <Button>Home</Button>
            <Button variant="outlined">Rental Shop</Button>
            <Button>Wishlist</Button>
            <IconButton>
              <ShoppingCart />
            </IconButton>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton>
              <AccountCircle />
            </IconButton>
            <Typography>adam</Typography>
            <Button variant="outlined">Contact us</Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 3 }}>
        {/* Categories */}
        <Box display="flex" gap={2} mb={2} flexWrap="wrap">
          {['Category 1', 'Category 2', 'Category 3', 'Category 4'].map((cat, i) => (
            <Button key={i} variant="outlined">{cat}</Button>
          ))}
        </Box>

        <Grid container spacing={2}>
          {/* Sidebar Filters */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>Product attributes</Typography>
            <Typography variant="subtitle2">Colors</Typography>
            <ul>
              <li>-</li>
              <li>-</li>
            </ul>
            <Typography variant="subtitle2">Price range</Typography>
            <ul>
              <li>-</li>
              <li>-</li>
              <li>-</li>
            </ul>
          </Grid>

          {/* Product List */}
          <Grid item xs={12} md={9}>
            <Box display="flex" justifyContent="space-between" mb={2} flexWrap="wrap" gap={2}>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Price List</InputLabel>
                <Select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
              <TextField placeholder="Search" size="small" />
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Sort by</InputLabel>
                <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <MenuItem value="">Default</MenuItem>
                  <MenuItem value="priceAsc">Price Low to High</MenuItem>
                  <MenuItem value="priceDesc">Price High to Low</MenuItem>
                </Select>
              </FormControl>
              <IconButton>
                <ViewList />
              </IconButton>
            </Box>

            <Grid container spacing={2}>
              {products.map((product) => (
                <Grid item xs={12} key={product.id}>
                  <Card sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 80, height: 80, borderRadius: 2 }}
                      image={product.image}
                      alt={product.name}
                    />
                    <CardContent sx={{ flex: 1 }}>
                      <Typography variant="subtitle1">{product.name}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" variant="contained">Add to Cart</Button>
                      <IconButton><FavoriteBorder /></IconButton>
                    </CardActions>
                    <Typography sx={{ ml: 2 }}>₹{product.price}</Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination count={10} page={1} color="primary" />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
