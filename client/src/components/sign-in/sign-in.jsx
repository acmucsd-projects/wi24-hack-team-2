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
                <div>
                    <h1>sign up</h1>
                </div>

                <div>
                    <div>
                        <input type="email" class="input-field" placeholder="email"/>
                    </div>

                    <div>
                        <input type="password" class="input-field" placeholder="password"/>
                    </div>

                    <div>
                        <Link to="/home">
                            <input type="button" class="input-button" value="next"/>
                        </Link>
                    </div>
                </div>
            </body>
        </main>
    );
}