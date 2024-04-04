import React from 'react';
import './Switch.css'; // Import the CSS file

const Switch = () => {
  return (
    <div className="switch">
      <input type="button" id="switch1" name="Previous" value="Previous" />
      <p>#</p>
      <input type="button" id="switch2" name="Next" value="Next" />
    </div>
  );
};

export default Switch;
