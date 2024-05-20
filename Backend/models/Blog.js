import mongoose from "mongoose";
const Schema=mongoose.Schema;
const blogSchema=new Schema({
    category:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
    
})
export default  mongoose.model("Blog",blogSchema); //blog collection schema create akkunnu