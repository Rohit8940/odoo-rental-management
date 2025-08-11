import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Edit, Delete, Save, Cancel } from "@mui/icons-material";

const initialProducts = [
  { id: 1, name: "Camera", pricePerDay: 50, quantityAvailable: 10 },
  { id: 2, name: "Tripod", pricePerDay: 30, quantityAvailable: 15 },
  { id: 3, name: "Lighting Kit", pricePerDay: 40, quantityAvailable: 5 },
];

export default function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", pricePerDay: "", quantityAvailable: "" });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      pricePerDay: product.pricePerDay,
      quantityAvailable: product.quantityAvailable,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", pricePerDay: "", quantityAvailable: "" });
  };

  const saveEdit = (id) => {
    if (!form.name || !form.pricePerDay || !form.quantityAvailable) {
      alert("Please fill all fields.");
      return;
    }
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              name: form.name,
              pricePerDay: Number(form.pricePerDay),
              quantityAvailable: Number(form.quantityAvailable),
            }
          : p
      )
    );
    cancelEdit();
  };

  const addProduct = () => {
    if (!form.name || !form.pricePerDay || !form.quantityAvailable) {
      alert("Please fill all fields.");
      return;
    }
    const newProduct = {
      id: products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1,
      name: form.name,
      pricePerDay: Number(form.pricePerDay),
      quantityAvailable: Number(form.quantityAvailable),
    };
    setProducts([...products, newProduct]);
    setForm({ name: "", pricePerDay: "", quantityAvailable: "" });
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    setProducts(products.filter((p) => p.id !== deleteId));
    setDeleteDialogOpen(false);
    setDeleteId(null);
  };

  return (
    <Box maxWidth={800} mx="auto" p={3}>
      <Typography variant="h4" gutterBottom>
        Products Management
      </Typography>

      {/* Add New Product Form */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Add New Product
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}
          noValidate
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            addProduct();
          }}
        >
          <TextField
            label="Product Name"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            required
            sx={{ flex: "2 1 200px" }}
          />
          <TextField
            label="Price Per Day"
            name="pricePerDay"
            type="number"
            value={form.pricePerDay}
            onChange={handleInputChange}
            required
            inputProps={{ min: 0 }}
            sx={{ flex: "1 1 150px" }}
          />
          <TextField
            label="Quantity Available"
            name="quantityAvailable"
            type="number"
            value={form.quantityAvailable}
            onChange={handleInputChange}
            required
            inputProps={{ min: 0 }}
            sx={{ flex: "1 1 150px" }}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ height: 40 }}>
            Add Product
          </Button>
        </Box>
      </Paper>

      {/* Products Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price Per Day ($)</TableCell>
              <TableCell>Quantity Available</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((product) =>
              editingId === product.id ? (
                <TableRow key={product.id}>
                  <TableCell>
                    <TextField
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      required
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="pricePerDay"
                      type="number"
                      value={form.pricePerDay}
                      onChange={handleInputChange}
                      required
                      size="small"
                      inputProps={{ min: 0 }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="quantityAvailable"
                      type="number"
                      value={form.quantityAvailable}
                      onChange={handleInputChange}
                      required
                      size="small"
                      inputProps={{ min: 0 }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => saveEdit(product.id)}
                      title="Save"
                    >
                      <Save />
                    </IconButton>
                    <IconButton color="secondary" onClick={cancelEdit} title="Cancel">
                      <Cancel />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.pricePerDay}</TableCell>
                  <TableCell>{product.quantityAvailable}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => startEdit(product)}
                      title="Edit"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => confirmDelete(product.id)}
                      title="Delete"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}