import React from 'react';
import './ClassTimes.css'; // Import the CSS file

const ClassTimes = () => {
  return (
    <div className="ClassTimes">
      <h2 className="header">Class Times</h2>
      <div className="form-container">
        <input type="time" className="classTimes" name="classTimes" placeholder="Class Times"></input>
        <h3 className="header3">to</h3>
        <input type="time" className="classTimes" name="classTimes" placeholder="Class Times"></input>
      </div>
    </div>
  );
};

export default ClassTimes;
