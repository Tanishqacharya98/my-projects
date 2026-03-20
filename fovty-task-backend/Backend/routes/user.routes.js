import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

import {
  getProfile,
  updateProfile,
  changePassword,
  uploadProfilePicture
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);

router.put("/profile", authMiddleware, updateProfile);

router.put("/change-password", authMiddleware, changePassword);

router.post(
  "/upload-profile",
  authMiddleware,
  upload.single("profilePicture"),
  uploadProfilePicture
);

export default router;