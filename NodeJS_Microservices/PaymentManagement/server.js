const express = require('express');
const app = express();
const port = 8084;


app.listen(port, ()=> {
    console.log('Payment Manaegment Service running on port 8084');
})