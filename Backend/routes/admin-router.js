import express from "express";
import { loginValidation, createAdmin } from "../controllers/Admin-middleware.js";

const adminRouter = express.Router();

// Existing login route
adminRouter.post("/login", loginValidation);

// New route for creating admin accounts
adminRouter.post("/create", createAdmin);

export default adminRouter;
