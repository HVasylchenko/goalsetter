const express = require("express");
const path = require("path");
require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleWare");
const port = process.env.PORT || 5000;
const goalRoutes = require("./routes/goalsRoutes");
const userRoutes = require("./routes/usersRoutes");
const colors = require("colors");
const connectDB = require("./config/db");
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/goals", goalRoutes);
app.use("/api/users", userRoutes);
// console.log(port)

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("Please set a production");
  });
}

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server run on port = ${port}`);
});
