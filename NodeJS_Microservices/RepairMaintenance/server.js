const express = require('express');
const app = express();
const port = 8083;


app.listen(port, ()=> {
    console.log('Repair Maintenance Service running on port 8083');
})