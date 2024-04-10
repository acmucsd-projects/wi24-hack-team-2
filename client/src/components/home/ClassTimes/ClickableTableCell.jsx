import React from 'react';
import './ClassTimes.css'; // Import the CSS file
import { useState } from 'react';

const ClickableTableCell = () => {

  const [clickCount, setClickCount] = useState(0);

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
  }

  return (
    <td onClick={handleClick} style={cellStyle}></td>
  );
};

export default ClickableTableCell;