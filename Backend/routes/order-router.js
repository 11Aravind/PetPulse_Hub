import express from "express"
const orderRoute = express.Router()
import Order from "../models/Order.js";
import Razorpay from "razorpay";
import crypto from "crypto"
// import {orderStore} from "../controllers/Order-middleware.js";
// orderRoute.post("/checkout",orderStore);
orderRoute.post("/validate", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  //order_id + "|" + razorpay_payment_id
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }
  try {
    const updateDocument = await Order.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },// condition,
      { $set: { status: "success" } },
      { new: true }
    )
  } catch (err) {
    console.log(err);
  }
  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
})
orderRoute.post("/", async (req, res) => {
  // var options = {
  //     amount: 50000,  // amount in the smallest currency unit
  //     currency: "INR",
  //     receipt: "order_rcptid_11"
  //   };
  //   instance.orders.create(options, function(err, order) {
  //     console.log(order);
  //     res.send({orderId:order.id});
  //   });
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    // Extract necessary information from the request body
    const { userId, addressId, items, razorpayOrderId, status, paymentMode, order_message, amount, currency, receiptId } = req.body;

    // Additional information to include in the order creation process
    const options = {
      amount,
      currency,
      receipt: receiptId,
      notes: {
        userId,
        addressId,
      },
    };

    // Create the order using Razorpay SDK
    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).send({ message: "rezorpay not create a order" });
    }

    // Save the order details to the database

    let a = new Date();
    let date = a.getDate() + "/" + a.getMonth() + "/" + a.getFullYear() + " " + a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds()
    const newOrder = new Order({
      userId,
      addressId,
      items,
      totelamount: amount,
      razorpayOrderId: order.id,
      dateOfOrder: date,
      status,
      paymentMode,
      order_message
    })
    try {
      await newOrder.save();
      // Return the order details
      res.json(order);
    } catch (err) {
      console.log(err);

      res.status(500).send({ message: "data not stored in db", error: err });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "something went wrong", error: err });
  }
})
export default orderRoute;