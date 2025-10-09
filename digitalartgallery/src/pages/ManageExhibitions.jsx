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

const ManageExhibitions = ({ exhibitions, setExhibitions }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newFiles, setNewFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleDelete = (id) => {
    const updated = exhibitions.filter((ex) => ex.id !== id);
    setExhibitions(updated);
  };

  const handleEditOpen = (ex) => {
    setCurrentEdit(ex);
    setNewTitle(ex.title);
    setNewDescription(ex.description);
    setPreviews(ex.images);
    setEditOpen(true);
  };

  const handleFilesChange = (e) => {
    const uploadedFiles = Array.from(e.target.files).slice(0, 5);
    setNewFiles(uploadedFiles);
    const newPreviews = uploadedFiles.map((f) => URL.createObjectURL(f));
    setPreviews(newPreviews);
  };

  const handleEditSave = () => {
    if (newFiles.length > 0) {
      const readFilesPromises = newFiles.map(
        (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      );

      Promise.all(readFilesPromises)
        .then((images) => saveExhibition(images))
        .catch((err) => {
          console.error(err);
          alert("Failed to read files.");
        });
    } else {
      saveExhibition(previews);
    }
  };

  const saveExhibition = (images) => {
    const updated = exhibitions.map((ex) => {
      if (ex.id === currentEdit.id) {
        return { ...ex, title: newTitle, description: newDescription, images };
      }
      return ex;
    });
    setExhibitions(updated);
    setEditOpen(false);
    setCurrentEdit(null);
    setNewFiles([]);
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
      />

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Typography variant="h4" gutterBottom>
          Manage Exhibitions
        </Typography>

        {exhibitions.length === 0 ? (
          <Typography>No exhibitions created yet.</Typography>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {exhibitions.map((ex) => (
              <Card
                key={ex.id}
                sx={{
                  width: "100%",
                  maxWidth: 800,
                  boxShadow: 3,
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  {ex.title}
                </Typography>
                <Typography variant="body1">{ex.description}</Typography>

                <Grid container spacing={2} mt={1}>
                  {ex.images.map((img, idx) => (
                    <Grid item xs={6} sm={4} md={3} key={idx}>
                      <Box
                        component="img"
                        src={img}
                        alt={`Exhibition ${idx}`}
                        sx={{ width: "100%", borderRadius: 2, height: 120, objectFit: "cover" }}
                      />
                    </Grid>
                  ))}
                </Grid>

                <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                  <Button variant="outlined" color="primary" onClick={() => handleEditOpen(ex)}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(ex.id)}>
                    Delete
                  </Button>
                </Box>
              </Card>
            ))}
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle>Edit Exhibition</DialogTitle>
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

            <Button variant="contained" component="label" sx={{ mt: 2 }}>
              Change Images (Max 5)
              <input hidden type="file" accept="image/*" multiple onChange={handleFilesChange} />
            </Button>

            {previews.length > 0 && (
              <Grid container spacing={2} mt={1}>
                {previews.map((src, idx) => (
                  <Grid item xs={6} sm={4} key={idx}>
                    <Box
                      component="img"
                      src={src}
                      alt={`Preview ${idx}`}
                      sx={{ width: "100%", borderRadius: 2, height: 100, objectFit: "cover" }}
                    />
                  </Grid>
                ))}
              </Grid>
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

export default ManageExhibitions;
