const Course = require("../models/course")
const fs = require('fs')
const jsdom = require("jsdom");

function scrape() {
  const html = fs.readFileSync("test.html").toString()
  
  parseHTML(html)  
}

function parseHTML(html) {
  const dom = new jsdom.JSDOM(html);
  
  const table = dom.window.document.querySelector(".tbrdr > tbody");
  
  let department;

  for (let i = 0; i < table.children.length; i++) {
    const row = table.children[i];
    
    const departmentQuery =  row.querySelector('td > h2 > span.centeralign');
    if (departmentQuery  != null) {
      department = departmentQuery.innerHTML;
      continue;
    }
    
  }
}

module.exports = { scrape };
