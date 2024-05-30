import express from "express"
const orderRoute = express.Router()
import {storeOrder,storeCodOrder,validatePaymentStatus} from "../controllers/Order-middleware.js";
orderRoute.post("/",storeOrder);
orderRoute.post("/cod",storeCodOrder);
orderRoute.post("/validate",validatePaymentStatus )
export default orderRoute;