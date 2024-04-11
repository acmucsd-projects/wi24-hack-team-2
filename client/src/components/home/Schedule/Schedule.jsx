import React from "react";
import "./Schedule.css";
import { color } from "../../../color";
//put css in a css file and import

const timeTo15MinBlock = (time) => {
  // parse time as HH:MM pm/am
  const d = new Date(Date.parse("01/01/2000 " + time + "m"));
  // move so 8am is 0 hours
  const hour = d.getHours();
  const min = d.getMinutes();

  // round to nearest 15 minutes
  const roundedMin = Math.round(min / 15) * 15;

  const block = hour * 8 + (roundedMin / 15) * 2;

  return block - 8 * 8 + 2;
};

const Schedule = ({ schedule }) => {
  if (!schedule) {
    return <div>No Schedule</div>;
  }

  const dayKeys = ["M", "Tu", "W", "Th", "F", "Sa", "Su"];
  let days = [];
  let extra = [];

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
              startRow: timeTo15MinBlock(meeting.startTime),
              end: meeting.endTime,
              endRow: timeTo15MinBlock(meeting.endTime),
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

  console.log(extra);

  //put java script code here
  return (
    //put html code here
    <div className="schedule">
      <div>
        <h2>special meetings</h2>

        <div
          style={{ display: "flex", flexWrap: "wrap", maxWidth: "90vw", placeContent: "center" }}
        >
          {extra.map((event) => (
            <div
              class="event"
              key={event.name + event.type}
              style={{
                backgroundColor: color(
                  event.title
                    .split(" ")
                    .slice(0, event.title.split(" ").length - 1)
                    .join(" "),
                ),
              }}
            >
              <p class="title">{event.title}</p>
              <p class="time">
                {event.type} || {event.location}
              </p>
              <p class="time">{event.date}</p>
              <p class="time">
                {event.start} - {event.end}
              </p>
            </div>
          ))}
        </div>
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
                      <p class="time">
                        {event.type} || {event.location}
                      </p>
                      <p class="time">
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
