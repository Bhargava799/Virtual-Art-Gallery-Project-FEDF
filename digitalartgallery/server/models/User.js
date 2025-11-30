const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  role: { type: String, required: true }, // Visitor, Artist, Admin, Curator
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
