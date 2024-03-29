const jsdom = require("jsdom");
const axios = require("axios").default;
const cliProgress = require("cli-progress");
const Instructor = require("../models/instructor");
const { parseHTML: linkedomParse } = require("linkedom");

async function scrape() {
  const instructors = await Instructor.find({});

  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  bar.start(instructors.length, 0);

  const promises = instructors.map(
    async (doc) => await scrapeInstructor(doc, bar),
  );

  const docsToUpdate = (await Promise.all(promises)).filter(
    (doc) => doc !== undefined,
  );

  console.log(`[CAPEs] Updating ${docsToUpdate.filter.length} instructors`);

  console.log(docsToUpdate);

  await Instructor.bulkWrite(
    docsToUpdate.map((doc) => ({
      updateOne: {
        filter: { _id: doc._id },
        update: { $set: doc },
        upsert: true,
      },
    })),
  );

  bar.stop();
}

async function scrapeInstructor(doc, bar) {
  const name = doc.get("name");

  // console.log(`[CAPEs] Scraping CAPEs for ${name}`);

  try {
    const html = await getHTMLForInstructor(name);
    if (html.includes("No CAPEs")) {
      // console.log(`[CAPEs] No results found for ${name}`);
      bar.increment();
      return;
    }

    const data = parseHTML(html);
    if (data === null) {
      // console.log(`[CAPEs] No results found for ${name}`);
      bar.increment();
      return;
    }

    // console.log(data);

    // console.log(`[CAPEs] Got CAPEs for ${name}`);

    doc.set("capes", data);
    bar.increment();
    return doc;
  } catch (e) {
    if (e.message === "CAPEs cookie expired") {
      console.error(`[CAPEs] Cookie expired`);
      return; // TODO: make this quit all promises
    }

    console.error(e);
    return; // TODO: make this quit all promises
  }
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

async function parseHTML(html) {
  // const dom = new jsdom.JSDOM(html);
  //
  // const table = dom.window.document.querySelector(
  //   "#ContentPlaceHolder1_gvCAPEs > tbody",
  // );
  const { document } = linkedomParse(html);
  const table = document.querySelector("#ContentPlaceHolder1_gvCAPEs > tbody");

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
