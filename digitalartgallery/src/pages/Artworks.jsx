import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Card,
  CardContent,
  Grid,
  Button,
} from "@mui/material";

const Artworks = () => {
  const [artworks, setArtworks] = useState([
    {
      id: 1,
      title: "Dreamscape",
      description: "A surreal landscape of floating islands.",
      price: "$1,200",
      verified: false,
    },
    {
      id: 2,
      title: "Neon Nights",
      description: "Cyberpunk-themed digital painting.",
      price: "$850",
      verified: false,
    },
    {
      id: 3,
      title: "Reflections",
      description: "Abstract water reflections in oil.",
      price: "$2,000",
      verified: false,
    },
    {
      id: 4,
      title: "Silent Symphony",
      description: "A peaceful visual of sound in silence.",
      price: "$1,500",
      verified: false,
    },
    {
      id: 5,
      title: "Midnight Bloom",
      description: "Flowers that glow under moonlight.",
      price: "$1,000",
      verified: false,
    },
  ]);

  const handleVerify = (id) => {
    const updated = artworks.map((art) =>
      art.id === id ? { ...art, verified: true } : art
    );
    setArtworks(updated);
  };

  const handleDelete = (id) => {
    const updated = artworks.filter((art) => art.id !== id);
    setArtworks(updated);
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
                Artworks Management
              </Typography>
            </Box>
      <Divider sx={{ mb: 2 }} />

      {artworks.length === 0 ? (
        <Typography>No artworks available.</Typography>
      ) : (
        artworks.map((art) => (
          <Card key={art.id} sx={{ mb: 2, p: 1 }}>
            <CardContent>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item xs={8}>
                  <Typography variant="h6">{art.title}</Typography>
                  <Typography color="text.secondary">
                    {art.description}
                  </Typography>
                  <Typography color="text.secondary">Price: {art.price}</Typography>
                  <Typography
                    color={art.verified ? "success.main" : "warning.main"}
                    sx={{ mt: 1 }}
                  >
                    {art.verified ? "Verified ✅" : "Pending Verification"}
                  </Typography>
                </Grid>
                <Grid item>
                  {!art.verified && (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleVerify(art.id)}
                      sx={{ mr: 1 }}
                    >
                      Verify
                    </Button>
                  )}
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(art.id)}
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

export default Artworks;
