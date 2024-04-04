import React from 'react';

/*import '../components/home/Classes/Classes';
import '../components/home/ClassTimes/ClassTimes';
import '../components/home/Schedule/Schedule';
import '../components/home/Switch/Switch';
import '../components/home/Update/Update';*/

import ClassTimes from '../components/home/ClassTimes/ClassTimes';
import Classes from '../components/home/Classes/Classes';
import Update from '../components/home/Update/Update';
import Switch from '../components/home/Switch/Switch';
import Schedule from '../components/home/Schedule/Schedule';
// import Rating from '../components/home/Rating';

const Home = () => {

    //put java script code here
  return (
    //put html code here
    <div className="App">
      <h1>Preferences</h1>
      <Classes />
      <ClassTimes />
      <Update />  
      <Switch />
      <Schedule />
    </div>
  );
};
export default Home;