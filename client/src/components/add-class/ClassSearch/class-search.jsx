import React, { useMemo } from "react";
import "./class-search.css";
import { Combobox } from "@headlessui/react";
import { useState, useEffect } from "react";

// taken from https://headlessui.com/react/combobox

const ClassSearch = ({ selectedClass, setSelectedClass }) => {
    const [classes, setClasses] = useState([]);

    const fetchClasses = async () => {
        const res = await fetch("http://localhost:4000/api/courses");
        const data = await res.json();
        setClasses(data);
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    const [query, setQuery] = useState("");

    const filteredClasses = useMemo(
        () =>
            query.length < 2
                ? []
                : classes.filter((c) => {
                    return c.includes(query);
                }),
        [query, classes],
    );

    return (
        //put html code here
        <div>
            <link rel="stylesheet" href="class-search.css" />

            <div className="combobox">
                <Combobox value={selectedClass} onChange={setSelectedClass}>
                    <Combobox.Input
                        id="box"
                        onChange={(event) => setQuery(event.target.value.toUpperCase())}
                    />
                    <Combobox.Options id="options">
                        {filteredClasses.length === 0 ? (
                            <span>
                                {query.length < 2
                                    ? "Enter at least 2 characters to search"
                                    : "No results found"}
                            </span>
                        ) : (
                            filteredClasses.map((c) => (
                                <Combobox.Option
                                    key={c}
                                    value={c}
                                    className={({ active }) =>
                                        active ? "active combobox-option" : "combobox-option"
                                    }
                                >
                                    {c}
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Combobox>
            </div>
        </div>
    );
};

export default ClassSearch;
