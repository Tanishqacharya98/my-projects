import express from "express";

import authMiddleware from "../../middleware/auth.middleware.js";
import adminMiddleware from "../../middleware/admin.middleware.js";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  toggleBlockUser,
  impersonateUser,
  endImpersonation
} from "../../controllers/admin/admin.controller.js";

const router = express.Router();

router.get("/users", authMiddleware, adminMiddleware, getUsers);

router.post("/users", authMiddleware, adminMiddleware, createUser);

router.put("/users/:id", authMiddleware, adminMiddleware, updateUser);

router.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser);

router.patch("/users/:id/block", authMiddleware, adminMiddleware, toggleBlockUser);

router.post(
  "/users/:id/impersonate",
  authMiddleware,
  adminMiddleware,
  impersonateUser
);

router.post(
  "/users/impersonate/end/:logId",
  authMiddleware,
  endImpersonation
);

export default router;