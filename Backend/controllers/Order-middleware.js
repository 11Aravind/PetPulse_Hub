import Order from "../models/Order.js"
import mongoose from "mongoose";
export const orderStore = async(req, res) => {
    // let checkoutDetails=
    let a= new Date();
    let date=a.getDate()+"/"+a.getMonth()+"/"+a.getFullYear()+" "+a.getHours()+":"+a.getMinutes()+":"+a.getSeconds()

    const { userId, addressId, items, totelamount, transactionId, dateOfOrder, status, paymentMode, order_message } = req.body;
    const checkOutDetails = new Order({
        userId,
        addressId,
        items,
        totelamount,
        transactionId,
        dateOfOrder:date,
        status,
        paymentMode,
        order_message
    })
    try {
       const savedDocument= await checkOutDetails.save();
    } catch (err) {
       return res.status(404).json({status:false,message:`something went wrong ${err}`,orderId:null});
    }
    return res.status(200).json({status:true,message:"successfult store",orderId:savedDocument._id});
}