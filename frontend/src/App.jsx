// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import RentalShopPage from "./pages/RentalShopPage";
import { useAuth } from "./context/AuthProvider";
import RentalList from "./pages/RentalList";
import ProductPage from "./pages/ProductPage";

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      

      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected route */}
      <Route
        path="/rental-shop"
        element={
          user?.role === "customer" ? (
            <RentalShopPage />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/rental-list"
        element={
          user?.role === "customer" ? (
            <RentalList />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/product-page"
        element={
          user?.role === "customer" ? (
            <ProductPage/>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}
