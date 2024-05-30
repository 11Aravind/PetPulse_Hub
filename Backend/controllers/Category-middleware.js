import upload from "./multer-middleware.js";
import multer from "multer";
import Category from "../models/Category.js";
import fs from "fs";
export const getCategory=async(req,res)=>{
    let categoryDetails;
    try{
         categoryDetails= await Category.find();
    }catch(err)
    {
        return console.log(err);
    }
    if (categoryDetails.length===0)
    return res.status(200).json({message:"category details was empty"})
 return res.status(200).json({categoryDetails})
}

export const saveCategory = async (req, res, next) => {
    try {
        const { mainCategory, category, subCategory } = req.body;
        // const image = req.file.path;
        const image = req.file.filename;
        const newCategory = new Category({
            mainCategory,
            category,
            subCategory,
            image
        });
        await newCategory.save();
        res.status(200).json({ message: "New category was added" });
    } catch (err) {
        res.status(400).json({ message: "Something went wrong,Please try again" ,error:err});
    }
};
export const deleteCategory=async(req,res)=>{
const category_id=req.params.category_id;
let deleteFlag;
try{
    deleteFlag=await Category.findByIdAndDelete(category_id);
    const imagePath = deleteFlag.image; 
    if (imagePath) {
        fs.unlink("uploads/"+imagePath, (err) => {
            if (err) {
                console.error("Error deleting image file:", err);
            } else {
                console.log("Image file deleted successfully:", imagePath);
                
            }
        })
    }
}catch(err){
    return  res.status(500).send({message:'deletion failed',error:err,id:category_id});
}
if (!deleteFlag) {
    return res.status(404).json({ message: 'Product not found' ,id:category_id});
}
return  res.status(200).json({ message: 'Product deleted successfully', deleteFlag });

}