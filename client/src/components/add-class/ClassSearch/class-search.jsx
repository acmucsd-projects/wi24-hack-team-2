import React, { useMemo } from "react";
import "./class-search.css";
import { Combobox } from "@headlessui/react";
import { useState } from "react";

// taken from https://headlessui.com/react/combobox

const ClassSearch = () => {
    const classes = ["CSE 12", "CSE 11", "MATH 20C", "ECON 1"];

    const [selectedClass, setSelectedClass] = useState(classes[0]);
    const [query, setQuery] = useState("");

    const filteredClasses = useMemo(
        () =>
            query === ""
                ? classes
                : classes.filter((c) => {
                    return c.toLowerCase().includes(query.toLowerCase());
                }),
        [query],
    );

    return (
        //put html code here
        <div>
            <link rel="stylesheet" href="class-search.css" />

            <div>
                <Combobox value={selectedClass} onChange={setSelectedClass}>
                    <Combobox.Input onChange={(event) => setQuery(event.target.value)} />
                    <Combobox.Options>
                        {filteredClasses.length === 0 ? (
                            <span>No results found</span>
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
                <button>Add</button>
            </div>
        </div>
    );
};

export default ClassSearch;
