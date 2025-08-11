import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Chip,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  useMediaQuery,
  Divider,
  Drawer,
  Badge,
  Toolbar,
  AppBar,
  Stack,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Slider,
} from "@mui/material";
import {
  FavoriteBorder,
  ViewModule,
  ViewList,
  Search,
  ShoppingCart,
  FilterList,
  Close,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const categories = ["All Items", "Electronics", "Furniture", "Tools", "Sports", "Party"];
const colors = ["Red", "Blue", "Green", "Black", "White", "Multi"];

const RentalShopPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [view, setView] = useState("grid");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [cartItemsCount, setCartItemsCount] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Apply all filters
    let result = [...products];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== "All Items") {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply color filter
    if (selectedColors.length > 0) {
      result = result.filter(product => selectedColors.includes(product.color));
    }
    
    // Apply price filter
    result = result.filter(product =>
      product.pricePerDay >= priceRange[0] && product.pricePerDay <= priceRange[1]
    );
    
    // Apply sorting
    if (sortOption === "priceLow") {
      result.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sortOption === "priceHigh") {
      result.sort((a, b) => b.pricePerDay - a.pricePerDay);
    } else if (sortOption === "rating") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    
    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [products, searchQuery, selectedCategory, selectedColors, priceRange, sortOption]);

  const handleColorToggle = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const FilterSidebar = () => (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="subtitle1" gutterBottom>
        Price Range
      </Typography>
      <Slider
        value={priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={0}
        max={5000}
        valueLabelFormat={(value) => `₹${value}`}
        sx={{ mb: 3 }}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2">{formatCurrency(priceRange[0])}</Typography>
        <Typography variant="body2">{formatCurrency(priceRange[1])}</Typography>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="subtitle1" gutterBottom>
        Colors
      </Typography>
      <FormGroup>
        {colors.map((color) => (
          <FormControlLabel
            key={color}
            control={
              <Checkbox
                checked={selectedColors.includes(color)}
                onChange={() => handleColorToggle(color)}
                size="small"
              />
            }
            label={color}
          />
        ))}
      </FormGroup>
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="subtitle1" gutterBottom>
        Categories
      </Typography>
      <Stack spacing={1}>
        {categories.map((category) => (
          <Chip
            key={category}
            label={category}
            clickable
            variant={selectedCategory === category ? "filled" : "outlined"}
            color={selectedCategory === category ? "primary" : "default"}
            onClick={() => handleCategoryChange(category)}
            sx={{ justifyContent: "flex-start" }}
          />
        ))}
      </Stack>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Rental Shop
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button color="inherit">Home</Button>
            <Button color="inherit" variant="text">Rental Shop</Button>
            <Button color="inherit">Wishlist</Button>
            <Button color="inherit">Contact</Button>
            <IconButton color="inherit" onClick={() => navigate("/review-order")}>
              <Badge badgeContent={cartItemsCount} color="primary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: isMobile ? 1 : 3 }}>
        <Box sx={{ display: "flex", gap: 1, overflowX: "auto", py: 2, px: 1 }}>
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              clickable
              variant={selectedCategory === cat ? "filled" : "outlined"}
              color={selectedCategory === cat ? "primary" : "default"}
              onClick={() => handleCategoryChange(cat)}
            />
          ))}
        </Box>

        <Grid container spacing={3}>
          {!isMobile && (
            <Grid item xs={12} md={3}>
              <FilterSidebar />
            </Grid>
          )}

          <Grid item xs={12} md={9}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Typography variant="h6" component="h2">
                {filteredProducts.length} Products Available
              </Typography>

              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                {isMobile && (
                  <Button
                    startIcon={<FilterList />}
                    onClick={() => setMobileFiltersOpen(true)}
                    variant="outlined"
                    size="small"
                  >
                    Filters
                  </Button>
                )}
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Sort By</InputLabel>
                  <Select value={sortOption} onChange={handleSortChange}>
                    <MenuItem value="">Default</MenuItem>
                    <MenuItem value="priceLow">Price: Low to High</MenuItem>
                    <MenuItem value="priceHigh">Price: High to Low</MenuItem>
                    <MenuItem value="rating">Rating</MenuItem>
                  </Select>
                </FormControl>

                <Box sx={{ display: "flex" }}>
                  <IconButton
                    onClick={() => setView("grid")}
                    color={view === "grid" ? "primary" : "default"}
                  >
                    <ViewModule />
                  </IconButton>
                  <IconButton
                    onClick={() => setView("list")}
                    color={view === "list" ? "primary" : "default"}
                  >
                    <ViewList />
                  </IconButton>
                </Box>
              </Box>
            </Box>

            <TextField
              fullWidth
              size="small"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: <Search color="action" />,
              }}
              sx={{ mb: 3 }}
            />

            {currentProducts.length > 0 ? (
              <Grid container spacing={3}>
                {currentProducts.map((product) => (
                  <Grid
                    key={product._id}
                    item
                    xs={6}
                    sm={4}
                    md={4}
                  >
                    <Card
                      sx={{
                        display: 'block',
                        height: '100%',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 3,
                        },
                      }}
                      onClick={() => navigate(`/product-page/${product._id}`)}
                    >
                      <CardMedia
                        component="img"
                        height="180"
                        image={product.imageUrl || "https://via.placeholder.com/300"}
                        alt={product.name}
                        sx={{ objectFit: "cover" }}
                      />
                      <Box sx={{ flexGrow: 1 }}>
                        <CardContent>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {product.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            {product.category}
                          </Typography>
                          <Typography variant="h6" color="primary">
                            ₹{product.pricePerDay.toFixed(2)} / day
                          </Typography>
                          {product.originalPrice && (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ textDecoration: "line-through" }}
                            >
                              ₹{product.originalPrice.toFixed(2)}
                            </Typography>
                          )}
                        </CardContent>
                        <CardActions sx={{ justifyContent: "space-between" }}>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Rent Now
                          </Button>
                          <IconButton onClick={(e) => e.stopPropagation()}>
                            <FavoriteBorder />
                          </IconButton>
                        </CardActions>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "50vh",
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  No products match your filters.
                </Typography>
              </Box>
            )}

            {filteredProducts.length > productsPerPage && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  shape="rounded"
                  showFirstButton
                  showLastButton
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>

      <Drawer
        anchor="left"
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">Filters</Typography>
            <IconButton onClick={() => setMobileFiltersOpen(false)}>
              <Close />
            </IconButton>
          </Box>
          <FilterSidebar />
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => setMobileFiltersOpen(false)}
          >
            Apply Filters
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default RentalShopPage;