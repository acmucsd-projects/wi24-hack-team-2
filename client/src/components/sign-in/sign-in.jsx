import './sign-in.css';
import { Link } from 'react-router-dom'


export default function SignIn() {
    return (
        <main>
            <head>
                <style>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Karla"></link>
                </style>
            </head>

            <body id="signin">
                <div className='sign-in-div'>
                    <h1>sign up</h1>
                </div>

                <div>
                    <div className='sign-in-div'>
                        <input type="email" className="input-field" placeholder="email"/>
                    </div>

                    <div className='sign-in-div'>
                        <input type="password" className="input-field" placeholder="password"/>
                    </div>

                    <div>
                        <Link to="/home">
                            <input type="button" className="input-button" value="next"/>
                        </Link>
                    </div>
                </div>
            </body>
        </main>
    );
}