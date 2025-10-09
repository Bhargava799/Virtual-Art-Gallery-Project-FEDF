import React, { useState } from "react";
import { Button, TextField, Typography, Box, Grid } from "@mui/material";

const CreateExhibition = ({ exhibitions, setExhibitions }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleFilesChange = (e) => {
    const uploadedFiles = Array.from(e.target.files).slice(0, 5); // limit to 5 files
    setFiles(uploadedFiles);
    const filePreviews = uploadedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(filePreviews);
  };

  const handleCreateExhibition = () => {
    if (!title || files.length === 0) {
      alert("Please provide a title and select at least one image.");
      return;
    }

    const readFilesPromises = files.map(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
    );

    Promise.all(readFilesPromises)
      .then((images) => {
        const newExhibition = {
          id: Date.now(),
          title,
          description,
          images, // array of base64 strings
        };

        setExhibitions([...exhibitions, newExhibition]);

        alert("Exhibition created successfully 🎉");

        setTitle("");
        setDescription("");
        setFiles([]);
        setPreviews([]);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to read files.");
      });
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

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: 600,
          mx: "auto",
          mt: 4,
          p: 3,
          borderRadius: 2,
          backgroundColor: "rgba(255,255,255,0.9)", // optional light translucent background
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Create Exhibition
        </Typography>

        <TextField
          label="Exhibition Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />

        <TextField
          label="Description"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />

        <Button variant="contained" component="label" sx={{ mt: 2 }}>
          Choose Images (Max 5)
          <input hidden accept="image/*" type="file" multiple onChange={handleFilesChange} />
        </Button>

        {previews.length > 0 && (
          <Box mt={2}>
            <Typography variant="subtitle1">Preview:</Typography>
            <Grid container spacing={2}>
              {previews.map((src, idx) => (
                <Grid item xs={6} sm={4} key={idx}>
                  <img src={src} alt={`Preview ${idx}`} style={{ width: "100%", borderRadius: 8 }} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateExhibition}
          sx={{ mt: 3, width: "100%" }}
        >
          Create Exhibition
        </Button>
      </Box>
    </div>
  );
};

export default CreateExhibition;
