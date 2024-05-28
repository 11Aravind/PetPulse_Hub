import mongoose from "mongoose"
const Schema = mongoose.Schema;
const Order = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    addressId: {
        type: Schema.Types.ObjectId,
        ref: "Address"
    },
    items: {
        type: Array,
        // ref: "Product"
        required:true
    },
    // quantity: {
    //     type: Number,
    //     required: true
    // },
    totelamount: {
        type: Number,
        required: true
    },
    transactionId: {
        type: String,
    },
    dateOfOrder: {
        type: String,
    },
    status: {
        type: String,
        required:true
    },
    paymentMode: {
        type: String,
        required:true
    },
    order_message: {
        type: String,
    },
})
export default mongoose.model("Order",Order)