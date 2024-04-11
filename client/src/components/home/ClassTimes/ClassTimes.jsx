import React from "react";
import "./ClassTimes.css"; // Import the CSS file
import { useState, useEffect } from "react";
import ClickableTableCell from "./ClickableTableCell";

const ClassTimes = ({ states, setStates }) => {
  // times from 8am to 11pm
  const times = Array(30)
    .fill(0)
    .map((_, i) => {
      const hour = Math.floor(i / 2) + 8;
      const min = (i % 2) * 30;
      return `${hour % 12 === 0 ? 12 : hour % 12}:${min === 0 ? "00" : "30"} ${hour < 12 ? "am" : "pm"}`;
    });

  return (
    <div className="ClassTimes">
      <h2 className="header">preferred times</h2>
      <p className="paragraph">
        click until red for times that cannot be done and orange for times that
        are not preferred
      </p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button className="edit-button"
          onClick={() => {
            setStates(Array.from({ length: 30 }, () => [0, 0, 0, 0, 0]));
          }}
        >
          clear
        </button>
        <button className="edit-button"
          onClick={() => {
            setStates(Array.from({ length: 30 }, () => [1, 1, 1, 1, 1]));
          }}
        >
          blacklist all
        </button>
        <button className="edit-button"
          onClick={() => {
            setStates(Array.from({ length: 30 }, () => [2, 2, 2, 2, 2]));
          }}
        >
          graylist all
        </button>
      </div>
      <div className="form-container">
        {/* <input type="time" className="classTimes" name="classTimes" placeholder="Class Times"></input> */}
        {/* <h3 className="header3">to</h3> */}
        {/* <input type="time" className="classTimes" name="classTimes" placeholder="Class Times"></input> */}
        <table border="2" cellspacing="0" align="center">
          <tr>
            <th align="center" height="50" width="100">
              Time
            </th>
            <th align="center" height="50" width="100">
              Monday
            </th>
            <th align="center" height="50" width="100">
              Tuesday
            </th>
            <th align="center" height="50" width="100">
              Wednesday
            </th>
            <th align="center" height="50" width="100">
              Thursday
            </th>
            <th align="center" height="50" width="100">
              Friday
            </th>
          </tr>

          {times.map((time, i) => (
            <tr>
              <td>{time}</td>
              {states[i].map((state, j) => (
                <ClickableTableCell
                  count={state}
                  setCount={(count) => {
                    setStates((prevStates) => {
                      const newStates = [...prevStates];
                      newStates[i][j] = count;
                      return newStates;
                    });
                  }}
                />
              ))}
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default ClassTimes;
