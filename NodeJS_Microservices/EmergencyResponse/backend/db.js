const mongoose = require("mongoose");

const mongoURI  = "mongodb+srv://maisaa:BfDE0Ma9513MhSTf@cluster0.ezsfkwb.mongodb.net/";

// DB connection
const connectDB = async ()=> {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Emergency response connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

module.exports = connectDB;