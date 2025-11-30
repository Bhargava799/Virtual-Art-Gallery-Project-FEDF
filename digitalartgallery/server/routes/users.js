const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Save single user
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    return res.status(201).json({ message: "User saved", user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Fetch all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
