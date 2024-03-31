// controllers/authController.js
const User = require("../models/user-model");
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user with the provided email already exists
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user with the provided email exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    // Password is correct, proceed with authentication
    // Here, you can generate a JWT token and send it back to the client for authentication

    res.status(200).json({ user: user, msg: "User logged in successfully" });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
