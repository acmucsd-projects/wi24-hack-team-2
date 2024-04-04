import React from 'react';
import './App.css';
import Classes from './components/Classes/Classes';
import ClassTimes from './components/ClassTimes/ClassTimes';
import Update from './components/Update/Update';
import Switch from './components/Switch/Switch';
import Schedule from './components/Schedule/Schedule';
//put css in a css file and import
const App = () => {

    //put java script code here
  return (
    //put html code here
    <div className="App">
      <h1 class = "top">Preferences</h1>
      <Classes />
      <ClassTimes />
      <Update />  
      <Switch />
      <Schedule />
    </div>
  );
};
export default App;
