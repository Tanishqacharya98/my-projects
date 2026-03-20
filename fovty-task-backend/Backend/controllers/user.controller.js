import bcrypt from "bcrypt";
import User from "../models/user.model.js";


// Get Profile
export const getProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// Update Profile
export const updateProfile = async (req, res) => {
  try {

    const { name, phone, bio } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (bio) user.bio = bio;

    await user.save();

    const { password, ...safeUser } = user.toObject();

    res.json({
      message: "Profile updated",
      user: safeUser
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// Change Password
export const changePassword = async (req, res) => {
  try {

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Old and new password required" });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Old password incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.json({
      message: "Password updated successfully"
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// Upload Profile Picture
export const uploadProfilePicture = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.profilePicture = req.file.path;

    await user.save();

    res.json({
      message: "Profile picture updated",
      profilePicture: user.profilePicture
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};