import express from "express"
const orderRoute=express.Router()
import {orderStore} from "../controllers/Order-middleware.js";
orderRoute.post("/checkout",orderStore);
orderRoute.post("/create",(req,res)=>{
    var options = {
        amount: 50000,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
      };
      instance.orders.create(options, function(err, order) {
        console.log(order);
        res.send({orderId:order.id});
      });
})
export default orderRoute;