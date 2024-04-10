import axios from 'axios'
import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './sign-in.css';



export default function SignIn() {

    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password:'',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('in try')
            const response = await axios.post('http://localhost:4000/api/users/signup', {
                email: values.email,
                password: values.password,
            });
            const token = response.data.token;

            setError(null);
            setSuccess('Sign up successful!')
            console.log('User signed up successfully. Token:', token);
            console.log(response.data);
            navigate('/home');
            
        } catch (error) {
            setSuccess(null);
            setError(error.response.data.error)
            console.log('User sign up unsuccessful:', error.response.data.error, error)
    
        }
    };

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
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input type="email" class="input-field" placeholder="email"
                            onChange={(e)=> setValues({...values, email: e.target.value})}/>
                        </div>

                        <div>
                            <input type="password" class="input-field" placeholder="password"
                            onChange={(e)=> setValues({...values, password: e.target.value})}/>
                        </div>

                        <div>
                        <p>Already a user? <Link to="/login">Login Here</Link></p>
                        </div>

                        <div>
                            <input type="submit" class="input-button" value="sign up"/>
                        </div>
                    </form>

                    

                    <div className='text-warning'>
                        {error && error}
                        {success && success}
                </div>
                
                </div>
            </body>
        </main>
    );
}