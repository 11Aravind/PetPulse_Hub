import express from "express"
const orderRoute = express.Router()
import {storeOrder,validatePaymentStatus} from "../controllers/Order-middleware.js";
orderRoute.post("/",storeOrder);
orderRoute.post("/validate",validatePaymentStatus )
export default orderRoute;