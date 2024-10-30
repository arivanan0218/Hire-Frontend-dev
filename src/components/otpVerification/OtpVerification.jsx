import React, { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';
import axios from 'axios';
import Logo from "../../assets/icons/MainLogo.png";
import './OtpVerification.css';
import { useNavigate, useParams } from 'react-router-dom';

export const OtpVerification = () => {
    const [userCode, setUserCode] = useState('');
    const [message, setMessage] = useState('');
    const [driverEmail, setDriverEmail] = useState('');
    const storedCode = localStorage.getItem("verificationCode");
    const formData = JSON.parse(localStorage.getItem("formData"));
    const { id } = useParams(); // Get driver ID from URL
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token'); // Read the token from localStorage

        // Fetch driver email using the ID
        const fetchDriverEmail = async () => {
            if (id) {
                try {
                    const response = await axios.get(`http://localhost:8081/api/drivers/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}` // Include token in the request headers
                        }
                    });

                    if (response.data && response.data.email) {
                        setDriverEmail(response.data.email);
                    } else {
                        setMessage("Driver email not found.");
                    }
                } catch (error) {
                    console.error("Error fetching driver email:", error);
                    setMessage("Failed to retrieve driver email.");
                }
            } else {
                setMessage("Driver ID is not available.");
            }
        };

        fetchDriverEmail();
    }, [id]);

    const handleChange = (e) => {
        setUserCode(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userCode === storedCode) {
            const emailParams = {
                full_name: formData.fullName,
                nic: formData.nic,
                mail: driverEmail,
                seats: formData.seats,
                pickup_point: formData.pickupPoint,
                dropping_point: formData.droppingPoint
            };

            try {
                if (!driverEmail) {
                    setMessage("Driver email not found.");
                    return;
                }

                // Send email using EmailJS
                const response = await emailjs.send(
                    'service_w4a673y',          // Replace with your EmailJS Service ID
                    'template_zqe19ge',         // Replace with your Driver Template ID
                    emailParams,
                    '2rneYXJeCq7r8q2_R'         // Replace with your EmailJS public key
                );

                if (response.status === 200) {
                    setMessage("Travel details successfully sent to the driver!");
                    localStorage.removeItem("verificationCode");
                    localStorage.removeItem("formData");

                    // Redirect to the specific hire route using the ID
                    navigate(`/hire/${id}`); // Redirect to the hire page with the driver ID
                } else {
                    setMessage("Failed to send details to the driver. Please try again.");
                }
            } catch (error) {
                console.error("Failed to send details:", error);
                setMessage("Error sending details to the driver. Please try again.");
            }
        } else {
            setMessage("Invalid verification code. Please try again.");
        }
    };

    return (
        <div className="otp-verification-container">
            <img src={Logo} alt="Logo" className="logo" />
            <div className='otp-verification-title'>Verify Your Request</div>
            <p className='otp-verification-description'>
                Please enter the 6-digit verification code that was sent to your message inbox. The code is valid for 2 minutes.
            </p>
            <div className='otp-verification-input-title'>Verification Code</div>

            <form className="form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="code"
                    placeholder="123123"
                    value={userCode}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Verify Code</button>
            </form>

            {message && <p className="otp-verification-message">{message}</p>}
        </div>
    );
};

export default OtpVerification;
