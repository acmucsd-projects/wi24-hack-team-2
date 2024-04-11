import React from "react";
import "./Update.css";
//put css in a css file and import
const Update = ({ onclick }) => {
  //put java script code here
  return (
    //put html code here
    <div className="update">
      <button type="submit" className="update-button" onClick={() => onclick()}>
        Update
      </button>
    </div>
  );
};

export default Update;
