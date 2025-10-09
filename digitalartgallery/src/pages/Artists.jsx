import React, { useEffect, useState } from "react";
import { Box, Typography, Divider, Card, CardContent, Grid, Button } from "@mui/material";

const Artists = () => {
  const [artists, setArtists] = useState([]);

  // Load artists from DataContent / localStorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("users")) || {};
    const artistList = storedData.Artist || [];
    setArtists(artistList);
  }, []);

  const handleDeleteUser = (username) => {
    const storedData = JSON.parse(localStorage.getItem("users")) || {};
    const updatedArtists = artists.filter((a) => a.username !== username);

    storedData.Artist = updatedArtists;
    localStorage.setItem("users", JSON.stringify(storedData));
    setArtists(updatedArtists);
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
          Artists Management
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      {artists.length === 0 ? (
        <Typography>No artists available.</Typography>
      ) : (
        artists.map((user, index) => (
          <Card key={index} sx={{ mb: 2 }}>
            <CardContent>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography variant="h6">{user.username}</Typography>
                  <Typography color="text.secondary">Email: {user.email}</Typography>
                  <Typography color="text.secondary">Role: Artist</Typography>
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

export default Artists;
