import mongoose from "mongoose"
const Schema=mongoose.Schema;
const Category=new Schema({
    mainCategory:{ //pet
    type:String,
    required:true
},
category:{ //dog
    type:String,
    required:true
},
subCategory:{ 
    type:String,
    required:true
},
image:{
    type:String,
    required:true
}
});
export default mongoose.model("Category",Category);