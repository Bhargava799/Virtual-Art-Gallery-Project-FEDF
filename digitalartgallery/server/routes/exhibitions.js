const express = require("express");
const router = express.Router();
const Exhibition = require("../models/Exhibition");

// GET → fetch all exhibitions
router.get("/", async (req, res) => {
  try {
    const exhibitions = await Exhibition.find();
    res.json(exhibitions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch exhibitions" });
  }
});

// POST → store exhibition
router.post("/", async (req, res) => {
  try {
    const newExhibition = new Exhibition(req.body);
    await newExhibition.save();
    res.status(201).json({ message: "Exhibition saved to DB" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save exhibition" });
  }
});

module.exports = router;
