const mongoose  = require("mongoose");
const mongoURI  = "mongodb+srv://maisaaalkhder005:rci9rbcD3IumsDxR@cluster0.8etzoio.mongodb.net/";
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