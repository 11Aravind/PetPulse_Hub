import mongoose from "mongoose";
import Order from "../models/Order.js"
import Razorpay from "razorpay";
import crypto from "crypto"
export const storeOrder = async (req, res) => {
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
            order_message: "Order placed"
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
}
export const storeCodOrder = async (req, res) => {
    const { userId, addressId, items, razorpayOrderId, status, paymentMode, order_message, amount, currency, receiptId } = req.body;
    let a = new Date();
    let date = a.getDate() + "/" + a.getMonth() + "/" + a.getFullYear() + " " + a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds()
    const newOrder = new Order({
        userId,
        addressId,
        items,
        totelamount: amount,
        razorpayOrderId: 0,
        dateOfOrder: date,
        status: "success",
        paymentMode,
        order_message: "Order placed"
    })
    try {
        await newOrder.save();
        res.json({ status: "success", message: "success cod" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "data not stored in db", error: err });
    }
}
export const validatePaymentStatus = async (req, res) => {
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
}
export const getOrder = async (req, res) => {
    let orderDetails;
    const { userId } = req.query;
    try {
        orderDetails = await Order.find({ userId })
    } catch (error) {
        console.log(error);
    }
    if (orderDetails.length !== 0)
        res.status(200).json({ status: "success", message: "", data: orderDetails })
    else
        res.status(400).json({ status: "success", messgae: "order was empty", data: orderDetails })
}
// get all order ezuthanam  for admin panel
export const getAllOrder = async (req, res) => {
    let orderDetails;
    try {
        orderDetails = await Order.find()
    } catch (error) {
        console.log(error);
    }
    if (orderDetails.length !== 0)
        res.status(200).json({ status: "success", message: "", data: orderDetails })
    else
        res.status(400).json({ status: "success", messgae: "order was empty", data: orderDetails })
}
export const updateStatus = async (req, res) => {
    try {
        const { id, order_message } = req.body
        const order = await Order.findByIdAndUpdate(
            id,
            { order_message },
        );
        if (order) {
            res.status(200).json({ message: "Order updated successfully" });
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating order", error });

    }


}