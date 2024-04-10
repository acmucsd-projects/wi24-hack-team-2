import "./add-class.css";
import { Link } from "react-router-dom";
import ClassSearch from "./ClassSearch/class-search";
import Professor from "./Professor/professor";
import { useState, useContext } from "react";
import { SelectedClassesContext } from "../../App";

export default function AddClass() {
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedProfs, setSelectedProfs] = useState([]);

    const { selectedClasses, setSelectedClasses } = useContext(
        SelectedClassesContext,
    );

    const addClass = (e) => {
        if (selectedClass === null || selectedClass === "") {
            e.preventDefault();
            alert("Cannot add blank class");
            return;
        }

        setSelectedClasses((prev) => [
            ...prev,
            {
                code: selectedClass,
                profs: selectedProfs,
            },
        ]);
    };

    return (
        <main id="addclass">
            <h1>add class</h1>

            <div>
                <h2> name </h2>
                <ClassSearch
                    selectedClass={selectedClass}
                    setSelectedClass={setSelectedClass}
                />
            </div>

            <div>
                <h2> professors </h2>
                <Professor
                    selectedClass={selectedClass}
                    setSelectedProfs={setSelectedProfs}
                />
            </div>

            <div>
                <Link to="/home" onClick={addClass}>
                    <input type="button" class="input-button" value="add class" />
                </Link>
            </div>
        </main>
    );
}
