import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Logo from "../../assets/icons/MainLogo.png";
import './OtpVerification.css';
import { useNavigate } from 'react-router-dom';

export const OtpVerification = () => {
    const [userCode, setUserCode] = useState('');
    const [message, setMessage] = useState('');
    const storedCode = localStorage.getItem("verificationCode");
    const formData = JSON.parse(localStorage.getItem("formData"));

    
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserCode(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userCode === storedCode) {
            // Prepare the email parameters for sending travel details to the driver
            const emailParams = {
                full_name: formData.fullName,
                nic: formData.nic,
                phone: formData.phone,
                seats: formData.seats,
                pickup_point: formData.pickupPoint,
                dropping_point: formData.droppingPoint
            };

            try {
                await emailjs.send(
                      'service_w4a673y',         // Replace with your EmailJS Service ID
                     'template_zqe19ge', // Replace with your Driver Template ID
                     emailParams,
                     '2rneYXJeCq7r8q2_R'          // Replace with your EmailJS public key
                );
                setMessage("Travel details successfully sent to the driver!");
                localStorage.removeItem("verificationCode");
                localStorage.removeItem("formData");

                navigate('/driver');
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

            {/* Display the message for OTP verification status */}
            {message && <p className="otp-verification-message">{message}</p>}
        </div>
    );
};

export default OtpVerification;
