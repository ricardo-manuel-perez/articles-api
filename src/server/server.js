const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { notFound, errorHandler } = require("../middleware/error_handler");

// routes
const userRoute = require("../routes/users");
const articleRouter = require("../routes/articles");
const favouritesRouter = require("../routes/favourites");
const followRouter = require("../routes/follower");
const { PUBLIC_FOLDER_PATH } = require("../constants");

// server
const app = express();
app.use(PUBLIC_FOLDER_PATH, express.static("public"));
app.use(express.json());
app.use(cors());
app.use(helmet());

// routes

app.get("/", (req, res) => {
  res.json({ status: "API is running" });
});
app.use("/api", userRoute);
app.use("/api", articleRouter);
app.use("/api", favouritesRouter);
app.use("/api", followRouter);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
