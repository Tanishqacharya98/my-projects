import express from "express";
import { body } from "express-validator";
import passport from "passport";
import { signup, login } from "../controllers/auth.controller.js";
import generateToken from "../utils/generateToken.js";

const router = express.Router();

router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
  ],
  signup
);
router.post("/login", login);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {

    const token = generateToken(req.user._id);

    res.redirect(
      `http://localhost:5173/google-success?token=${token}`
    );

  }
);

export default router;