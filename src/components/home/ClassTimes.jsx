import React from 'react';
//put css in a css file and import
const ClassTimes = () => {

    //put java script code here
  return (
    //put html code here
    <div className="ClassTimes">
      <form>
        <h2>Class Times</h2>
        <input type="time" id = "classTimes" name="classTimes" placeholder="Class Times"></input>
      </form>
    </div>
  );
};

export default ClassTimes;