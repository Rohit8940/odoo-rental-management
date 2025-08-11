import React, { useState } from "react";
import { Box, Button, TextField, Typography, Link } from "@mui/material";
import RoleSelector from "../components/RoleSelector";
import { useAuth } from "../context/AuthProvider";

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: API call to backend
    login({ email, role });
  };

  return (
    <Box maxWidth={400} mx="auto" mt={5}>
      <Typography variant="h5" mb={2}>Login</Typography>
      <form onSubmit={handleSubmit}>
        <RoleSelector role={role} setRole={setRole} />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" type="submit" fullWidth>Sign In</Button>
      </form>
      <Box mt={2}>
        <Link href="/signup">Register here</Link>
      </Box>
    </Box>
  );
};

export default LoginPage;
