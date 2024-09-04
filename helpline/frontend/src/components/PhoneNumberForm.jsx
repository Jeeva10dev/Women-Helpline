import React, { useState } from 'react';
import axios from 'axios';
import './stylesheets/PhoneNumberForm.css'

const PhoneNumberForm = ({ onPhoneSubmit }) => {
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onPhoneSubmit(phone);

        // API request to submit the phone number
        const response = axios.post('http://localhost:4000/api/phone', { phone })
            .then((response) => {
                setMessage('Phone number saved successfully!');
            })
            .catch((error) => {
                setMessage('Error saving phone number.');
                console.error('Error:', error);
            });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="phone-form">
                <h2>Email Verification</h2>
                <input
                    type="email"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="input-field"
                />
                <button type="submit" className="submit-button">Submit</button>
                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
};

export default PhoneNumberForm;