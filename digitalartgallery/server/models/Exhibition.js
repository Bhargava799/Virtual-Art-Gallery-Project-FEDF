const mongoose = require("mongoose");

const ExhibitionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  images: { type: [String], required: true }, // base64 strings
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Exhibition", ExhibitionSchema);
