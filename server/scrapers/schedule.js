const Course = require("../models/course");
const fs = require("fs");
const jsdom = require("jsdom");

function scrape() {
  const html = fs.readFileSync("scrapers/schedules.html").toString();

  parseHTML(html);
}

function parseHTML(html) {
  const dom = new jsdom.JSDOM(html);

  const table = dom.window.document.querySelector(".tbrdr > tbody");

  let department;
  let course;
  let units;
  let courses = new Map();

  // First pass
  for (let i = 0; i < table.children.length; i++) {
    const row = table.children[i];

    const departmentQuery = row.querySelector("td > h2 > span.centeralign");
    if (departmentQuery != null) {
      department = departmentQuery.textContent
        .split("(")[1]
        .split(")")[0]
        .trim();
      continue;
    }

    const courseQuery = row.querySelector("td.crsheader");
    if (courseQuery != null) {
      // This is a course header

      course = courseQuery.nextElementSibling.textContent.trim();
      units = courseQuery.nextElementSibling.nextElementSibling.textContent
        .trim()
        .split("(")[1]
        ?.split("Units")[0]
        .trim();
    }

    if (
      row.classList.contains("sectext") ||
      row.classList.contains("nonenrtxt")
    ) {
      const code = `${department} ${course}`;

      if (!courses.has(code)) {
        courses.set(code, []);
      }

      courses.get(code).push({
        units: units,
        type: row.querySelector("#insTyp")?.textContent.trim(),
        section: row.children[3]?.textContent.trim(),
        days: row.children[4]?.textContent.trim(),
        time: row.children[5]?.textContent.trim(),
        location: `${row.children[6]?.textContent?.trim()} ${row.children[7]?.textContent?.trim()}`,
        instructor: row.children[8]?.textContent?.trim(),
      });
    }
  }

  courses.forEach((v, k) => console.log(k, v.length))

  // Second pass to actually get the right format
}

module.exports = { scrape };
