const jsdom = require("jsdom");
const axios = require("axios").default;

async function scrape() {
  const test = await getHTMLForInstructor("Muller, P Keith");
  parseHTML(test);
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

  // Transform each row to an object and insert into course map
  for (let i = 0; i < table.children.length; i++) {
    const row = table.children[i];

    const course = row.children[1].childNodes.item(1).textContent.split("-")[0].trim();

    const arr = courses.get(course) || [];
    arr.push({
      term: row.children[2].textContent.trim(),
      rcmndClass: parseInt(row.children[5].textContent.trim()),
      rcmndInstr: parseInt(row.children[6].textContent.trim()),
      studyHrs: +row.children[7].textContent.trim(),
      avgGrade: +row.children[9].textContent.split("(")[1].split(")")[0].trim(),
    });
    console.log(arr);
    courses.set(course, arr);
  }

  console.log(courses)

  // calculate averages for each course and overall
  const year = new Date().getYear() % 100;
  console.log(year);
}

module.exports = { scrape };
