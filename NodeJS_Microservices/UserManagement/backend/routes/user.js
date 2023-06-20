const express = require("express");
const router = express.Router();
const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");


// Create a new user
router.post("/", async (req, res) => {
    try {
      const { name, email, password, role, address, driver_id } = req.body;

      const userExists = await UserModel.findOne({ email });
      if (userExists) {
        return res.status(400).json({ error: "Email already exists" });
      }


      const user = new UserModel({ name, email, password, role, address, driver_id });
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

      console.log("hi from login");
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

 // Example route to fetch user information by driver ID
 router.get('/getdriver/:id', async (req, res) => {
  const driverId = req.params.id;

  try {
    const user = await UserModel.findOne({ driver_id: driverId });
   // res.json(user);
  } catch (error) {
    console.error(error);
    //res.status(500).json({ message: 'An error occurred' });
  }
});

  // retrieve current user
  router.get('/current', async (req, res) => {
    console.log('current user api')
    const { userId } = req.query;

    console.log(userId);
    try {
      console.log("inside current user to get the id")

      // Retrieve the user from the database
      const user = await UserModel.findById(userId);

      // Check if the user exists
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Extract the required user information
      const { _id, name, email } = user;

      // Send the response with the user information
      res.json(user);
    } catch (error) {
      console.error('Error retrieving current user:', error.message);
      res.status(500).json({ error: 'An error occurred while retrieving the current user' });
    }
  });

//deactivate user
// router.put("/deactivate/:id", async (req, res) => {
//   const userId = req.params.id;

//   try {
//     // Find the user by ID
//     const user = await UserModel.findById(userId);

//     // Check if the user exists
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Deactivate the user
//     user.active = false;
//     await user.save();

//     res.status(200).json({ message: "User deactivated successfully" });
//   } catch (error) {
//     console.error("Failed to deactivate the user", error);
//     res.status(500).json({ error: "Failed to deactivate user" });
//   }
// });


router.put("/activate-deactivate/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    // Find the user by ID
    const user = await UserModel.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Toggle the status (if it's true, set to false; if it's false, set to true)
    user.status = !user.status;
    await user.save();

    const statusMessage = user.status ? "User activated" : "User deactivated";
    res.status(200).json({ message: statusMessage });
  } catch (error) {
    console.error("Failed to activate or deactivate the user", error);
    res.status(500).json({ error: "Failed to activate or deactivate user" });
  }
});



  module.exports = router;
