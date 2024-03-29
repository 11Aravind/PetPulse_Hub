import mongoose from "mongoose";
const Schema=mongoose.Schema;
const GallerySchema = new Schema({
    image:{
        type:String,
        required:true
    }
 })
export default mongoose.model("Gallery", GallerySchema);