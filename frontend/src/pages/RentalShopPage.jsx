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
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Changed from 'sm' to 'md'
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
    const handleLogout = () => {
  // Remove token from localStorage
  localStorage.removeItem("token");
  
  
  // Redirect to login page
  window.location.href = "/login";
  
  // Alternative: if using React Router
  // navigate("/login");
};


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
    <Box sx={{ p: 2, minWidth: 250 }}> {/* Added minWidth */}
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
            {/* <Button color="inherit">Home</Button> */}
            <Button color="inherit" variant="text">Rental Shop</Button>
            
            <Button color="inherit">Wishlist</Button>
            <Button color="inherit">Contact</Button>
            <Button color="inherit" variant="text" onClick={handleLogout}>Logout</Button>
            <IconButton color="inherit" onClick={() => navigate("/review-order")}>
              <Badge badgeContent={cartItemsCount} color="primary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: isMobile ? 1 : 3 }}>
        {/* Mobile category chips */}
        {isMobile && (
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
        )}

        <Box sx={{ display: 'flex', gap: 3 }}> {/* Changed to flex layout */}
          {/* Desktop Sidebar */}
          {!isMobile && (
            <Box sx={{ flexShrink: 0 }}> {/* Prevent shrinking */}
              <FilterSidebar />
            </Box>
          )}

          {/* Main Content */}
          <Box sx={{ flex: 1, minWidth: 0 }}> {/* Allow flex grow and prevent overflow */}
            {/* Desktop category chips */}
            {!isMobile && (
              <Box sx={{ display: "flex", gap: 1, overflowX: "auto", py: 2, mb: 2 }}>
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
            )}

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
              <Box 
                sx={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 2,
                  '@media (max-width: 1200px)': {
                    gridTemplateColumns: 'repeat(3, 1fr)',
                  },
                  '@media (max-width: 900px)': {
                    gridTemplateColumns: 'repeat(2, 1fr)',
                  },
                  '@media (max-width: 600px)': {
                    gridTemplateColumns: '1fr',
                  }
                }}
              >
                {currentProducts.map((product) => (
                  <Card
                    key={product._id}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '320px', // Reduced from 400px
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      cursor: 'pointer',
                      borderRadius: 2,
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                      },
                    }}
                    onClick={() => navigate(`/product-page/${product._id}`)}
                  >
                    <Box sx={{ 
                      height: '160px', // Reduced from 220px
                      overflow: 'hidden',
                      backgroundColor: '#f5f5f5'
                    }}>
                      <CardMedia
                        component="img"
                        image={product.imageUrl || "https://via.placeholder.com/300x160/f0f0f0/666666?text=No+Image"}
                        alt={product.name}
                        sx={{ 
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center'
                        }}
                      />
                    </Box>
                    
                    <CardContent sx={{ 
                      flexGrow: 1, 
                      display: 'flex',
                      flexDirection: 'column',
                      p: 1.5, // Reduced padding
                      minHeight: '100px' // Reduced from 120px
                    }}>
                      <Typography 
                        variant="subtitle2" // Changed from subtitle1
                        fontWeight="bold" 
                        sx={{ 
                          mb: 0.5, // Reduced margin
                          minHeight: '20px', // Reduced from 24px
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          lineHeight: 1.2,
                          fontSize: '0.9rem' // Slightly smaller font
                        }}
                      >
                        {product.name}
                      </Typography>
                      
                      <Typography 
                        variant="caption" // Changed from body2
                        color="text.secondary" 
                        sx={{ mb: 1 }}
                      >
                        {product.category}
                      </Typography>
                      
                      <Box sx={{ mt: 'auto' }}>
                        <Typography variant="h6" color="primary" fontWeight="bold" sx={{ fontSize: '1.1rem' }}>
                          ₹{product.pricePerDay?.toFixed(2) || '0.00'} / day
                        </Typography>
                        {product.originalPrice && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ textDecoration: "line-through" }}
                          >
                            ₹{product.originalPrice.toFixed(2)}
                          </Typography>
                        )}
                      </Box>
                    </CardContent>
                    
                    <CardActions sx={{ 
                      justifyContent: "space-between", 
                      p: 1.5, // Reduced padding
                      pt: 0
                    }}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                          minWidth: 80, // Reduced from 100
                          textTransform: 'none',
                          fontWeight: 'bold',
                          fontSize: '0.75rem' // Smaller button text
                        }}
                      >
                        Rent Now
                      </Button>
                      <IconButton 
                        size="small" // Made icon button smaller
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                          border: '1px solid',
                          borderColor: 'divider',
                          '&:hover': {
                            borderColor: 'primary.main',
                            backgroundColor: 'primary.light',
                            color: 'primary.main'
                          }
                        }}
                      >
                        <FavoriteBorder fontSize="small" />
                      </IconButton>
                    </CardActions>
                  </Card>
                ))}
              </Box>
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
          </Box>
        </Box>
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