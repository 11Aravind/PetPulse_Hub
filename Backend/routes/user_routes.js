import express from "express";
import { getUserDetails,signupMiddleware ,loginMiddleware,storeAddress} from "../controllers/User-middleware.js";
const router = express.Router();

router.get("/", getUserDetails);
router.post("/signup", signupMiddleware);
router.post("/login", loginMiddleware);
router.post("/address",storeAddress)
export default router;