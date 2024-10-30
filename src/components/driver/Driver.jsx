import React, { useEffect, useState } from 'react';
import './Driver.css';
import { RiListSettingsLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { FaPlusCircle } from "react-icons/fa";
import Image from '../../assets/images/dummy1.jpg';
import DriverImage from '../../assets/icons/driver.png';

export const Driver = () => {
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        // Fetch driver data from the API endpoint with authentication
        const token = localStorage.getItem('token'); // Adjust based on where your token is stored
        fetch('http://localhost:8081/api/drivers', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => setDrivers(data))
            .catch(error => console.error('Error fetching drivers:', error));
    }, []);

    return (
        <>
            <div className='driver-top'>
                <div className='driver-icon'><RiListSettingsLine size={30} /></div>
                <h1 className='driver-title landing-title'>Connect with <span>Drivers</span></h1>
                <Link to ="/driverAdd">
                    <div className='driver-icon'><FaPlusCircle size={30} /></div>
                </Link>
                
            </div>
            <div className='driver-content'>
                {drivers.map(driver => (
                    <div className='driver-content-top' key={driver.id}>
                        <div className='driver-content-top-left'>
                            <div className='driver-content-top-left-img'>
                                <img src={Image} alt="Driver" width={110} height={110} />
                            </div>
                            <div className='driver-content-top-left-name-container'>
                                <div className='driver-content-top-left-name-container-top'>
                                    {driver.pickupPoint} - {driver.droppingPoint}
                                </div>
                                <div className='driver-content-top-left-name'>
                                    <span>
                                        <img src={DriverImage} width={26} height={26} alt="Driver Icon" />
                                    </span>
                                    <span>{driver.fullName}</span>
                                </div>
                                <div className='driver-content-top-right-bot'>
                                    {driver.vehicleType}, {driver.seats} seats
                                </div>
                            </div>
                        </div>
                        <div className='driver-content-top-right'>
                            <button className='hireRequestButton'>Request</button>
                            <div className='driver-content-top-right-bot'>
                                {driver.date} | {driver.time} | {driver.price} LKR per person
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Driver;
