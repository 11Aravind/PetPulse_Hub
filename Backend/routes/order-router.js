import express from "express"
const orderRoute=express.Router()
import {orderStore} from "../controllers/Order-middleware.js";
orderRoute.post("/checkout",orderStore);
export default orderRoute;