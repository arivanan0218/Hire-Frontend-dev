import React, { useState } from 'react';
import Logo from "../../assets/icons/MainLogo.png";
import './Sign.css';

const Sign = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        nic: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
        // Add your form submission logic here
    };

    return (
        <div className="signup-container">
            <img src={Logo} alt="Logo" className="signin-logo" />
            <p>Our user-friendly platform makes arranging cost-effective shared journeys simple and secure. Join today and start collaborating on your travels!</p>
            <form onSubmit={handleSubmit} className="signup-form">
                <input
                    type="text"
                    name="firstName"
                    placeholder='First Name'
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder='Last Name'
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="nic"
                    placeholder='NIC no'
                    value={formData.nic}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder='Email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder='Password'
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

            </form>
            <div className="instructions">
                <p>-  At least 8 characters<br />-  At least one upper case & lower case<br />-  At least one digit<br />-  At least one special character</p>
            </div>
            <button type="submit">Sign up</button>
            <a href="/">Back to home</a>

        </div>
    );
};

export default Sign;
