//define a collection or table
import mongoose from "mongoose";

const Schema = mongoose.Schema;
// "email":"admin@gmail.com",
//     "password":"sudo@*,"
const adminSchema=new Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        minlength:6,
        required:true
    }
});
export default mongoose.model("Admin",adminSchema);
