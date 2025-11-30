const express = require("express");
const Artwork = require("../models/Artwork");
const router = express.Router();

// Upload new artwork
router.post("/", async (req, res) => {
  try {
    const artwork = await Artwork.create(req.body);
    res.json(artwork);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all artworks
router.get("/", async (req, res) => {
  try {
    const artworks = await Artwork.find();
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete artwork
router.delete("/:id", async (req, res) => {
  try {
    await Artwork.findByIdAndDelete(req.params.id);
    res.json({ message: "Artwork deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
