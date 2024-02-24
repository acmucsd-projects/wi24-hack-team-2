const mongoose = require("mongoose");

const CAPESchema = new mongoose.Schema({
  avgGrade: {
    type: String,
    required: true,
  },
  recommendInstructor: {
    type: Number,
    required: true,
  },
  recommendClass: {
    type: Number,
    required: true,
  },
});

const SETSchema = new mongoose.Schema({
  // I have no idea what SET gives us
});

const courseSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    term: {
      type: String,
      required: true,
    },
    CAPE: {
      type: CAPESchema,
    },
    SET: {
      type: SETSchema,
    },
  },
  { timestamps: true },
);

// Just an idea for this
const rmpSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
  },
});

const instructorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    courses: [courseSchema],
    rmp: {},
  },
  { timestamps: true },
);

const Instructor = mongoose.model("Instructor", instructorSchema);

module.exports = Instructor;
