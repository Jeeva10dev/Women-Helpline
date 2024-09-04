import React from 'react';
import './stylesheets/SendLocation.css';
import axios from 'axios';

const SendLocation = () => {

    const sendLocationToBackend = async (latitude, longitude, contacts) => {
        try {
            const response = await axios.post('http://localhost:4000/api/sendlocation', {
                latitude,
                longitude,
                contacts
            });

            alert(response.data.message);
        } catch (error) {
            console.error('Error:', error);
            alert('Error sending location.');
        }
    };

    const sendLocationSms = async () => {
        console.log(123);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                console.log(position);

                // Fetch contacts from local storage
                const contacts = JSON.parse(localStorage.getItem('contacts')) || [];

                // Send location to each contact
                await sendLocationToBackend(latitude, longitude, contacts);

                // Open location in Google Maps
                const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
                window.open(googleMapsUrl, '_blank');
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    return (
        <div className='parent-container'>
            <button onClick={sendLocationSms} className='location-button'>Send My Location</button>
        </div>
    );
};

export default SendLocation;