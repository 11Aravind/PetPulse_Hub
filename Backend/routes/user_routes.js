import express from "express";
import { getUserDetails,signupMiddleware ,loginMiddleware} from "../controllers/User-middleware.js";
const router = express.Router();

router.get("/", getUserDetails);
router.post("/signup", signupMiddleware);
router.post("/login", loginMiddleware);
export default router;