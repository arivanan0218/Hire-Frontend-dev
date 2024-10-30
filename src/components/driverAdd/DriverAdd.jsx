import React, { useState } from 'react';
import Logo from "../../assets/icons/MainLogo.png";
import { useNavigate } from 'react-router-dom';
import './DriverAdd.css';

export const DriverAdd = () => {
    const navigate = useNavigate(); // Call useNavigate inside the component

    const [formData, setFormData] = useState({
        fullName: '',
        nic: '',
        phone: '',
        seats: '',
        pickupPoint: '',
        droppingPoint: '',
        vehicleType: '',
        price: '',
        date: '',
        time: ''
    });

    const districts = [
        'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 
        'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 
        'Kilinochchi', 'Kurunegala', 'Mannar', 'Matale', 'Matara', 'Moneragala', 
        'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura', 
        'Trincomalee', 'Vavuniya'
    ];
    
    const vehicleTypes = [
        'Car', 'Van', 'Bus'
    ];
    
    const seats = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Fetch request to the API to post driver data
        const token = localStorage.getItem('token'); // Adjust based on where your token is stored
        fetch('http://localhost:8081/api/drivers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include token if needed
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Driver added successfully:', data);
            // Optionally reset the form or redirect
            setFormData({
                fullName: '',
                nic: '',
                phone: '',
                seats: '',
                pickupPoint: '',
                droppingPoint: '',
                vehicleType: '',
                price: '',
                date: '',
                time: ''
            });
            navigate('/driver'); // Navigate after successful addition
        })
        .catch(error => console.error('Error adding driver:', error));
    };

    return (
        <div className="container">
            <img src={Logo} alt="Logo" className="logo" />
            <p>Our user-friendly platform makes arranging cost-effective shared journeys simple and secure. Join today and start collaborating on your travels!</p>
            <form onSubmit={handleSubmit} className="form">
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
                <div className='select-container'>
                    <select
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleChange}
                        className='select-item-1'
                        required
                    >
                        <option value="">Vehicle Type</option>
                        {vehicleTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                    <select
                        name="seats"
                        value={formData.seats}
                        onChange={handleChange}
                        className='select-item-2'
                        required
                    >
                        <option value="">Seats</option>
                        {seats.map((seat, index) => (
                            <option key={index} value={seat}>{seat}</option>
                        ))}
                    </select>
                </div>
                <select
                    name="pickupPoint"
                    value={formData.pickupPoint}
                    onChange={handleChange}
                    required
                >
                    <option value="">Starting Point</option>
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
                    <option value="">Ending Point</option>
                    {districts.map((district, index) => (
                        <option key={index} value={district}>{district}</option>
                    ))}
                </select>
                <div className='select-container'>
                    <input
                        type="date"
                        name='date'
                        value={formData.date}
                        onChange={handleChange}
                        className='select-item-1'
                        required
                    />
                    <input
                        type="time"
                        name='time'
                        value={formData.time}
                        onChange={handleChange}
                        className='select-item-2'
                        required
                    />
                </div>
                <input
                    type="number"
                    name="price"
                    placeholder="Price per Person"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Post HIRE</button>
            </form>
        </div>
    );
};

export default DriverAdd;
