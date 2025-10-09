import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Divider,
  Card,
  Link,
} from "@mui/material";
import { useData } from "../components/DataContent"; // ✅ Correct import path

const Signup = () => {
  const { addUser, users } = useData(); // ✅ Access existing users too
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [roleError, setRoleError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    let valid = true;
    if (!name) { setNameError(true); valid = false; } else { setNameError(false); }
    if (!email || !/\S+@\S+\.\S+/.test(email)) { setEmailError(true); valid = false; } else { setEmailError(false); }
    if (!password || password.length < 6) { setPasswordError(true); valid = false; } else { setPasswordError(false); }
    if (!role) { setRoleError(true); valid = false; } else { setRoleError(false); }

    if (!valid) return;

    // ✅ Check for duplicate signup
    const existingRoleUsers = users[role] || [];
    const userExists = existingRoleUsers.some(
      (u) => u.email === email || u.username.toLowerCase() === name.toLowerCase()
    );
    if (userExists) {
      alert("User with this name or email already exists!");
      return;
    }

    // ✅ Store user in DataContent with all details
    addUser({ username: name, email, password, role });

    alert(`Signed up successfully as ${role}!\nName: ${name}\nEmail: ${email}`);

    // Reset form
    setName("");
    setEmail("");
    setPassword("");
    setRole("");
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <CssBaseline />
      <Card
        sx={{
          p: 4,
          maxWidth: 400,
          width: "100%",
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(255,255,255,0.8)",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Sign up
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormControl>
            <FormLabel>Full Name</FormLabel>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={nameError}
              helperText={nameError ? "Name is required" : ""}
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              helperText={emailError ? "Valid email is required" : ""}
              type="email"
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              helperText={passwordError ? "Password must be at least 6 characters" : ""}
              type="password"
              required
            />
          </FormControl>

          <FormControl fullWidth error={roleError}>
            <InputLabel id="role-label">Select Role</InputLabel>
            <Select
              labelId="role-label"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Artist">Artist</MenuItem>
              <MenuItem value="Visitor">Visitor</MenuItem>
              <MenuItem value="Curator">Curator</MenuItem>
            </Select>
            {roleError && (
              <Typography variant="caption" color="error">
                Please select a role
              </Typography>
            )}
          </FormControl>

          <FormControlLabel control={<Checkbox />} label="I want to receive updates via email." />
          <Button type="submit" variant="contained">
            Sign up
          </Button>
        </Box>

        <Divider sx={{ my: 2 }}>or</Divider>

        <Stack spacing={1}>
          <Button variant="outlined" onClick={() => alert("Sign up with Google")}>
            Sign up with Google
          </Button>
          <Button variant="outlined" onClick={() => alert("Sign up with Facebook")}>
            Sign up with Facebook
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link component={RouterLink} to="/home">
              Sign in
            </Link>
          </Typography>
        </Stack>
      </Card>
    </Box>
  );
};

export default Signup;
