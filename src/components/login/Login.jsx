import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import qs from 'qs'; // Import qs to handle URL-encoded data
import "./Login.css";
import Logo from "../../assets/icons/MainLogo.png";
import { Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post(
                'http://localhost:8080/realms/rentalhome/protocol/openid-connect/token',
                qs.stringify({
                    grant_type: 'password',
                    client_id: 'rentalhome-rest-api',
                    username,
                    password,
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );

            const token = response.data.access_token;
            localStorage.setItem('token', token);
            localStorage.setItem('refresh_token', response.data.refresh_token);

            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const userRoles = decodedToken.realm_access?.roles || [];

            localStorage.setItem('roles', JSON.stringify(userRoles));

            if (userRoles.includes('admin')) {
                navigate('/driver');
            } else if (userRoles.includes('user')) {
                navigate('/home');
            } else {
                setError('No valid role found. Please contact admin.');
            }
        } catch (error) {
            console.error('Login error:', error.response || error.message);
            setError('Invalid username or password');
        }
    };

    return (
        <div className="signup-container">

            <img src={Logo} alt="Logo" className="signin-logo" />
            <p>
                Our user-friendly platform makes finding affordable rental homes simple and secure.
                <br />Join today and start your search for the perfect boarding!
            </p>

            <form onSubmit={handleSubmit} className="signup-form">
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default Login;
