import React from "react";
import "./professor.css";
import { useState, useEffect } from "react";
//put css in a css file and import

const Professor = () => {
    // https://stackoverflow.com/questions/386281/how-to-implement-select-all-check-box-in-html
    /*function toggle(source) {
                  let checkboxes = document.getElementsByName('professor');
                  for(var checkbox in checkboxes)
                      checkbox.checked=source.checked;
              }*/

    const [profs, setProfs] = useState([
        {
            name: "Paul Cao",
            classGrade: "3.3",
            overallGrade: "3.4",
            selected: false,
        },
        {
            name: "Miles Jones",
            classGrade: "2.3",
            overallGrade: "2.9",
            selected: false,
        },
        {
            name: "Meridith Crane",
            classGrade: "1.3",
            overallGrade: "4.0",
            selected: false,
        },
    ]);

    const changeProfState = (prof, selected) => {
        setProfs(
            profs.map((p) => {
                if (p.name === prof.name) {
                    return { ...p, selected };
                }
                return p;
            }),
        );
    };

    useEffect(() => {
        console.log(profs.filter((prof) => prof.selected));
    }, [profs]);

    return (
        //put html code here
        <div class="professor">
            <link rel="stylesheet" href="Classes.css" />
            <div>
                {profs.map((prof) => (
                    <div class="container">
                        <input
                            id={prof.name}
                            type="checkbox"
                            name="professor"
                            value={prof.name}
                            onChange={(event) => changeProfState(prof, event.target.checked)}
                        ></input>
                        <label for={prof.name}>
                            {prof.name}
                            <p class="subheading">
                                history course GPA: {prof.classGrade} || overall GPA:{" "}
                                {prof.overallGrade}
                            </p>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Professor;
