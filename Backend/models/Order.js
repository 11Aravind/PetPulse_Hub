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
    product_id: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number,
        required: true
    },
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
        type: Boolean
    },
    paymentMod: {
        type: String,
    },
    order_message: {
        type: String,
    },
})
export default mongoose.model("Order",Order)