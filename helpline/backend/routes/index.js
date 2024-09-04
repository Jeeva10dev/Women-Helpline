const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

require('dotenv').config();

// Global variable to store the user's email and OTP
let userEmail = '';
let currentOtp = '';

// Create a Nodemailer transporter object
let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Route to handle phone number submission
router.post('/phone', async (req, res) => {
    const { phone } = req.body; // Use 'email' instead of 'phoneNumber' as we're sending OTP to email

    if (!phone) {
        return res.status(400).json({ message: 'Email is required' });
    }

    console.log(`Email received: ${phone}`);

    // Generate a random OTP (e.g., 6 digits)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    currentOtp = otp;

    console.log(currentOtp);
    console.log(otp);

    const mailOptions = {
        from: 'sharmajeevanshu410@gmail.com',
        to: phone,
        subject: 'Your OTP',
        text: `Your OTP is ${otp}`,
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error sending OTP' });
    }
});



router.post('/verify', (req, res) => {
    const { otp } = req.body;

    if (otp === currentOtp) {
        return res.status(200).json({ message: 'OTP verified successfully' });
    } else {
        return res.status(400).json({ message: 'Invalid OTP' });
    }
});


// Route to handle sending location to contacts
router.post('/sendlocation', async (req, res) => {
    const { latitude, longitude, contacts } = req.body;

    console.log(latitude);
    console.log(longitude);
    console.log(contacts);

    if (!contacts || contacts.length === 0) {
        return res.status(400).json({ message: 'No contacts to send location to.' });
    }

    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

    console.log(googleMapsUrl);

    try {
        const mailPromises = contacts.map(contact => {
            const mailOptions = {
                from: 'sharmajeevanshu410@gmail.com',
                to: contact.email,
                subject: 'Location Update',
                text: `Hi ${contact.name},\n\nHere is the location you requested:\nLatitude: ${latitude}\nLongitude: ${longitude}\nView on Google Maps: ${googleMapsUrl}`
            };

            return transporter.sendMail(mailOptions);
        });

        await Promise.all(mailPromises);
        res.status(200).json({ message: 'Location sent to all contacts successfully!' });
    } catch (error) {
        console.error('Error sending location:', error);
        res.status(500).json({ message: 'Error sending location to contacts.' });
    }
});





module.exports = router;