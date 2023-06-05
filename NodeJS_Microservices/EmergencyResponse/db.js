const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://maisaa:TMiA9TA6avMPWi08@cluster0.ezsfkwb.mongodb.net/?retryWrites=true&w=majority";

// DB connection
const connectDB = async ()=> {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

module.exports = connectDB;