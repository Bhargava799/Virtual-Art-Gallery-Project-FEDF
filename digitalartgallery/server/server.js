const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// API Routes
const exhibitionRoutes = require("./routes/exhibitions");
const userRoutes = require("./routes/users");

app.use("/api/exhibitions", exhibitionRoutes);
app.use("/api/users", userRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send("Server is running & DB is connected!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
