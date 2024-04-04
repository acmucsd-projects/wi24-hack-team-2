const Course = require("../models/course");
const Instructor = require("../models/instructor");
const fs = require("fs");
const jsdom = require("jsdom");

async function scrape() {
  const html = fs.readFileSync("scrapers/schedules.html").toString();

  const courses = parseHTML(html);

  await saveCourses(courses);
}

async function saveCourses(courses) {
  const instructorsToSave = new Map();
  const coursesToSave = [];

  const allInstructors = new Map(
    (await Instructor.find({})).map((i) => [i.name, i]),
  );

  for (const course of courses) {
    let data = course;

    for (let i = 0; i < data.sections.length; i++) {
      if (!data.sections[i].instructors) {
        data.sections[i].instructors = [];
      }
      data.sections[i].instructors = (
        await Promise.all(
          data.sections[i].instructors.map(async (instructor) => {
            if (["", "Staff", undefined, null].includes(instructor)) {
              return undefined;
            } else {
              if (allInstructors.has(instructor)) {
                return allInstructors.get(instructor)._id;
              } else if (instructorsToSave.has(instructor)) {
                return instructorsToSave.get(instructor)._id;
              } else {
                const instructorDoc = new Instructor({
                  name: instructor,
                  courses: [],
                });

                instructorsToSave.set(instructor, instructorDoc);
                return instructorDoc._id;
              }
            }
          }),
        )
      ).filter((x) => x);
    }

    const doc = new Course(data);

    coursesToSave.push(doc);
  }

  console.log(
    `[Schedule] Inserting ${instructorsToSave.size} instructors and ${coursesToSave.length} courses`,
  );
  await Instructor.insertMany(Array.from(instructorsToSave).map(([_, v]) => v));
  await Course.insertMany(coursesToSave);
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
      if (isNaN(units)) {
        units = undefined; // TODO: deal with this
      }
    }

    if (
      row.classList.contains("sectxt") ||
      row.classList.contains("nonenrtxt")
    ) {
      const code = `${department} ${course}`;

      if (!courses.has(code)) {
        courses.set(code, []);
      }

      const section = row.children[3]?.textContent.trim();
      const date = Date.parse(section);

      const time = row.children[5]?.textContent.trim();
      const [startTime, endTime] = time?.includes("-")
        ? time.split("-")
        : [time, undefined];

      const instructors = row.children[8]?.childNodes
        ? Array.from(row.children[8]?.childNodes)
          .map((node) => node.textContent?.trim())
          .filter((text) => text !== "")
        : [];

      courses.get(code).push({
        units: units,
        type: row.querySelector("#insTyp")?.textContent.trim(),
        section: isNaN(date) ? section : undefined,
        date: isNaN(date) ? undefined : section,
        days: row.children[4]?.textContent.trim(),
        startTime,
        endTime,
        location: `${row.children[6]?.textContent?.trim()} ${row.children[7]?.textContent?.trim()}`,
        instructors,
      });
    }
  }

  return Array.from(courses).map(([code, c]) => {
    let sections = [];
    let currentSections = [];
    let currentLectureInfo = {};
    let currentFirstLetter;
    let sharedMeetings = [];
    let units;
    for (const row of c) {
      if (row.type == "LE") {
        if (
          currentFirstLetter !== undefined &&
          row.section[0] !== currentFirstLetter
        ) {
          sections.push(
            ...currentSections.map((section) => ({
              ...currentLectureInfo,
              ...section,
              meetings: sharedMeetings.concat(section.meetings),
            })),
          );
          currentSections = [];
          sharedMeetings = [];
        }

        currentLectureInfo = {
          instructors: row.instructors,
        };
        units = row.units;

        sharedMeetings.push(rowToMeeting(row));
      } else if (
        row.section?.length === 3 &&
        row.section.substr(row.section.length - 2) !== "00"
      ) {
        currentSections.push({
          section: row.section,
          meetings: [rowToMeeting(row)],
        });
        currentFirstLetter = row.section[0];
      } else {
        sharedMeetings.push(rowToMeeting(row));
      }
    }

    sections.push(
      ...currentSections.map((section) => ({
        ...currentLectureInfo,
        ...section,
        meetings: sharedMeetings.concat(section.meetings),
      })),
    );
    currentSections = [];
    sharedMeetings = [];

    return {
      code,
      units,
      sections,
    };
  });

  // Second pass to actually get the right format
}

function rowToMeeting(row) {
  return {
    type: row.type,
    date: row.date,
    days: row.date ? undefined : parseDays(row.days),
    startTime: row.startTime,
    endTime: row.endTime,
    location: row.location,
  };
}

function parseDays(str) {
  if (typeof str !== "string") {
    return undefined;
  }

  const valid = ["M", "Tu", "W", "Th", "F", "S", "Su"];

  const result = [];
  let cur = "";

  for (const c of str) {
    cur += c;

    if (valid.includes(cur)) {
      result.push(cur);
      cur = "";
    }
  }

  return result;
}

module.exports = { scrape };
