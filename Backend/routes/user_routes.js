import express from "express";
import { getUserDetails,signupMiddleware ,loginMiddleware,storeAddress,getAddress} from "../controllers/User-middleware.js";
const router = express.Router();

router.get("/", getUserDetails);
router.post("/signup", signupMiddleware);
router.post("/login", loginMiddleware);
router.post("/address",storeAddress)
router.get("/getAddress",getAddress);
export default router;