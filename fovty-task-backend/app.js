import express from "express";
import cors from "cors";
import passport from "passport";
import "./Backend/config/passport.js";

// user routes
import authRoutes from "./Backend/routes/auth.routes.js";
import userRoutes from "./Backend/routes/user.routes.js";

// admin routes
import adminRoutes from "./Backend/routes/admin/admin.routes.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use("/uploads", express.static("uploads"));


// user middleware
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// admin middleware 
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

export default app;