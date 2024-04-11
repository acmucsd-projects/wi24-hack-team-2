import React from 'react';
import './Schedule.css';
//put css in a css file and import
const Schedule = () => {

    //put java script code here
  return (
    //put html code here
    <div className="schedule">
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
            <div class="events">
            </div>
          </div>
        </div>
      </div>
      {/* <table border = "5" cellspacing = "5" align = "center"> 
        <tr>
          <th align="center" height="50" width="100">Time</th>
          <th align="center" height="50" width="100">Monday</th>
          <th align="center" height="50" width="100">Tuesday</th>
          <th align="center" height="50" width="100">Wednesday</th>
          <th align="center" height="50" width="100">Thursday</th>
          <th align="center" height="50" width="100">Friday</th>
        </tr>
        <tr>
          <td>8:00</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>8:30</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>9:00</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>9:30</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>10:30</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>11:00</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>11:30</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>12:00</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>12:30</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>1:00</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>1:30</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>2:00</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>2:30</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>3:00</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>3:30</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>4:00</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>4:30</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>5:00</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>5:30</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>6:00</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>6:30</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>7:00</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>7:30</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>8:00</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>8:30</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>9:00</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>9:30</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>

      </table> */}
    </div>
  );
};

export default Schedule;
