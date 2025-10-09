import React from "react";
import { Box, Typography, Card, CardContent, Grid, Button, Divider } from "@mui/material";

const Admins = ({ admins, handleDeleteUser }) => {
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
                Admins Management
              </Typography>
            </Box>
      <Divider sx={{ mb: 2 }} />
      {admins.length === 0 ? (
        <Typography>No admins available.</Typography>
      ) : (
        admins.map((user, index) => (
          <Card key={index} sx={{ mb: 2 }}>
            <CardContent>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography variant="h6">{user.name}</Typography>
                  <Typography color="text.secondary">
                    Role: {user.role || "Admin"}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="error" onClick={() => handleDeleteUser(user.name)}>
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

export default Admins;
