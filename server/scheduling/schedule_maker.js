function generateSchedules(courses, currentSchedule = [], allSchedules = []) {
    if (courses.length === 0) {
        allSchedules.push(currentSchedule);
        return;
    }

    const [firstCourse, ...remainingCourses] = courses;
    for (const section of firstCourse.sections) {
        if (currentSchedule.every(scheduledSection => !doSectionsCollide(section, scheduledSection))) {
            generateSchedules(remainingCourses, currentSchedule.concat([section]), allSchedules);
        }
    }
}

// Main function to find all non-colliding schedules
async function findAllNonCollidingSchedules(courseCodes) {
    // Retrieve all sections for each course code
    const coursesWithSections = [];
    for (const code of courseCodes) {
        const sections = await getSectionsForCourse(code);
        coursesWithSections.push({code, sections});
    }

    const allSchedules = [];
    generateSchedules(coursesWithSections, [], allSchedules);

    // Convert schedules to desired format (e.g., list of section codes)
    const formattedSchedules = allSchedules.map(schedule => 
        schedule.map(section => `${section.courseCode}-${section.id}`)
    );

    return formattedSchedules;
}

const doSectionsCollide = (section1, section2) => {
    for (const meeting1 of section1.meetings) {
        for (const meeting2 of section2.meetings) {
            if (doMeetingsCollide(meeting1, meeting2)) {
                return true;
            }
        }
    }
    return false;
};

const doMeetingsCollide = (meeting1, meeting2) => {
    if (meeting1.days.some(day => meeting2.days.includes(day))) {
        const start1 = parseTime(meeting1.startTime);
        const end1 = parseTime(meeting1.endTime);
        const start2 = parseTime(meeting2.startTime);
        const end2 = parseTime(meeting2.endTime);

        return start1 < end2 && start2 < end1;
    }
    return false;
};

const parseTime = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes; // Convert time to minutes for easier comparison
};


// Example usage
const courseCodes = ['CS101', 'MATH202', 'HIST303']; // Example course codes
findAllNonCollidingSchedules(courseCodes).then(schedules => {
    console.log('Possible schedules:', schedules);
});
