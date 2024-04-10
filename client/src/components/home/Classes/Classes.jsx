import React from 'react';
import './Classes.css';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';

//put css in a css file and import
const Classes = () => {

  const classes = [
    {
      name: "CSE 30", 
      selectedProfs: ["Paul Cao", "Keith Muller"],
    },
    {
      name: "ECON 1", 
      selectedProfs: ["Meredith Crane"],
    },
  ];

  return (
    //put html code here
    <div className="Classes">
      <link rel="stylesheet" href="Classes.css" />
      <h2 class = "header">classes</h2>

      <div className="card-container">
        {classes.map((c) => (
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">{c.name}</h3>
              <p className="card-profs">{c.selectedProfs.join(", ")}</p>
            </div>
            
            <input type="button" className="delete-button" value="x"/>
        </div>
        ))}
        
      </div>

      <div className="add-class">
          <Link to="/addclass">
              <input type="button" className="input-button" value="add class"/>
          </Link>
      </div>
    </div>
  );
};

export default Classes;
