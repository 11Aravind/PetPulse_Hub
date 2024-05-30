import express from "express"
const orderRoute = express.Router()
import {getOrder,storeOrder,storeCodOrder,validatePaymentStatus} from "../controllers/Order-middleware.js";
orderRoute.get("/",getOrder);
orderRoute.post("/checkout",storeOrder);
orderRoute.post("/cod",storeCodOrder);
orderRoute.post("/validate",validatePaymentStatus )
export default orderRoute;