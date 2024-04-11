import React from 'react';
import './ClassTimes.css'; // Import the CSS file

const ClickableTableCell = ({count, setCount}) => {
  const handleClick = () => {
    setCount((count + 1) % 3);
  };

  let cellStyle = {};
  if (count === 1) {
    cellStyle.backgroundColor = '#E7BBB8';
  } else if (count == 2) {
    cellStyle.backgroundColor = '#E9C39D';
  } else {
    cellStyle.backgroundColor = '#EEE9E6';
  }

  return (
    <td onClick={handleClick} style={cellStyle}></td>
  );
};

export default ClickableTableCell;
