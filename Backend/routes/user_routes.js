import express from "express";
import { getUserDetails,signupMiddleware ,loginMiddleware,storeAddress,getAddress,storeCaretaking} from "../controllers/User-middleware.js";
const router = express.Router();

router.get("/", getUserDetails);
router.post("/signup", signupMiddleware);
router.post("/login", loginMiddleware);
router.post("/address",storeAddress)
router.get("/getAddress",getAddress);
router.get("/caretaking",storeCaretaking);

export default router;