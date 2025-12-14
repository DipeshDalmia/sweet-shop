const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const sweetRoutes = require("./routes/sweetRoute");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://sweet-shop-green.vercel.app"
    ],
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

module.exports = app;
