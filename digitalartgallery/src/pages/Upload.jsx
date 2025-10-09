import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useData } from "../components/DataContent"; // ✅ Import DataContent

const Upload = () => {
  const { artistData, setArtistData } = useData(); // ✅ Use artistData from context
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    if (uploadedFile) {
      setPreview(URL.createObjectURL(uploadedFile));
    }
  };

  const handleUpload = () => {
    if (!file || !title || !price) {
      alert("Please provide a title, price, and select a picture before uploading.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const newArtwork = {
        id: Date.now(),
        title,
        description,
        price: `$${price}`,
        image: reader.result,
      };

      // ✅ Get logged-in artist username
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (!currentUser || currentUser.role !== "Artist") {
        alert("You must be logged in as an Artist to upload artworks.");
        return;
      }
      const username = currentUser.username;

      // ✅ Update artistData in context
      const updatedArtistData = { ...artistData };
      if (!updatedArtistData[username]) updatedArtistData[username] = [];
      updatedArtistData[username].push(newArtwork);
      setArtistData(updatedArtistData);

      alert("Artwork uploaded successfully 🎨");

      // Reset fields
      setTitle("");
      setDescription("");
      setPrice("");
      setFile(null);
      setPreview("");
    };

    reader.readAsDataURL(file);
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
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: -1,
        }}
      ></div>

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
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ color: "black", fontWeight: "bold" }}
        >
          Upload Artwork
        </Typography>

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
            <Typography variant="subtitle1">Preview:</Typography>
            <img
              src={preview}
              alt="Preview"
              style={{
                width: "100%",
                borderRadius: 8,
                marginTop: "8px",
              }}
            />
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
