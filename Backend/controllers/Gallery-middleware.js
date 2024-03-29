// Gallery-middleware.s
import Gallery from "../models/Gallery.js";
import multer from "multer"
import upload from "./multer-middleware.js";

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

export const getGallery = async (req,res,next) => {
    let galleryList;
    try {
        galleryList = await Gallery.find();
    } catch (err) {
        console.log(err);
    }
    if (galleryList.length === 0)
        return res.status(200).json({ message: "gallery was empty" });
    return res.status(200).json({ galleryList });
}