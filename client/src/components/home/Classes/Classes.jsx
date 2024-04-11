import React, { useContext } from "react";
import "./Classes.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { SelectedClassesContext } from "../../../App";

//put css in a css file and import
const Classes = () => {
  const { selectedClasses, setSelectedClasses } = useContext(
    SelectedClassesContext,
  );

  console.log(selectedClasses);

  const removeCourse = (code) => {
    setSelectedClasses(selectedClasses.filter((c) => c.code !== code));
  };

  return (
    //put html code here
    <div className="Classes">
      <link rel="stylesheet" href="Classes.css" />
      <h2 class="header">classes</h2>

      <div className="card-container">
        {selectedClasses.map((c) => (
          <div className="card" id={c.code}>
            <div className="card-body">
              <h3 className="card-title">{c.code}</h3>
              <p className="card-profs">{c.profs.join(", ")}</p>
            </div>

            <input
              type="button"
              className="delete-button"
              value="x"
              onClick={() => {
                removeCourse(c.code);
              }}
            />
          </div>
        ))}
      </div>

      <div className="add-class">
        <Link to="/addclass">
          <input type="button" className="input-button" value="add class" />
        </Link>
      </div>
    </div>
  );
};

export default Classes;
