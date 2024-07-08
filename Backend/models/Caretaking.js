import mongoose from "mongoose";
const Schema = mongoose.Schema
const caretakingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref:"User",
        require: true
    },
    type: {
        type:String,
        require:true
    },
    owner_name: {
        type:String,
        require:true,
    },
    proof: {
        type:String,
        require:true,
    },
    phone_no: {
        type:String,
        require:true,
    },
    alt_phone_no: {
        type:String,
        },
    hostel:{
        type:String
    },
    pickup:{
        type:String
    },
    deliver:{
        type:String
    },
    address: {
        type:String,
        require:true
    },
})
export default mongoose.model("Address",caretakingSchema);