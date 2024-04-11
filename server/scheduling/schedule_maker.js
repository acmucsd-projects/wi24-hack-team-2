const mongoose = require('mongoose');
const Course = require("../models/course")
const Instructor = require("../models/instructor")
// const client = mongoose(process.env.DB_URL);
// const database = client.db('test'); 
// const collection = database.collection('courses');

// Check if courses are valid in database, might be relevant if database is not up to date with drop-down menu
// Returns true if list of courses is all valid, throws Error if not
const checkCourseValidity = async (courseList) => {
    for (let code of courseList) {
        const existingItem = await Course.findOne({ code: code });
        if (!existingItem) {
            throw new Error(`Item with code '${code}' does not exist.`);
        }
    }
    console.log('All items exist in the database.');
    return true;
}


const doesSectionFit = async (currentEnrolledSections, newSection) => {
    for (section of currentEnrolledSections) {
        const sectionsCollide = await doSectionsCollide(section, newSection);
        if (sectionsCollide) {
            return false;
        }
    }
    return true;
}

const doSectionsCollide = async (section1, section2) => {
    for (meeting1 of section1.meetings) {
        for (meeting2 of section2.meetings) {
            const collision = await doMeetingsCollide(meeting1, meeting2);
            if (collision) {
                return true;
            }
        }
    }
    return false;
}

// updating this because I feel like there could be issues with the finals & midterms, because those don't have days
// update this to ignore non-number times
// update parseTime too
const doMeetingsCollide = async (meeting1, meeting2) => {
    if (meeting1.type === "FI" && meeting2.type === "FI"){
        if (meeting1.date === meeting2.date){
            const start1 = await parseTime(meeting1.startTime);
            const end1 = await parseTime(meeting1.endTime);
            const start2 = await parseTime(meeting2.startTime);
            const end2 = await parseTime(meeting2.endTime);

            return start1 < end2 && start2 < end1;
        }
        return false;
    }
    if (meeting1.type === "MI"){
        if (meeting2.type === "MI"){
            if (meeting1.date === meeting2.date){
                const start1 = await parseTime(meeting1.startTime);
                const end1 = await parseTime(meeting1.endTime);
                const start2 = await parseTime(meeting2.startTime);
                const end2 = await parseTime(meeting2.endTime);

                return start1 < end2 && start2 < end1;
            }
            return false;
        }
        const day = await dayOfWeek(meeting1.date);
        if (meeting2.days.includes(day)) {
            const start1 = await parseTime(meeting1.startTime);
            const end1 = await parseTime(meeting1.endTime);
            const start2 = await parseTime(meeting2.startTime);
            const end2 = await parseTime(meeting2.endTime);

            return start1 < end2 && start2 < end1;
        }
        return false;
    }

    if(meeting2.type === "MI"){
        const day = await dayOfWeek(meeting2.date);
        if (meeting1.days.includes(day)) {
            const start1 = await parseTime(meeting1.startTime);
            const end1 = await parseTime(meeting1.endTime);
            const start2 = await parseTime(meeting2.startTime);
            const end2 = await parseTime(meeting2.endTime);

            return start1 < end2 && start2 < end1;
        }
        return false;
    }

    if (meeting1.days.some(day => meeting2.days.includes(day))) {
        const start1 = await parseTime(meeting1.startTime);
        const end1 = await parseTime(meeting1.endTime);
        const start2 = await parseTime(meeting2.startTime);
        const end2 = await parseTime(meeting2.endTime);

        return start1 < end2 && start2 < end1;
    }
    return false;
};

// This part might not work for years after 2100
const dayOfWeek = async (dateString) => {
    const [month, day, year] = dateString.split('/').map(Number);
    const yy = year - 2000; // only works for 2000 - 2099
    const yearCode = (yy + Math.floor(yy/4)) % 7;
    const monthCodes = [0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5];
    const monthCode = monthCodes[month - 1];
    const centuryCode = 6; // only works for 2000 - 2099
    const leapYear = 0;
    if (month < 3) {
        if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) {
            leapYear = -1;
        }
    }
    const dayNum = (yearCode + monthCode + centuryCode + day - leapYear) % 7;
    const days = ["Su", "M", "Tu", "W", "Th", "F", "Sa"];
    return days[dayNum];
};

