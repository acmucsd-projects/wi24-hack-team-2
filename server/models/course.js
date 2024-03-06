const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      // required: true,
      // enum: ["LE", "DI", "SE", "IN", "LA", "MI", "FI"], // More of these exist I'm sure
    },
    days: [
      {
        type: String,
        enum: ["M", "Tu", "W", "Th", "F", "S", "Su"],
      },
    ],
    date: {
      type: String,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    location: {
      // probably want to change this at some point
      type: String,
    },
  },
  { timestamps: true },
);

const sectionSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      required: true,
    },
    meetings: {
      type: [meetingSchema],
    },
    instructors: [mongoose.Types.ObjectId],
    seats: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true },
);

const courseSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    units: {
      type: Number,
    },
    sections: [sectionSchema],
  },
  { timestamps: true },
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
