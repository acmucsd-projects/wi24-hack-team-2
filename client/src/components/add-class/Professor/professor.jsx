import React from "react";
import "./professor.css";
import { useState, useEffect } from "react";
//put css in a css file and import

const Professor = ({ selectedClass, setSelectedProfs }) => {
    const [profs, setProfs] = useState([]);
    const [all, setAll] = useState(false);

    const fetchProfs = async (selectedClass) => {
        const res = await fetch("http://localhost:4000/api/professor", {
            method: "POST",
            body: JSON.stringify({ courseCode: selectedClass }),
            headers: { "Content-Type": "application/json" },
        });

        const json = await res.json();

        if (typeof json === "object" && typeof json.length === "number") {
            setProfs(json);
        }
    };

    useEffect(() => {
        fetchProfs(selectedClass);
    }, [selectedClass]);

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

    // very troll but too late
    useEffect(() => {
        if (all) {
            setSelectedProfs([]);
        } else {
            setSelectedProfs(profs.filter((p) => p.selected).map((p) => p.name));
        }
    }, [profs]);

    return (
        //put html code here
        <div class="professor">
            <link rel="stylesheet" href="Classes.css" />
            <div>
                {selectedClass !== null ? (
                    <div>
                        <div class="container">
                            <input
                                type="checkbox"
                                name="professor"
                                id="all"
                                value={all}
                                onChange={(event) => setAll(event.target.checked)}
                            ></input>
                            <label for="all">
                                any professor
                                <p className="subheading"></p>
                            </label>
                        </div>
                        {profs.map((prof) => (
                            <div class="container">
                                <input
                                    id={prof.name}
                                    type="checkbox"
                                    name="professor"
                                    value={prof.name}
                                    onChange={(event) =>
                                        changeProfState(prof, event.target.checked)
                                    }
                                ></input>
                                <label for={prof.name}>
                                    {prof.name}
                                    <p class="subheading">
                                        average course GPA:{" "}
                                        {prof.course.short?.gpa ?? prof.course.long?.gpa ?? "?"} || overall
                                        GPA: {prof.overall.short?.gpa ?? prof.course.long?.gpa ?? "?"}
                                    </p>
                                    <p class="subheading">
                                        average course rcmnd:{" "}
                                        {Math.round(
                                            prof.course.short?.rcmnd ?? prof.course.long?.rcmnd,
                                        ) || "?"}
                                        % || overall rcmnd:{" "}
                                        {Math.round(
                                            prof.overall.short?.rcmnd ?? prof.course.long?.rcmnd,
                                        ) || "?"}
                                        %
                                    </p>
                                </label>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="subheading">select a class to see professor options</p>
                )}
            </div>
        </div>
    );
};

export default Professor;
