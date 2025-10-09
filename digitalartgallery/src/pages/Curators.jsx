import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Grid, Button, Divider } from "@mui/material";

const Curators = () => {
  const [curators, setCurators] = useState([]);

  // Load curators from DataContent / localStorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("users")) || {};
    const curatorList = storedData.Curator || [];
    setCurators(curatorList);
  }, []);

  const handleDeleteUser = (username) => {
    const storedData = JSON.parse(localStorage.getItem("users")) || {};
    const updatedCurators = curators.filter((c) => c.username !== username);

    storedData.Curator = updatedCurators;
    localStorage.setItem("users", JSON.stringify(storedData));
    setCurators(updatedCurators);
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
          Curators Management
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {curators.length === 0 ? (
        <Typography>No curators available.</Typography>
      ) : (
        curators.map((user, index) => (
          <Card key={index} sx={{ mb: 2 }}>
            <CardContent>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography variant="h6">{user.username}</Typography>
                  <Typography color="text.secondary">Email: {user.email}</Typography>
                  <Typography color="text.secondary">Role: Curator</Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteUser(user.username)}
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

export default Curators;

