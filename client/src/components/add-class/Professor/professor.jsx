import React from 'react';
import './professor.css';
//put css in a css file and import

const testProfs = [
    {id: 1, name: 'Paul Cao'},
    {id: 2, name: 'Miles Jones'}, 
    {id: 3, name: 'Meredith Crane'}
];

const Professor = () => {
    // https://stackoverflow.com/questions/386281/how-to-implement-select-all-check-box-in-html
    /*function toggle(source) {
        let checkboxes = document.getElementsByName('professor');
        for(var checkbox in checkboxes)
            checkbox.checked=source.checked;
    }*/
    

    return (
        //put html code here
        <div class="professor">
            <link rel="stylesheet" href="Classes.css" />
            <div>
                <div class="container">
                    <input type="checkbox" name="professor" value="professor1"></input>
                    <label for="professor1">Professor 1</label>
                    <p class="subheading">average grade: 82.5% || recommend prof: 90%</p> 
                </div>

                <div class="container">
                    <input type="checkbox" name="professor" value="any"></input>
                    <label for="any">any professor</label>
                </div>
            </div>
        </div>
    );
};

export default Professor;
