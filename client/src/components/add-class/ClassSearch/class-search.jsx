import React from 'react';
import './class-search.css';
import { Combobox } from '@headlessui/react';
import { useState } from 'react';

// taken from https://headlessui.com/react/combobox

const ClassSearch = () => {

    const test = [
        'CSE 12',
        'CSE 11',
        'MATH 20C', 
        'ECON 1'
    ];

    const [selectedClass, setSelectedClass] = useState(test[0]);
    const [query, setQuery] = useState('');

    function ClassCombobox() {
        const [selectedClass, setSelectedClass] = useState(test[0]);
        const [query, setQuery] = useState('');

        /*const filteredClass = 
            query === ''
                ? class
                : class.filter((class) => {
                    return class.toLowerCase().includes(query.toLowerCase());
                })*/
    }

    return (
    //put html code here
        <div>
        <link rel="stylesheet" href="class-search.css" />

            <div>
            <Combobox value={selectedClass} onChange={setSelectedClass}>
                <Combobox.Input onChange={(event) => setQuery(event.target.value)} />

            </Combobox>
            </div>
        </div>
    );
};

export default ClassSearch;
