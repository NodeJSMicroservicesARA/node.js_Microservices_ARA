const express = require('express');
const connectDB = require('./db');
const emergencyRoutes = require('./routes/emergency');
const axios = require('axios');


const app = express();
const port = 8082;

// Connect to MongoDB
connectDB();

// Set up middleware
app.use(express.json());

// Set up routes
app.use('/emergencies', emergencyRoutes);


// Make a request to the microservice

app.get("/microservice", async (req, res) => {

    console.log('hello call');

    try {

    const response = await axios.get("http://localhost:8081/users/current/?userId=64804a5f0737e1afcd86ef4b");

    console.log('Response:', response.data); // Log the received data

    res.json(response.data);

    } catch (error) {

    console.error('Error:', error); // Log the error object

    res.status(500).json({ error: "Failed to retrieve data from microservice" });

    }

});

app.listen(port, ()=> {
    console.log('Emergency Response Service running on port 8082');
})