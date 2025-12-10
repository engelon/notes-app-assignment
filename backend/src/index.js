const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");


dotenv.config();
require("./db"); // initializes SQLite DB

const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Notes API is running" });
});

app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
