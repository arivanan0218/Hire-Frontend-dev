import React, { useState } from 'react';
import Logo from "../../assets/icons/MainLogo.png";
import './VerifyHire.css';

export const VerifyHire = () => {

    return (
        <div className="container">
            <img src={Logo} alt="Logo" className="logo" />
            <div className='otp-verification-title'>Verify Your HIRE</div>
            <p className='otp-verification-description'>Please enter the 6-digit verification code that was sent to your message inbox. The code is valid for 2 minutes.</p>
                            <div className='otp-verification-input-title'>Verification Code</div>
            <form className="form">
                <input
                    type="text"
                    name="code"
                    placeholder="123123"
                    required
                />
               
                <button type="submit">Verify Code</button>
            </form>
        </div>
    );
};

export default VerifyHire;
