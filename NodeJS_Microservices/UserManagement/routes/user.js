const express = require("express");
const router = express.Router();
const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");


// Create a new user
router.post("/", async (req, res) => {
    try {
      const { name, email, password, address } = req.body;
  
      const userExists = await UserModel.findOne({ email });
      if (userExists) {
        return res.status(400).json({ error: "Email already exists" });
      }


      const user = new UserModel({ name, email, password, address });
      await user.save();
  
      res.status(201).json({ message: "User created successfully" });
    
    } catch (err) {
      console.error("Failed to create the user", err);
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  // User login
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      const isPasswordMatch = await user.comparePassword(password);
      if (!isPasswordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      const token = jwt.sign({ userId: user._id }, "your-secret-key", {
        expiresIn: "1h",
      });

      res.json({ token });
    } catch (err) {
      console.error("Failed to login", err);
      res.status(500).json({ error: "Failed to login" });
    }
  });
  
  
  module.exports = router;