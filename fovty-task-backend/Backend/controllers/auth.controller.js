import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import { validationResult } from "express-validator";


// Signup
export const signup = async (req, res) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // generate token
    const token = generateToken(user._id);

    // remove password from response
    const { password: _, ...safeUser } = user.toObject();

    res.status(201).json({
      message: "User created successfully",
      token,
      user: safeUser
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};



// Login
export const login = async (req, res) => {

  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (user.isBlocked) {
      return res.status(403).json({ message: "User account is blocked" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    // remove password from response
    const { password: _, ...safeUser } = user.toObject();

    res.json({
      message: "Login successful",
      token,
      user: safeUser
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }

};