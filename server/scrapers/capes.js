const jsdom = require("jsdom");
const axios = require("axios").default;
const Instructor = require("../models/instructor");

async function scrape() {
  const instructors = await Instructor.find({ capes: null });

  const promises = instructors.map((doc) => scrapeInstructor(doc));
  await Promise.all(promises);
}

async function scrapeInstructor(doc) {
  const name = doc.get("name");

  console.log(`[CAPEs] Scraping CAPEs for ${name}`);

  try {
    const html = await getHTMLForInstructor(name);
    if (html.includes("No CAPEs")) {
      console.log(`[CAPEs] No results found for ${name}`);
      return;
    }

    const data = parseHTML(html);
    if (data === null) {
      console.log(`[CAPEs] No results found for ${name}`);
      return;
    }

    // console.log(data);

    doc.set("capes", data);
    await doc.save();
  } catch (e) {
    if (e.message === "CAPEs cookie expired") {
      console.error(`[CAPEs] Cookie expired`);
      return; // TODO: make this quit all promises
    }

    console.error(e);
    return; // TODO: make this quit all promises
  }

  console.log(`[CAPEs] Updated CAPEs for ${name}`);
}

async function getHTMLForInstructor(name) {
  const url = `https://cape.ucsd.edu/responses/Results.aspx?Name=${name}`;
  const response = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Cookie: process.env.CAPES_COOKIE,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to get HTML for instructor");
  }

  return response.data;
}

function parseHTML(html) {
  const dom = new jsdom.JSDOM(html);

  const table = dom.window.document.querySelector(
    "#ContentPlaceHolder1_gvCAPEs > tbody",
  );

  const courses = new Map();

  if (table === null) {
    throw new Error("CAPEs cookie expired");
  }

  // Transform each row to an object and insert into course map
  for (let i = 0; i < table.children.length; i++) {
    const row = table.children[i];

    const course = row.children[1].childNodes
      .item(1)
      .textContent.split("-")[0]
      .trim();

    const term = row.children[2].textContent.trim();

    // Just count short term as the last 3 years (in 2024, 2021 would be the earliest)
    const year = +term.substring(term.length - 2);
    const shortTerm = year >= (new Date().getYear() % 100) - 3;

    const arr = courses.get(course) || [];

    const rcmndClass = parseInt(row.children[5].textContent.trim());
    const rcmndInstr = parseInt(row.children[6].textContent.trim());
    const studyHrs = +row.children[7].textContent.trim();
    const avgGrade = +row.children[9].textContent
      ?.split("(")[1]
      ?.split(")")[0]
      ?.trim();

    arr.push({
      term: term,
      shortTerm: shortTerm,
      rcmndClass,
      rcmndInstr,
      studyHrs,
      avgGrade,
    });
    courses.set(course, arr);
  }

  // console.log(courses);

  // calculate averages for each course and overall

  const averages = new Map();
  courses.forEach((arr, course) => {
    averages.set(course, {
      shortTerm: calcAverages(arr.filter((v) => v.shortTerm)),
      longTerm: calcAverages(arr),
    });
  });

  const overall = {
    shortTerm: calcAverages(
      Array.from(courses.values())
        .flat()
        .filter((v) => v.shortTerm),
    ),
    longTerm: calcAverages(Array.from(courses.values()).flat()),
  };

  return { courses: averages, overall };
}

function calcAverages(arr) {
  if (arr.length === 0) {
    return {};
  }

  return {
    rcmndClass: averageByKey(arr, "rcmndClass"),
    rcmndInstr: averageByKey(arr, "rcmndInstr"),
    studyHrs: averageByKey(arr, "studyHrs"),
    avgGrade: averageByKey(arr, "avgGrade"),
  };
}

function averageByKey(arr, key) {
  const filtered = arr
    .map((v) => v[key])
    .filter((v) => !isNaN(v) && v !== undefined);

  if (filtered.length === 0) {
    return undefined;
  }

  return filtered.reduce((acc, curr) => acc + curr, 0) / filtered.length;
}

module.exports = { scrape };
