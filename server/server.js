require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));

// Routes
app.use("/api/contact", contactRoutes);

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
