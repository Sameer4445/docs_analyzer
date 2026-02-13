require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const uploadRoutes = require("./routes/uploadRoutes");
const qaRoutes = require("./routes/qaRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", uploadRoutes);
app.use("/api", qaRoutes);
app.get("/", (req, res) => {
  res.send("Server working");
});


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
