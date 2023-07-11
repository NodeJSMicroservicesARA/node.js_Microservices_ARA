const mongoose = require("mongoose");

const mongoURI  = "mongodb+srv://maisaa:mon&464633@cluster0.spohah5.mongodb.net/";
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection error:", error);
    process.exit(1);
  }
};
module.exports = connectDB;