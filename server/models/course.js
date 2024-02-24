const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["LE", "DI", "SE", "IN", "LA", "FI"], // More of these exist I'm sure
    },
    days: [
      {
        type: String,
        enum: ["M", "Tu", "W", "Th", "F", "Sa", "Su"],
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
    id: {
      type: String,
      required: true,
      unique: true,
    },
    meetings: {
      type: [[meetingSchema]],
    },
    instructor: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const courseSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    sections: [sectionSchema],
  },
  { timestamps: true },
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
