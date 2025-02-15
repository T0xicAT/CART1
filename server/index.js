require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config/config");
const passport = require("passport");
const { jwtStrategy } = require("./config/passport");
const authRoutes = require("./routes/qart/auth.route");
const productsRoutes = require("./routes/qart/product.route"); // Add products route

const app = express();

// Configure CORS
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend's origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

mongoose.connect(config.mongoose.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.use("/api/auth", authRoutes);
app.use("/api", productsRoutes); // Use products route

app.get("/", (req, res) => {
  res.send("Hello welcome to Cart Project");
});

app.listen(config.port, () => {
  console.log(`Listening to port ${config.port}`);
});