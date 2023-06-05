const express = require('express');
const connectDB = require("./db");
const userRoutes = require("./routes/user");

const app = express();
const port = 8081;

// Connect to the database
connectDB();

// Express middleware to parse JSON
app.use(express.json());

// Routes
app.use("/users", userRoutes);


app.listen(port, ()=> {
    console.log('User Manaegment Service running on port 8081');
})