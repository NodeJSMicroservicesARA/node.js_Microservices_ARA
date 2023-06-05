const express = require('express');
const app = express();
const port = 8082;


app.listen(port, ()=> {
    console.log('Emergency Response Service running on port 8082');
})