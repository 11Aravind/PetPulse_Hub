// Gallery-middleware.s
import Gallery from "../models/Gallery.js";
import multer from "multer"
import upload from "./multer-middleware.js";
import fs from "fs"
export const savegallery = async (req, res, next) => {
    const image = req.file.filename;
    // const image = req.file.path;
    const newGallery = Gallery({
        image
    });
    try {
        await newGallery.save();
    } catch (error) {
        return res.status(400).json({ message: "image was not uploaded", status: "failed" })
    }
    return res.status(200).json({ message: "New gallery was added", status: "success" })
}

export const getGallery = async (req, res, next) => {
    let galleryList;
    try {
        galleryList = await Gallery.find();
    } catch (err) {
        console.log(err);
    }
    if (galleryList.length === 0)
        return res.status(200).json({ message: "gallery was empty", data: galleryList });
    return res.status(200).json({ message: "Success", data: galleryList });
}
export const deleteGallery = async (req, res, next) => {
    const galleryId = req.params.galleryId;
    let deleteFlag
    // try {
        deleteFlag=await Gallery.findById(galleryId);
        const imagePath=deleteFlag.image
        if (imagePath) {
            fs.unlink("uploads/"+imagePath, (err) => {
                if (err) {
                        return  res.status(500).send({message:'Error deleting image file',error:err});
                } 
            })
        }
    // } catch (error) {
        // console.log(error);
    // }
    if (!deleteFlag) {
        return res.status(404).json({ message: 'gallery not found' ,id:galleryId});
    }
    return  res.status(200).json({ message: 'Product deleted successfully', deleteFlag });
}