require("dotenv").config();
const express = require("express");
const app = express();
const port = 8000;
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const { ConnectedToMongoDB } = require("./connections/connection");
const userRouter = require("./routes/auth");
const categoriesRouter = require("./routes/categoriesRouter");
const coursesRouter = require("./routes/coursesRouter");
ConnectedToMongoDB("mongodb://localhost:27017/Adv-Comp-Program")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/auth", userRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/courses", coursesRouter);
app.listen(port, () => {
  console.log("Server Running on : " + port);
});
