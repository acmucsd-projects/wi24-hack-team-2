import React, { useMemo } from "react";
import "./Schedule.css";
import { color } from "../../../color";
//put css in a css file and import

const convertToMinSince8 = (time12h) =>{
  let [time, period] = time12h.split(/(?=[ap])/i); // Split before 'a' or 'p'
  let [hour, minutes] = time.split(':').map(Number); // Extract hour and minutes as numbers
  
  if (period.toLowerCase() === 'p' && hour !== 12) {
      hour += 12; // Add 12 to hour if PM (except for 12 PM)
  } else if (period.toLowerCase() === 'a' && hour === 12) {
      hour = 0; // Convert 12 AM to 0 hour
  }
  
  const hourSince8 = hour-8;
  let total_min=hourSince8 * 60 + minutes;
  if(total_min==0){
    total_min=1;
  }
  return total_min;
};
const convertToRowStart = (time12h) => {
  const total_min=convertToMinSince8(time12h);
  return Math.floor( total_min / 7.4 );
};

const convertToRowEnd = (time12h, startTime) => {
  const startRow= convertToRowStart(startTime);
  const total_min=convertToMinSince8(time12h);
  
  //setting min length of time block based on row start
  return Math.max(Math.ceil(startRow + 7.4), Math.floor( total_min / 7.4 ));
};


const Schedule = ({ schedule }) => {
  console.log(schedule);
  const dayKeys = ["M", "Tu", "W", "Th", "F", "Sa", "Su"];

  const { days, extra } = useMemo(() => {
    const days = [];
    const extra = [];

    if (!schedule) {
      return { days, extra };
    }

    schedule.data.forEach((course, i) => {
      course.meetings.forEach((meeting) => {
        if (meeting.days.length > 0) {
          meeting.days.forEach((day) => {
            const idx = dayKeys.indexOf(day);
            if (idx === -1) {
              console.log("Extra day", day);
            } else {
              if (!days[idx]) {
                days[idx] = [];
              }
              days[idx].push({
                title: schedule.name[i],
                type: meeting.type,
                location: meeting.location,
                prof: course.instructors.join(", "),
                start: meeting.startTime,
                startRow: convertToRowStart(meeting.startTime),
                end: meeting.endTime,
                endRow: convertToRowEnd(meeting.endTime, meeting.startTime),
              });
              
              
            }
          });
        } else {
          extra.push({
            title: schedule.name[i],
            type: meeting.type,
            location: meeting.location,
            prof: course.instructors.join(", "),
            start: meeting.startTime,
            end: meeting.endTime,
            date: meeting.date,
          });
        }
      });
    });
    return { days, extra };
  }, [schedule]);

  if (!schedule) {
    return <div>No Schedule</div>;
  }

  //put java script code here
  return (
    //put html code here
    <div className="schedule">
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          maxWidth: "80vw",
          placeContent: "center",
        }}
      >
        {extra.map((event) => (
          <div
            class="event"
            key={event.name + event.type + Math.random()}
            style={{
              padding: "16px",
              backgroundColor: color(
                event.title
                  .split(" ")
                  .slice(0, event.title.split(" ").length - 1)
                  .join(" "),
              ),
            }}
          >
            <p class="title">{event.title}</p>
            <p>{event.prof}</p>
            <p>
              {event.type} || {event.location}
            </p>
            <p>{event.date}</p>
            <p>
              {event.start} - {event.end}
            </p>
          </div>
        ))}
      </div>
      <div class="calendar">
        <div class="timeline">
          <div class="spacer"></div>
          <div class="time-marker">8 AM</div>
          <div class="time-marker">9 AM</div>
          <div class="time-marker">10 AM</div>
          <div class="time-marker">11 AM</div>
          <div class="time-marker">12 PM</div>
          <div class="time-marker">1 PM</div>
          <div class="time-marker">2 PM</div>
          <div class="time-marker">3 PM</div>
          <div class="time-marker">4 PM</div>
          <div class="time-marker">5 PM</div>
          <div class="time-marker">6 PM</div>
          <div class="time-marker">7 PM</div>
          <div class="time-marker">8 PM</div>
          <div class="time-marker">9 PM</div>
          <div class="time-marker">10 PM</div>
          <div class="time-marker">11 PM</div>
        </div>
        <div class="days">
          {["mon", "tues", "wed", "thurs", "fri"].map((day, i) => (
            <div class="day">
              <div class="date">
                <p class="date-day">{day}</p>
              </div>
              <div class="events">
                {days[i]?.length > 0 &&
                  days[i].map((event) => (
                    <div
                      class="event"
                      key={event.name + event.type}
                      style={{
                        gridRowStart: event.startRow,
                        gridRowEnd: event.endRow,
                        backgroundColor: color(
                          event.title
                            .split(" ")
                            .slice(0, event.title.split(" ").length - 1)
                            .join(" "),
                        ),
                      }}
                    >
                      <p class="title">{event.title}</p>
                      <p>{event.prof}</p>
                      <p>
                        {event.type} || {event.location}
                      </p>
                      <p>
                        {event.start} - {event.end}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
