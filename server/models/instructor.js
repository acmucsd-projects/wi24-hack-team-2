const mongoose = require("mongoose");

const capesEntryPart = new mongoose.Schema({
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

const capesEntrySchema = new mongoose.Schema({
  shortTerm: capesEntryPart,
  longTerm: capesEntryPart,
});

const instructorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    courses: [mongoose.Types.ObjectId], // TODO: implement this on scraper side
    capes: new mongoose.Schema({
      courses: {
        type: Map,
        of: capesEntrySchema,
      },
      overall: {
        type: capesEntrySchema,
      },
    }),
  },
  { timestamps: true },
);

const Instructor = mongoose.model("Instructor", instructorSchema);

module.exports = Instructor;
