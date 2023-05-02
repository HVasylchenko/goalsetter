const express = require("express");
require("dotenv").config();
const { errorHandler } = require('./middleware/errorMiddleWare');
const port = process.env.PORT || 5000;
const routes = require("./routes/goalsRoutes");
const colors = require('colors');
const connectDB = require('./config/db')
connectDB();

const app = express();
app.use( express.json());
app.use( express.urlencoded({extended: false}));
app.use("/api/goals", routes);
// console.log(port)

app.use( errorHandler)

app.listen(port, () => {
  console.log(`server run on port = ${port}`);
});
