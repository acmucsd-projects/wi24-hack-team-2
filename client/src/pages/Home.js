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
// import Rating from '../components/home/Rating';

const Home = () => {
  const { selectedClasses } = useContext(SelectedClassesContext);
  const [schedules, setSchedules] = useState([]);
  const [idx, setIdx] = useState(0);

  const fetchSchedules = async () => {
    const res = await fetch("http://localhost:4000/api/schedules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseList: selectedClasses.map((course) => course.code),
        blacklist: [],
        graylist: [],
        instrList: selectedClasses.map((course) => course.profs.flat()).flat(),
      }),
    });

    const data = await res.json();
    console.log(data);
    if (typeof data.length === "number") {
      setSchedules(data);
    }
  };

  //put java script code here
  return (
    //put html code here
    <main>
      <div className="home">
        <div>
          <h1>preferences</h1>
        </div>
        <div>
          <Classes />
        </div>
        <div>
          <ClassTimes />
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
export default Home;
