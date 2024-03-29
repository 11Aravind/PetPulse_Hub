import  express  from "express";
import {loginValidation} from "../controllers/Admin-middleware.js"
const adminRouter =express.Router();
adminRouter.post("/login",loginValidation);
export default adminRouter;

