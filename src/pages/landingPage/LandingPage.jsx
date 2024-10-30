import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1 className="landing-title">Find your <span>Convenient</span> <br /> and <span>Comfortable</span> Travel</h1>
      <p>Our user-friendly platform makes arranging cost-effective shared journeys <br />simple and secure. Join today and start collaborating on your travels!</p>
      <div className="button-container">
        {/* <button className='traveler-button'>Traveler</button>
        <button className='driver-button'>Driver</button> */}
        <button className='hireRequestButton'>Request a HIRE</button>
      </div>
    </div>
  );
};

export default LandingPage;
