// src/pages/Manage.jsx
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
  Grid,
} from "@mui/material";

const Manage = ({ artworks, setArtworks }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [current, setCurrent] = useState(null);

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const [newFile, setNewFile] = useState(null);
  const [preview, setPreview] = useState("");

  // Delete artwork
  const handleDelete = (id) => {
    const updated = artworks.filter((art) => art.id !== id);
    setArtworks(updated);
  };

  // Open editor
  const openEditor = (art) => {
    setCurrent(art);
    setNewTitle(art.title);
    setNewDescription(art.description || "");
    setNewPrice(art.price ? art.price.replace("$", "") : "");
    setPreview(art.image || "");
    setEditOpen(true);
  };

  // Image change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setNewFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // Save edits
  const handleSave = () => {
    if (!newTitle || newPrice === "") {
      alert("Please enter title & price");
      return;
    }

    if (newFile) {
      const reader = new FileReader();
      reader.onloadend = () => applySave(reader.result);
      reader.readAsDataURL(newFile);
    } else {
      applySave(preview);
    }
  };

  const applySave = (imageData) => {
    const updated = artworks.map((art) =>
      art.id === current.id
        ? {
            ...art,
            title: newTitle,
            description: newDescription,
            price: `$${newPrice}`,
            image: imageData,
          }
        : art
    );

    setArtworks(updated);
    closeEditor();
  };

  // Reset editor
  const closeEditor = () => {
    setEditOpen(false);
    setCurrent(null);
    setPreview("");
    setNewFile(null);
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      {/* Background Overlay for design consistency */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: -1,
        }}
      />

      <Typography
        variant="h4"
        sx={{ color: "white", fontWeight: "bold", mb: 2 }}
      >
        Manage Artworks
      </Typography>

      {artworks.length === 0 ? (
        <Typography sx={{ color: "#fff" }}>No Artworks Uploaded Yet</Typography>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {artworks.map((art) => (
            <Card key={art.id} sx={{ p: 2, borderRadius: 2 }}>
              <Grid container spacing={2}>
                {/* Image */}
                <Grid item xs={12} sm={4}>
                  <Box
                    component="img"
                    src={art.image}
                    alt="Artwork"
                    sx={{
                      width: "100%",
                      height: 140,
                      borderRadius: 2,
                      objectFit: "cover",
                    }}
                  />
                </Grid>

                {/* Details */}
                <Grid item xs={12} sm={8}>
                  <Typography variant="h6" fontWeight="bold">
                    {art.title}
                  </Typography>
                  <Typography variant="body2">
                    {art.description || "No description"}
                  </Typography>
                  <Typography variant="body1" mt={1} fontWeight="bold">
                    Price: {art.price || "N/A"}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={() => openEditor(art)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(art.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Popup */}
      <Dialog open={editOpen} onClose={closeEditor} fullWidth maxWidth="sm">
        <DialogTitle>Edit Artwork</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />

          <TextField
            label="Price"
            fullWidth
            margin="normal"
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />

          <Button variant="contained" sx={{ mt: 2 }} component="label">
            Change Image
            <input hidden type="file" accept="image/*" onChange={handleFileChange} />
          </Button>

          {preview && (
            <Box
              sx={{
                width: "100%",
                height: 150,
                mt: 2,
                borderRadius: 2,
                objectFit: "cover",
              }}
              component="img"
              src={preview}
              alt="Preview"
            />
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={closeEditor}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Manage;
