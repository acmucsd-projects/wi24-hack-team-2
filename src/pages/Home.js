import React from 'react';
import '../components/home/home.css';
import ClassTimes from '../components/home/ClassTimes';
import Classes from '../components/home/Classes';
import Update from '../components/home/Update';
import Switch from '../components/home/Switch';
import Schedule from '../components/home/Schedule';
import Rating from '../components/home/Rating';

const Home = () => {

    //put java script code here
  return (
    //put html code here
    <div className="App">
      <h1>Preferences</h1>
      <Classes />
      <ClassTimes />
      <Rating />
      <Update />  
      <Switch />
      <Schedule />
    </div>
  );
};
export default Home;