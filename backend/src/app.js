const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const fieldRoutes = require("./routes/field.routes");
const updateRoutes = require("./routes/update.routes");

const app = express();

app.use("/auth", authRoutes);
app.use("/fields", fieldRoutes);
app.use("/fields", updateRoutes);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SmartSeason API running...");
});

module.exports = app;
