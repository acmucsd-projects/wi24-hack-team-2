const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');

const scheduleRoutes = require("./routes/schedules");
const userRoutes = require("./routes/users");
const professorRoutes = require("./routes/professor");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(cors({
  origin: ["http://localhost:4000"],
  methods: ['GET','POST','PUT', 'DELETE'],
  credentials: true
}))


//routes
app.use("/api/schedules", scheduleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/professor", professorRoutes);

dotenv.config();

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB database");
  });

module.exports = app;
