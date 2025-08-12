// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import RentalShopPage from "./pages/RentalShopPage";
import { useAuth } from "./context/AuthProvider";
import RentalList from "./pages/RentalList";
import ProductPage from "./pages/ProductPage";
import ReviewOrder from "./pages/ReviewOrder";
import DeliveryPage from "./pages/DeliveryPage";
import PaymentPage from "./pages/PaymentPage";
import Dashboard from "./userPages/Dashboard";
import RentalOrderFormView from "./userPages/RentalOrderFormView";

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Loading spinner or skeleton
  }

  return (
    <Routes>
      {/* Default route decision based on role */}
      <Route
        path="/"
        element={
          !user ? (
            <Navigate to="/login" replace />
          ) : user.role === "customer" ? (
            <Navigate to="/rental-shop" replace />
          ) : user.role === "enduser" ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Customer protected routes */}
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
        path="/product-page/:id"
        element={
          user?.role === "customer" ? (
            <ProductPage />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/review-order"
        element={
          user?.role === "customer" ? (
            <ReviewOrder />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/delivery"
        element={
          user?.role === "customer" ? (
            <DeliveryPage />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/payment"
        element={
          user?.role === "customer" ? (
            <PaymentPage />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* End user protected route */}
      <Route
        path="/dashboard"
        element={
          user?.role === "enduser" ? (
            <Dashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/rental-order-form/:id"
        element={
          user?.role === "enduser" ? (
            <RentalOrderFormView/>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}
