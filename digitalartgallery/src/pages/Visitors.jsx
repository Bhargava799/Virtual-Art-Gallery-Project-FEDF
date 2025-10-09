import React, { useEffect, useState } from "react";
import { Box, Typography, Divider, Card, CardContent, Grid, Button } from "@mui/material";

const Visitors = () => {
  const [visitors, setVisitors] = useState([]);

  // Load visitors from localStorage
  useEffect(() => {
    const usersData = JSON.parse(localStorage.getItem("users")) || {};
    setVisitors(usersData.Visitor || []);
  }, []);

  // Delete a visitor
  const handleDeleteUser = (email) => {
    const usersData = JSON.parse(localStorage.getItem("users")) || {};
    const updatedVisitors = visitors.filter((v) => v.email !== email);
    usersData.Visitor = updatedVisitors;
    localStorage.setItem("users", JSON.stringify(usersData));
    setVisitors(updatedVisitors);
  };

  return (
    <Box>
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            backgroundColor: "rgba(20, 0, 0, 0.88)",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            display: "inline-block",
          }}
        >
          Visitor Management
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />

      {visitors.length === 0 ? (
        <Typography>No visitors available.</Typography>
      ) : (
        visitors.map((user, index) => (
          <Card key={index} sx={{ mb: 2 }}>
            <CardContent>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography variant="h6">{user.username}</Typography>
                  <Typography color="text.secondary">{user.email}</Typography>
                  <Typography color="text.secondary">Role: Visitor</Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteUser(user.email)}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default Visitors;
