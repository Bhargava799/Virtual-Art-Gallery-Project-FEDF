import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Upload = ({ artworks, setArtworks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    if (uploadedFile) {
      setPreview(URL.createObjectURL(uploadedFile));
    }
  };

  const handleUpload = () => {
    if (!file || !title || !price) {
      alert("Please provide title, price and select an image!");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (!currentUser || currentUser.role !== "Artist") {
        alert("Only Artists can upload artworks!");
        return;
      }

      const newArtwork = {
        id: Date.now(),
        title,
        description,
        price,
        image: reader.result,
        artist: currentUser.username,
      };

      const updatedArtworks = [...artworks, newArtwork];
      setArtworks(updatedArtworks);
      localStorage.setItem("artworks", JSON.stringify(updatedArtworks));

      alert("Artwork uploaded successfully!");

      setTitle("");
      setDescription("");
      setPrice("");
      setFile(null);
      setPreview("");

      navigate("/manage");
    };

    reader.readAsDataURL(file);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Box
        sx={{
          maxWidth: 500,
          mx: "auto",
          mt: 4,
          p: 3,
          borderRadius: 2,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" textAlign="center">Upload Artwork</Typography>

        <TextField
          label="Title"
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

        <TextField
          label="Price (USD)"
          fullWidth
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          margin="normal"
        />

        <Button variant="contained" component="label" sx={{ mt: 2 }}>
          Choose Picture
          <input hidden accept="image/*" type="file" onChange={handleFileChange} />
        </Button>

        {preview && (
          <Box mt={2}>
            <Typography variant="subtitle1">Preview</Typography>
            <img src={preview} alt="Preview" style={{ width: "100%", borderRadius: 8 }} />
          </Box>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          sx={{ mt: 3, width: "100%" }}
        >
          Upload
        </Button>
      </Box>
    </div>
  );
};

export default Upload;
