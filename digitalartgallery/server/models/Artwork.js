const mongoose = require("mongoose");

const ArtworkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: String,
  image: { type: String, required: true },
  artist: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Artwork", ArtworkSchema);
