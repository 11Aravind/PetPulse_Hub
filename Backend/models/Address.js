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
    pincode: {
        type:Number,
        require:true
    },
    locality: {
        type:String,
        require:true
    },
    address: {
        type:String,
        require:true
    },
    city: {
        type:String,
        require:true
    },
    state: {
        type:String,
        require:true
    },
    landmark: {
        type:String,
        require:true
    },
    address_type: {
        type:String,
        require:true
    }
})
export default mongoose.model("Address",addressSchema);