const express = require('express');
const connectDB = require('./db');
const emergencyRoutes = require('./routes');


const app = express();
const port = 8082;

// Connect to MongoDB
connectDB();

// Set up middleware
app.use(express.json());

// Set up routes
app.use('/emergencies', emergencyRoutes);

app.listen(port, ()=> {
    console.log('Emergency Response Service running on port 8082');
})