// I don't think this works with the am and pm so I'll update that. 
const parseTime = async (timeString) => {
    let offset = 0;
    const ampm = timeString.slice(timeString.length - 1);
    if (ampm === "a"){
        offset = 0;
    }
    else if (ampm === "p"){
        offset = 720;
    }
    const [hours, minutes] = (timeString.slice(0, timeString.length - 1)).split(':').map(Number);
    return offset + hours * 60 + minutes; // Convert time to minutes for easier comparison
};

const sortInstrList = async (instrList) => {
    // sort by course? short term? long term?
    if (instrList.length <= 1) {
        return instrList;
    }
    let pivot = instrList[0]; 
    let leftList = [];
    let rightList = [];

    for (let i = 1; i < instrList; i++) {
        if (instrList[i].capes?.overall.shortTerm.rcmndInstr < pivot.capes?.overall.shortTerm.rcmndInstr) { //this can be adjusted, or put as a parameter
            leftList.push(instrList[i]);
        }
        else {
            rightList.push(instrList[i])
        }
    }
    return [...(sortInstrList(leftList)), pivot, ...(sortInstrList(rightList))];
}

const makeSchedule = async (courseList, blacklist, graylist, instrList) => {
    const valid = await checkCourseValidity(courseList);
    if (!valid) {
        console.log("invalid schedule");
    }
    const sectionOptions = [];

    // find the top professors, add their sections only
    if (instrList.length > 0) {
        // go through the professors available for a course, find only professors in list
        for (const courseCode of courseList) {
            const courseSections = [];
            // check section.instructor.0 in the instructors database
            // find DIFFERENT instructors and put all the instructors for the class in a list with the scores
            const course = await Course.findOne({ code: courseCode });
            if (!course) {
                return [];
            }

            course.get("sections").forEach(section => {
                section.get("instructors").forEach(instr => {
                    if (instrList.includes(instr)) {
                        courseSections.push(section);
                    }
                })
            });
            sectionOptions.push(courseSections);
        }
    }
    else {
        for (const courseCode of courseList) {
            const courseSections = [];
            const course = await Course.findOne({ code: courseCode });
            if (!course) {
                return [];
            }

            course.get("sections").forEach(section => {
                courseSections.push(section);
            });
            sectionOptions.push(courseSections);
        }
    }
    // We have a list of all sections with the professors (if that was chosen)
    // go through black list and remove all times that are on there
    // if at any point this leaves no sections for a certain course, output a message
    for (const time of blacklist) {
        const timeSplit = time.split(' ');
        const meeting = [{type: "Blacklist", days: [timeSplit[0]], startTime: timeSplit[1], endTime: timeSplit[2]}];
        const fakeSection = {meetings: meeting};
        for (let course of sectionOptions) {
            for (let i = 0; i < course.length; i++) {
                const section = course[i];
                const sectionsCollide = await doSectionsCollide(fakeSection, section);
                if (sectionsCollide){
                    course.splice(i, 1);
                    i--;
                }
            }
            if (course.length == 0) {
                throw new Error(`Course with code '${courseList[sectionOptions.indexOf(course)]}' conflicts with blacklist times. Consider changing some of them.`);
            }
        }
    }

    // go through gray list and remove all times that are on there
    // if at any point this leaves no sections for a certain course, ignore the gray list for that course, and output a message
    for (const time of graylist) {
        const timeSplit = time.split(' ');
        const meeting = [{type: "Graylist", days: [timeSplit[0]], startTime: timeSplit[1], endTime: timeSplit[2]}];
        const fakeSection = {meetings: meeting};
        for (let course of sectionOptions) {
            for (let i = 0; i < course.length; i++) {
                const section = course[i];
                const sectionsCollide = await doSectionsCollide(fakeSection, section);
                if (sectionsCollide){
                    course.splice(i, 1);
                    i--;
                }
            }
            if (course.length == 0) {
                course = tempCourse;
                console.log(`Unable to match course with code '${courseList[sectionOptions.indexOf(course)]}' with graylist`);
            }
        }
    }
    // should first order sectionOptions to go from least section classes to most section classes
    let schedules = [];
    for (const section of sectionOptions[0]) {
        schedules.push([section]);
    }
    for (let i = 1; i < sectionOptions.length; i++) {
        const tempSchedule = [];
        for (const section of sectionOptions[i]){
            for (const schedule of schedules) {
                const sectionFits = await doesSectionFit(schedule, section);
                if (sectionFits) {
                    tempSchedule.push([...schedule, section])
                }
            }
            if (tempSchedule.length == 0) {
                throw new Error(`No schedule exists with all criteria; please change some and try again`);
            }
        }
        schedules = tempSchedule;
    }
    const nice_text = [];
    console.log(schedules);
    for (const schedule of schedules){
        const str = [];
        for (let i = 0; i < schedule.length; i++){
            str.push(courseList[i] + " " + schedule[i].section);
        }
        nice_text.push(str);
    }

    const ret = [];
    for (let i = 0; i < nice_text.length; i++) {
        const schedule = {
            name: nice_text[i],
            data: schedules[i]
        };
        ret.push(schedule);
    }
    console.log(ret);

    return ret;
    // push the schedules to Mongo
}

