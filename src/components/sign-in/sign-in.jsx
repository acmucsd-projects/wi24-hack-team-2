import './sign-in.css';


export default function SignIn() {
    return (
        <main>
            <head>
                <style>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Karla"></link>
                </style>
            </head>

            <body>
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
                        <input type="button" class="input-button" value="next"/>
                    </div>
                </div>
            </body>
        </main>
    );
}