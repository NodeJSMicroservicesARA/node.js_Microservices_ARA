const express = require('express');
const axios = require('axios');
const router = express.Router();

// Create a new emergency
router.post('/emergencies', async (req, res) => {
  try {
    const { callerName, phoneNumber, emergencyType, location } = req.body;

    // Make a request to User Management service to retrieve user information
    const userManagementResponse = await axios.get('http://localhost:8081/users/current', {
      headers: {
        Authorization: req.headers.authorization
      }
    });

    // Extract user information from the User Management service response
    const { userId, name, email } = userManagementResponse.data;

    // Create a new emergency instance
    const emergency = new Emergency({
      callerName,
      phoneNumber,
      emergencyType,
      location,
      userId,
      userName: name,
      userEmail: email
    });

    // Save the emergency to the database
    const savedEmergency = await emergency.save();

    res.status(201).json({
      message: 'Emergency created successfully',
      emergency: savedEmergency
    });
  } catch (error) {
    console.error('Error creating emergency:', error.message);
    res.status(500).json({
      error: 'An error occurred while creating the emergency'
    });
  }
});

module.exports = router;