const findProfs = async (courseCode) => {
    const course = await Course.findOne({ code: courseCode });
    if (!course) {
        return [];
    }
    const instrList = [];
    course.get("sections").forEach(section => {
        section.get("instructors").forEach(instr => {
            if (!instrList.includes(instr.toString())) {
                instrList.push(instr.toString());
            }
        })
    });

    const result = [];

    for (const id of instrList) {
        const instr = await Instructor.findOne({ _id: id });
        if (!instr) {
            continue;
        }
        const capes = instr.get("capes");
        result.push({
            name: instr.get("name"),
            overall: {
                short: {
                    gpa: roundTwoPlaces(capes.get("overall").get("shortTerm").get("avgGrade") ),
                    rcmnd: roundTwoPlaces(capes.get("overall").get("shortTerm").get("rcmndInstr")),
                },
                long: {
                    gpa: roundTwoPlaces(capes.get("overall").get("longTerm").get("avgGrade")),
                    rcmnd: roundTwoPlaces(capes.get("overall").get("longTerm").get("rcmndInstr")),
                }
            },
            course: {
                short: {
                    gpa: roundTwoPlaces(capes.get("courses").get(courseCode)?.get("shortTerm").get("avgGrade")),
                    rcmnd: roundTwoPlaces(capes.get("courses").get(courseCode)?.get("shortTerm").get("rcmndInstr")),
                },
                long: {
                    gpa: roundTwoPlaces(capes.get("courses").get(courseCode)?.get("longTerm").get("avgGrade")),
                    rcmnd: roundTwoPlaces(capes.get("courses").get(courseCode)?.get("longTerm").get("rcmndInstr")),
                }
            }
        });
    }

    console.log(result)

    return result;
}

const roundTwoPlaces = (num) => {
    return Math.round(num * 100) / 100;
}

module.exports = {
    makeSchedule,
    findProfs
}


// const scheduleList = makeSchedule([], ["CSE 12", "CSE 15L", "WCWP 10A"], ["M 12:00p 1:00p", "Tu 7:00p 8:00p"], ["W 12:00p 1:00p", "Th 7:00p 8:00p"], false, true)

// // Example usage:
// const currentEnrolledSections = [/* ... array of section objects the user is already enrolled in ... */];
// const newCourse = {/* ... course object with sections ... */};

// const availableSections = findNonCollidingSections(currentEnrolledSections, newCourse);
