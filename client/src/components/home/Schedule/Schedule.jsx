import React from "react";
import "./Schedule.css";
//put css in a css file and import
export const Schedule = ({ schedule }) => {
  //put java script code here
  return (
    //put html code here
    <div className="schedule">
      <samp>{JSON.stringify(schedule)}</samp>
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
          <div class="day mon">
            <div class="date">
              <p class="date-day">mon</p>
            </div>
            <div class="events">
              <div class="event start-2 end-5 securities">
                <p class="title">Securities Regulation</p>
                <p class="time">2 PM - 5 PM</p>
              </div>
            </div>
          </div>
          <div class="day tues">
            <div class="date">
              <p class="date-day">tues</p>
            </div>
            <div class="events">
              <div class="event start-10 end-12 corp-fi">
                <p class="title">Corporate Finance</p>
                <p class="time">10 AM - 12 PM</p>
              </div>
              <div class="event start-1 end-4 ent-law">
                <p class="title">Entertainment Law</p>
                <p class="time">1PM - 4PM</p>
              </div>
            </div>
          </div>
          <div class="day wed">
            <div class="date">
              <p class="date-day">wed</p>
            </div>
            <div class="events">
              <div class="event start-12 end-1 writing">
                <p class="title">Writing Seminar</p>
                <p class="time">11 AM - 12 PM</p>
              </div>
              <div class="event start-2 end-5 securities">
                <p class="title">Securities Regulation</p>
                <p class="time">2 PM - 5 PM</p>
              </div>
            </div>
          </div>
          <div class="day thurs">
            <div class="date">
              <p class="date-day">thurs</p>
            </div>
            <div class="events">
              <div class="event start-10 end-12 corp-fi">
                <p class="title">Corporate Finance</p>
                <p class="time">10 AM - 12 PM</p>
              </div>
              <div class="event start-1 end-4 ent-law">
                <p class="title">Entertainment Law</p>
                <p class="time">1PM - 4PM</p>
              </div>
            </div>
          </div>
          <div class="day fri">
            <div class="date">
              <p class="date-day">fri</p>
            </div>
            <div class="events"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
