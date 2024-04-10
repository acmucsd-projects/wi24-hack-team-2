import React from 'react';
import './ClassTimes.css'; // Import the CSS file
import { useState } from 'react';
import ClickableTableCell from './ClickableTableCell';

const ClassTimes = () => {

  /*const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    console.log('handleclick')
    setClickCount(prevCount => (prevCount + 1) % 3);
  };

  let cellStyle = {};
  if (clickCount === 1) {
    cellStyle.backgroundColor = '#E7BBB8';
  } else if (clickCount == 2) {
    cellStyle.backgroundColor = '#E9C39D';
  } else {
    cellStyle.backgroundColor = '#EEE9E6';
  }*/

  return (
    <div className="ClassTimes">
      <h2 className="header">preferred times</h2>
      <p className = "paragraph">click until red for times that cannot be done and orange for times that are not preferred</p>
      <div className="form-container">
        {/* <input type="time" className="classTimes" name="classTimes" placeholder="Class Times"></input> */}
        {/* <h3 className="header3">to</h3> */}
        {/* <input type="time" className="classTimes" name="classTimes" placeholder="Class Times"></input> */}
        <table border = "2" cellspacing = "0" align = "center"> 
          <tr>
            <th align="center" height="50" width="100">Time</th>
            <th align="center" height="50" width="100">Monday</th>
            <th align="center" height="50" width="100">Tuesday</th>
            <th align="center" height="50" width="100">Wednesday</th>
            <th align="center" height="50" width="100">Thursday</th>
            <th align="center" height="50" width="100">Friday</th>
          </tr>
          <tr>
            <td>8:00</td>
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
          </tr>
          <tr>
            <td>8:30</td>
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
          </tr>
          <tr>
            <td>9:00</td>
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
          </tr>
          <tr>
            <td>9:30</td>
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
          </tr>
          <tr>
            <td>10:30</td>
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
          </tr>
          <tr>
            <td>11:00</td>
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
          </tr>
          <tr>
            <td>11:30</td>
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
          </tr>
          <tr>
            <td>12:00</td>
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
          </tr>
          <tr>
            <td>12:30</td>
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
          </tr>
          <tr>
            <td>1:00</td>
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
          </tr>
          <tr>
            <td>1:30</td>
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
          </tr>
          <tr>
            <td>2:00</td>
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
          </tr>
          <tr>
            <td>2:30</td>
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
          </tr>
          <tr>
            <td>3:00</td>
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
          </tr>
          <tr>
            <td>3:30</td>
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
          </tr>
          <tr>
            <td>4:00</td>
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
          </tr>
          <tr>
            <td>4:30</td>
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
          </tr>
          <tr>
            <td>5:00</td>
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
          </tr>
          <tr>
            <td>5:30</td>
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
          </tr>
          <tr>
            <td>6:00</td>
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
          </tr>
          <tr>
            <td>6:30</td>
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
          </tr>
          <tr>
            <td>7:00</td>
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
          </tr>
          <tr>
            <td>7:30</td>
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
          </tr>
          <tr>
            <td>8:00</td>
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
          </tr>
          <tr>
            <td>8:30</td>
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
          </tr>
          <tr>
            <td>9:00</td>
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
          </tr>
          <tr>
            <td>9:30</td>
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
          </tr>
          <tr>
            <td>10:00</td>
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
          </tr>
          <tr>
            <td>10:30</td>
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
            <ClickableTableCell />
          </tr>

      </table>
      </div>
    </div>
  );
};

export default ClassTimes;
