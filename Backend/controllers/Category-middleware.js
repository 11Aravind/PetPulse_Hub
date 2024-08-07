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
export const updateCategory = async (req, res, next) => {
    try {
        const { mainCategory, category, subCategory, categoryId } = req.body;
        let updateData = { mainCategory, category, subCategory };

        // Check if a new image is provided
        if (req.file) {
            updateData.image = req.file.filename;
        }

        // Find the category by ID and update its properties
        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            updateData,
            { new: true } // Option to return the updated document
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" ,status:"failed"});
        }

        res.status(200).json({ message: "Category was updated successfully", updatedCategory,status:"success" });
    } catch (err) {
        res.status(400).json({ message: "Something went wrong, please try again", error: err ,status:"failed"});
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
                    return  res.status(500).send({message:'Error deleting image file',error:err,status:"failed"});
            } 
        })
    }
}catch(err){
    return  res.status(500).send({message:'deletion failed',error:err,id:category_id,status:"failed"});
}
if (!deleteFlag) {
    return res.status(404).json({ message: 'Product not found' ,id:category_id,status:"failed"});
}
return  res.status(200).json({ message: 'Product deleted successfully', deleteFlag ,status:"success"});

}