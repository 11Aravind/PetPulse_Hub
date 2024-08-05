import express from "express"
const orderRoute = express.Router()
import {getOrder,storeOrder,storeCodOrder,validatePaymentStatus,getAllOrder,updateStatus,cancelOrder} from "../controllers/Order-middleware.js";
orderRoute.get("/",getOrder);
orderRoute.get("/all",getAllOrder);
orderRoute.post("/checkout",storeOrder);
orderRoute.post("/cod",storeCodOrder);
orderRoute.post("/updateStatus",updateStatus);
orderRoute.post("/validate",validatePaymentStatus )
orderRoute.post("/cancelOrder/:orderId", cancelOrder)
export default orderRoute;