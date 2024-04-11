import React from "react";
import "./Switch.css"; // Import the CSS file

const Switch = ({ idx, setIdx, len }) => {
  return (
    <div className="switch">
      <input
        type="button"
        id="switch1"
        name="Previous"
        value="Previous"
        disabled={idx - 1 < 0}
        onClick={() => {
          setIdx(idx - 1);
        }}
      />
      <p>#{len === 0 ? 0 : idx + 1}</p>
      <input
        type="button"
        id="switch2"
        name="Next"
        value="Next"
        disabled={idx + 1 > len}
        onClick={() => {
          setIdx(idx + 1);
        }}
      />
    </div>
  );
};

export default Switch;
