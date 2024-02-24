const Course = require("../models/course")

function scrape() {
  console.log("would get the schedule here and save it to mongodb")
  const course = new Course()
}

module.exports = { scrape };
