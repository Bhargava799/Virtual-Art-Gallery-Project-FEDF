import React, { useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom"; 
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormLabel,
  Link,
  Stack,
  TextField,
  Typography,
  Divider,
  Card,
} from "@mui/material";
import { useData } from "../components/DataContent"; // ✅ Import DataContent

const Login = () => {
  const navigate = useNavigate();
  const { role } = useParams(); // role selected from home page
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { users } = useData(); // ✅ Get all users from DataContent

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!role) {
      setError("Role is required.");
      return;
    }

    const roleUsers = users[role] || []; // ✅ Users of the selected role
    const existingUser = roleUsers.find((u) => u.email === email && u.password === password);

    if (!existingUser) {
      setError(`No ${role} found with this email/password.`);
      return;
    }

    // Save current logged-in user in localStorage
    localStorage.setItem("currentUser", JSON.stringify({ email, role }));

    // Redirect to respective dashboard
    switch (role) {
      case "Admin":
        navigate("/admindashboard");
        break;
      case "Artist":
        navigate("/artistdashboard");
        break;
      case "Curator":
        navigate("/curatordashboard");
        break;
      default:
        navigate("/visitordashboard"); // Visitor dashboard
        break;
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <CssBaseline />
      <Card sx={{ p: 4, maxWidth: 400, width: "100%", backdropFilter: "blur(8px)", backgroundColor: "rgba(255,255,255,0.8)" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {role ? `Login as ${role}` : "Login"}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Sign into your account
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
          </FormControl>
          <FormControlLabel control={<Checkbox />} label="Remember me" />
          <Button type="submit" variant="contained">
            Login
          </Button>
        </Box>
        <Divider sx={{ my: 2 }}>or</Divider>
        <Stack spacing={1}>
          <Button variant="outlined" onClick={() => alert("Sign in with Google")}>
            Sign in with Google
          </Button>
          <Button variant="outlined" onClick={() => alert("Sign in with Facebook")}>
            Sign in with Facebook
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Don't have an account?{" "}
            <Link component={RouterLink} to="/signup">
              Sign up
            </Link>
          </Typography>
        </Stack>
      </Card>
    </Box>
  );
};

export default Login;
