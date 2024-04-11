import React, { useContext, useState } from "react";

/*import '../components/home/Classes/Classes';
import '../components/home/ClassTimes/ClassTimes';
import '../components/home/Schedule/Schedule';
import '../components/home/Switch/Switch';
import '../components/home/Update/Update';*/

import "../components/home/home.css";
import ClassTimes from "../components/home/ClassTimes/ClassTimes";
import Classes from "../components/home/Classes/Classes";
import Update from "../components/home/Update/Update";
import Switch from "../components/home/Switch/Switch";
import Schedule from "../components/home/Schedule/Schedule";
import { SelectedClassesContext } from "../App";
import DisplayUser from '../components/home/DisplayUser/DisplayUser'

// import Rating from '../components/home/Rating';

const Home = () => {
  const { selectedClasses } = useContext(SelectedClassesContext);
  const [schedules, setSchedules] = useState([]);
  const [idx, setIdx] = useState(0);

  const [pickerStates, setPickerStates] = useState(
    Array.from({ length: 30 }, () => [0, 0, 0, 0, 0]),
  );

  const fetchSchedules = async () => {
    const res = await fetch("http://localhost:4000/api/schedules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseList: selectedClasses.map((course) => course.code),
        blacklist: getList(pickerStates, 1),
        graylist: getList(pickerStates, 2),
        instrList: selectedClasses.map((course) => course.profs.flat()).flat(),
      }),
    });

    const data = await res.json();
    if (typeof data.length === "number") {
      setSchedules(data);
    }
  };

  //put java script code here
  return (
    //put html code here
    <main>
      <div className="home">
        <div><DisplayUser /></div>
        <div>
          <Classes />
        </div>
        <div>
          <ClassTimes states={pickerStates} setStates={setPickerStates} />
        </div>
        <div>
          <Update
            onclick={() => {
              fetchSchedules();
            }}
          />
        </div>
        <div>
          <Switch idx={idx} setIdx={setIdx} len={schedules.length} />
        </div>
        <div>
          <Schedule schedule={schedules[idx]} />
        </div>
      </div>
    </main>
  );
};

const getList = (states, val) => {
  const blacklist = [];

  // for each day
  for (let i = 0; i < 5; i++) {
    // find consecutive ranges of value 1
    let start = -1;
    let end = -1;

    let ranges = [];

    for (let j = 0; j < 30; j++) {
      if (states[j][i] === val) {
        if (start === -1) {
          start = j;
        }
        end = j + 1;
      } else {
        if (start !== -1) {
          ranges.push([start, end]);
          start = -1;
          end = -1;
        }
      }
    }

    if (start !== -1) {
      ranges.push([start, end]);
    }

    // add ranges to blacklist
    ranges.forEach((range) => {
      blacklist.push(
        `${dayKeys[i]} ${idxToTime(range[0])} ${idxToTime(range[1])}`,
      );
    });
  }

  return blacklist;
};

const idxToTime = (idx) => {
  // 8am to 11pm
  const hour = Math.floor(idx / 2) + 8;
  const min = (idx % 2) * 30;
  return `${hour % 12 === 0 ? 12 : hour % 12}:${min === 0 ? "00" : "30"}${hour < 12 ? "a" : "p"}`;
};

const dayKeys = ["M", "Tu", "W", "Th", "F"];

export default Home;
