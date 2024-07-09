import express from "express"
const orderRoute = express.Router()
import {getOrder,storeOrder,storeCodOrder,validatePaymentStatus,getAllOrder} from "../controllers/Order-middleware.js";
orderRoute.get("/",getOrder);
orderRoute.get("/all",getAllOrder);
orderRoute.post("/checkout",storeOrder);
orderRoute.post("/cod",storeCodOrder);
orderRoute.post("/validate",validatePaymentStatus )
export default orderRoute;