import './add-class.css';
import { Link } from 'react-router-dom'
import ClassSearch from './ClassSearch/class-search';
import Professor from './Professor/professor';


export default function AddClass() {
    return (
        <main>
            <head>
                <style>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Karla"></link>
                    <link rel="stylesheet" href="./add-class.css"></link>
                </style>
            </head>

            <body>
                <h1>add class</h1>

                <div>
                    <h2> name </h2>
                    <ClassSearch />
                </div>

                <div>
                    <h2> professors </h2>
                    <Professor />
                </div>

            </body>
        </main>
    );
}