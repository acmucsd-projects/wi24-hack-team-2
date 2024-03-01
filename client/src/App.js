import React from 'react';
import './App.css';
import ClassTimes from './components/ClassTimes';
import Classes from './components/Classes';
import Update from './components/Update';
import Switch from './components/Switch';
import Schedule from './components/Schedule';
import Rating from './components/Rating';
//put css in a css file and import
const App = () => {

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
export default App;
