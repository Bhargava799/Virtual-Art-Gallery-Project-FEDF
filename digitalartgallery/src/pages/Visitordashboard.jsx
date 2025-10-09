import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";

// Random 10 artists for display (unchanged)
const randomArtists = Array.from({ length: 10 }, (_, i) => ({
  name: `Artist ${String.fromCharCode(65 + i)}`,
  artworks: Array.from({ length: 10 }, (_, j) => ({
    title: `Artwork ${j + 1}`,
    price: `$${100 + (j + 1) * 20}`,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: `https://picsum.photos/200/300?random=${i * 10 + j + 1}`,
  })),
}));

const Visitordashboard = ({ cart, setCart }) => {
  const [allArtists, setAllArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);

  useEffect(() => {
    // Load uploaded artists from localStorage
    const uploadedArtists = JSON.parse(localStorage.getItem("artists")) || [];

    // Merge uploaded artists above random ones
    const combined = [...uploadedArtists, ...randomArtists];
    setAllArtists(combined);

    // Default selected artist
    setSelectedArtist(combined[0]);
  }, []);

  const handleAddToCart = (art) => {
    setCart((prev) => [...prev, art]);
  };

  return (
    <Box sx={{ display: "flex", p: 4, gap: 4 }}>
      {/* Artists List */}
      <Box sx={{ width: "200px" }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            backgroundColor: "#1976d2",
            color: "white",
            p: 1,
            borderRadius: 1,
            textAlign: "center",
            mb: 2,
          }}
        >
          Artists
        </Typography>
        <List>
          {allArtists.map((artist) => (
            <ListItem key={artist.name} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => setSelectedArtist(artist)}
                sx={{
                  backgroundColor: "#e3f2fd",
                  borderRadius: 1,
                  "&:hover": { backgroundColor: "#bbdefb" },
                }}
              >
                {artist.name}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Artworks Display */}
      <Box
        sx={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 3,
        }}
      >
        {selectedArtist?.artworks?.map((art) => (
          <Card key={art.title} sx={{ maxWidth: 345 }}>
            <CardMedia component="img" height="200" image={art.img} alt={art.title} />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {art.title}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {art.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {art.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                onClick={() => handleAddToCart(art)}
              >
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Visitordashboard;
