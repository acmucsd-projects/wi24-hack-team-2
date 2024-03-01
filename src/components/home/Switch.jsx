import React from 'react';
//put css in a css file and import
const Switch = () => {

    //put java script code here
  return (
    //put html code here
    <div className="switch">
      <input type = "button" id = "switch1" name="Previous" value="Previous"></input>
      <p>#</p>
      <input type = "button" id = "switch2" name="Next" value="Next"></input>
    </div>
  );
};

export default Switch;