import React from 'react';
//put css in a css file and import
const Rating = () => {

    //put java script code here
  return (
    //put html code here
    <div className="rating">
      <form>
        <h2>Teacher Ratings</h2>
        <input type="text" id = "TeacherRatings" name="TeacherRatings" placeholder="Teacher Ratings"></input>
      </form>
    </div>
  );
};

export default Rating;
