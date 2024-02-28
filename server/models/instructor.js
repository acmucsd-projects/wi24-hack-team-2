const mongoose = require("mongoose");

const capesEntryPart = new mongoose.Schema({
  avgGrade: {
    type: Number,
  },
  rcmndInstr: {
    type: Number,
  },
  rcmndClass: {
    type: Number,
  },
  studyHrs: {
    type: Number,
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
