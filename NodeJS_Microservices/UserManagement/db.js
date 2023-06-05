const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://maisaa:TMiA9TA6avMPWi08@cluster0.ezsfkwb.mongodb.net/?retryWrites=true&w=majority";

//connect to MongoDB
const connectDB = async()=>{
    try {
        await mongoose.connect(mongoURI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("connected to MongoDB")
    } catch (error) {
        console.log("Failed to connect to MongoDB", err);
        process.exit(1);
        
    }
};

module.exports = connectDB;