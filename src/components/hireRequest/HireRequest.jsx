import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Logo from "../../assets/icons/MainLogo.png";
import './HireRequest.css';
import { useNavigate, useParams } from 'react-router-dom';

export const HireRequest = () => {
    const { id } = useParams(); // Extract ID from the URL
    const [formData, setFormData] = useState({
        fullName: '',
        nic: '',
        phone: '',
        email: '',
        seats: '',
        pickupPoint: '',
        droppingPoint: ''
    });

    const navigate = useNavigate(); // Initialize the navigate function

    const districts = [
        "District 1",
        "District 2",
        "District 3",
        "District 4"
        // Add more districts as needed
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Generate a random 6-digit OTP
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        localStorage.setItem("verificationCode", verificationCode);
        localStorage.setItem("formData", JSON.stringify(formData));

        // Prepare the email parameters for sending OTP
        const emailParams = {
            to_email: formData.email, // Send OTP to the entered email
            to_name: formData.fullName,
            verification_code: verificationCode,
            reply_to: formData.email,
        };

        try {
            // Validate email before sending
            if (formData.email && validateEmail(formData.email)) {
                console.log('Sending OTP to:', formData.email);

                await emailjs.send(
                    'service_w4a673y',         // Replace with your EmailJS Service ID
                    'template_ww0cmwa',       // Replace with your Driver Template ID
                    emailParams,
                    '2rneYXJeCq7r8q2_R'       // Replace with your EmailJS User ID
                );
                console.log('OTP sent successfully to:', formData.email);

                // Redirect to OTP verification page with driver ID
                navigate(`/otpVerification/${id}`);
                
            } else {
                console.error("Invalid email address.");
            }
        } catch (error) {
            console.error("Failed to send OTP:", error);
        }
    };

    // Simple email validation function
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    return (
        <div className="signup-container">
            <img src={Logo} alt="Logo" className="signin-logo" />
            <p>Provide your information to hire a ride quickly and easily!</p>
            <form onSubmit={handleSubmit} className="signup-form">
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="nic"
                    placeholder="NIC No"
                    value={formData.nic}
                    onChange={handleChange}
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone No"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="seats"
                    placeholder="No of Seats"
                    value={formData.seats}
                    onChange={handleChange}
                    required
                />
                <select
                    name="pickupPoint"
                    value={formData.pickupPoint}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Pickup Point</option>
                    {districts.map((district, index) => (
                        <option key={index} value={district}>{district}</option>
                    ))}
                </select>
                <select
                    name="droppingPoint"
                    value={formData.droppingPoint}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Dropping Point</option>
                    {districts.map((district, index) => (
                        <option key={index} value={district}>{district}</option>
                    ))}
                </select>
                <button type="submit">Send Request</button>
            </form>
        </div>
    );
};

export default HireRequest;
