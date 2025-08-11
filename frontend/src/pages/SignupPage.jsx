import React, { useState } from "react";
import { Box, Button, TextField, Typography, Link } from "@mui/material";
import RoleSelector from "../components/RoleSelector";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";

const SignupPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        email,
        name,
        phone,
        password,
        role,
      });
      login(res.data.user); // store user data in context
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={5}>
      <Typography variant="h5" mb={2}>Sign Up</Typography>
      <form onSubmit={handleSubmit}>
        <RoleSelector role={role} setRole={setRole} />
        <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Name" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Phone" fullWidth margin="normal" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        <TextField label="Confirm Password" type="password" fullWidth margin="normal" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <Button variant="contained" type="submit" fullWidth disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
      <Box mt={2}>
        <Link href="/login">Already have an account? Login</Link>
      </Box>
    </Box>
  );
};

export default SignupPage;
