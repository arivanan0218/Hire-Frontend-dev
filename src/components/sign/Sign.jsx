import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Sign.css';
import Logo from "../../assets/icons/MainLogo.png";
import { Link } from 'react-router-dom';

const Sign = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // Helper function to validate the password complexity
    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validatePassword(password)) {
            setError('Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character.');
            return;
        }

        try {
            const adminToken = await getAdminToken();

            const response = await axios.post(
                'http://localhost:8080/admin/realms/rentalhome/users',
                {
                    username: username,
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    enabled: true,
                    credentials: [
                        {
                            type: 'password',
                            value: password,
                            temporary: false,
                        },
                    ],
                },
                {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 201) {
                setSuccess('User registered successfully!');
                navigate('/login');
            } else {
                setError('Failed to register user.');
            }
        } catch (error) {
            setError(`Signup error: ${error.response?.data?.error_description || error.message}`);
        }
    };

    return (
        <div className="signup-container">
            <img src={Logo} alt="Logo" className="signin-logo" />
            <p>Our user-friendly platform makes finding affordable rental homes simple and secure. <br />Join today and start your search for the perfect boarding!</p>
            <form onSubmit={handleSignup} className='signup-form'>
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div className="instructions">
                    <p>Password must contain:</p>
                    <ul>
                        <li>At least 8 characters</li>
                        <li>At least one uppercase & one lowercase letter</li>
                        <li>At least one number</li>
                        <li>At least one special character</li>
                    </ul>
                </div>
                <button type="submit">Sign Up</button>
                {success && <p className="success-message">{success}</p>}
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

// Helper function to get admin token
const getAdminToken = async () => {
    const data = new URLSearchParams({
        grant_type: 'password',
        client_id: 'rentalhome-rest-api',
        username: 'arivanan',
        password: 'arivanan',
    });

    try {
        const response = await axios.post(
            'http://localhost:8080/realms/rentalhome/protocol/openid-connect/token',
            data,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        return response.data.access_token;
    } catch (error) {
        throw new Error('Unable to fetch admin token: ' + error.message);
    }
};

export default Sign;
