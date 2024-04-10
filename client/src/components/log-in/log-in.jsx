import axios from 'axios'
import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './log-in.css';



export default function LogIn() {
    const navigate= useNavigate();
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
            const response = await axios.post('http://localhost:4000/api/users/login', {
                email: values.email,
                password: values.password,
            });
            const token = response.data.token;

            setError(null);
            setSuccess('Log in successful!')
            console.log('User logged in successfully. Token:', token);
            console.log(response.data);
            navigate('/home');
            
        } catch (error) {
            setSuccess(null);
            setError(error.response.data.error)
            
            console.log('User log up unsuccessful:', error.response.data.error, error)
    
        }
    };

    return (
        <main id="login">
                <div>
                    <h1>log in</h1>
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
                            <input type="submit" class="input-button" value="log in"/>
                        </div>
                    </form>
                    <div className='text-warning'>
                        {error && error}
                        {success && success}
                </div>
                <div>
                
                </div>
            
                </div>
            </main>
    );
}
