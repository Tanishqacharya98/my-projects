import User from "../../models/user.model.js";
import ImpersonationLog from "../../models/impersonationLog.model.js";
import generateToken from "../../utils/generateToken.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'


// Get Users (Pagination + Search)
export const getUsers = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const search = req.query.search || "";

    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } }
          ]
        }
      : {};

    const users = await User.find(query)
      .select("-password")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalUsers = await User.countDocuments(query);

    res.json({
      users,
      totalUsers,
      page,
      totalPages: Math.ceil(totalUsers / limit)
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



// Create User
export const createUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const { password: _, ...safeUser } = user.toObject();

    res.status(201).json({
      message: "User created",
      user: safeUser
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



// Update User
export const updateUser = async (req, res) => {
  try {

    const { name, phone, bio } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, phone, bio },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User updated",
      user
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



// Delete User
export const deleteUser = async (req, res) => {
  try {

    // admin khud ko delete na kare
    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({
        message: "Admin cannot delete himself"
      });
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      message: "User deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};



// Block / Unblock User
export const toggleBlockUser = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isBlocked = !user.isBlocked;

    await user.save();

    res.json({
      message: user.isBlocked ? "User blocked" : "User unblocked",
      isBlocked: user.isBlocked
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



// Impersonate User


// Impersonate User
export const impersonateUser = async (req, res) => {
  try {

    // only admin can impersonate
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin only."
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (user.isBlocked) {
      return res.status(400).json({
        message: "Cannot impersonate blocked user"
      });
    }

    // create impersonation log
    const log = await ImpersonationLog.create({
      adminId: req.user._id,
      userId: user._id
    });

    // create impersonation token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        impersonatedBy: req.user._id,
        impersonationLogId: log._id
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const { password, ...safeUser } = user.toObject();

    res.json({
      message: "Impersonation started",
      token,
      user: safeUser,
      impersonationLogId: log._id
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};



// End Impersonation
export const endImpersonation = async (req, res) => {
  try {

    const { logId } = req.params;

    const log = await ImpersonationLog.findById(logId);

    if (!log) {
      return res.status(404).json({
        message: "Impersonation log not found"
      });
    }

    log.endedAt = new Date();
    await log.save();

    const token = jwt.sign(
      {
        id: log.adminId,
        role: "admin"
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const admin = await User.findById(log.adminId).select("-password");

    res.json({
      message: "Switched back to admin",
      token,
      user: admin
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};