import mongoose from "mongoose";
const Schema = mongoose.Schema
const addressSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref:"User",
        require: true
    },
    name: {
        type:String,
        require:true
    },
    mobileNo: {
        type:Number,
        require:true,
        maxlength:10
    },
    address: {
        type:String,
        require:true
    },
    order_id: {
        type:Number,
        require:true
    }
})
export default mongoose.model("Address",addressSchema);