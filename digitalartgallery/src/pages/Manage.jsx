import React, { useState } from "react";
import {
  Card,
  Typography,
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const Manage = ({ artworks, setArtworks }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPrice, setNewPrice] = useState(""); // New price field
  const [newImage, setNewImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleDelete = (id) => {
    const updated = artworks.filter((art) => art.id !== id);
    setArtworks(updated);
  };

  const handleEditOpen = (art) => {
    setCurrentEdit(art);
    setNewTitle(art.title);
    setNewDescription(art.description);
    setNewPrice(art.price?.replace("$", "") || "");
    setPreview(art.image);
    setEditOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleEditSave = () => {
    if (!newTitle || !newPrice) {
      alert("Please fill in title and price");
      return;
    }

    if (newImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        saveArtwork(reader.result);
      };
      reader.readAsDataURL(newImage);
    } else {
      saveArtwork(preview);
    }
  };

  const saveArtwork = (imageData) => {
    const updatedArtworks = artworks.map((art) => {
      if (art.id === currentEdit.id) {
        return {
          ...art,
          title: newTitle,
          description: newDescription,
          price: `$${newPrice}`,
          image: imageData,
        };
      }
      return art;
    });
    setArtworks(updatedArtworks);
    setEditOpen(false);
    setNewImage(null);
    setCurrentEdit(null);
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        padding: "40px 20px",
        zIndex: 1,
      }}
    >
      {/* 🔹 Transparent overlay film */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)", // 50% dark overlay
          zIndex: -1,
        }}
      ></div>

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Typography variant="h4" gutterBottom sx={{ color: "#fff" }}>
          Manage Artworks
        </Typography>

        {artworks.length === 0 ? (
          <Typography sx={{ color: "#fff" }}>No artworks uploaded yet.</Typography>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {artworks.map((art) => (
              <Card
                key={art.id}
                sx={{
                  display: "flex",
                  width: "100%",
                  maxWidth: 700,
                  boxShadow: 3,
                  borderRadius: 2,
                }}
              >
                {/* Artwork Image */}
                <Box
                  component="img"
                  src={art.image}
                  alt="Artwork"
                  sx={{
                    width: 200,
                    height: 150,
                    objectFit: "cover",
                    borderRadius: "8px 0 0 8px",
                  }}
                />

                {/* Artwork Info */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    p: 2,
                    flex: 1,
                  }}
                >
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      {art.title}
                    </Typography>
                    <Typography variant="body1">{art.description}</Typography>
                    <Typography variant="body1" fontWeight="bold">
                      Price: {art.price || "N/A"}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                    <Button variant="outlined" color="primary" onClick={() => handleEditOpen(art)}>
                      Edit
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => handleDelete(art.id)}>
                      Delete
                    </Button>
                  </Box>
                </Box>
              </Card>
            ))}
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
          <DialogTitle>Edit Artwork</DialogTitle>
          <DialogContent>
            <TextField
              label="Title"
              fullWidth
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Price"
              type="number"
              fullWidth
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              margin="normal"
            />

            <Button variant="contained" component="label" sx={{ mt: 2 }}>
              Change Image
              <input hidden type="file" accept="image/*" onChange={handleFileChange} />
            </Button>

            {preview && (
              <Box mt={2}>
                <Typography variant="subtitle1">Preview:</Typography>
                <img src={preview} alt="Preview" style={{ width: "100%", borderRadius: 8 }} />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleEditSave}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default Manage;
