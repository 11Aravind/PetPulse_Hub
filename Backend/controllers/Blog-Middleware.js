import multer from "multer";
import Blog from "../models/Blog.js";
import upload from "./multer-middleware.js";
export const getAllBlogs = async (req, res, next) => {
    let blogDetails;
    try {
        blogDetails = await Blog.find();
    }
    catch (err) {
        return console.log(err);
    }
    if (blogDetails.length === 0)
        return res.status(404).json({ message: "Blog was empty" })
    return res.status(200).json({ blogDetails });
}

export const addBlog = async (req, res, next) => {
    const { category, link, description } = req.body;
    // const image=req.file.path;
    // console.log(req.body);
    const newBlog = new Blog({
        category,
        link,
        description
    });
    try {
        await newBlog.save();
    } catch (error) {
        return res.status(404).json({ message: `blog was not added ${error}`,data:`The data is${req.category}`})
    }
    return res.status(200).json({ message: "New blog was added" })
}

export const updateBlog = async (req, res, next) => {
    const { category, link, description } = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        //findByIdAndUpdate(id,update cheyyenda value) ite id find cheythe value update akkikollum
        blog = await Blog.findByIdAndUpdate(blogId,
            { category, link, description }
        )
    } catch (error) {
        return console.log(error);
    }
    if (!blog)
        return res.status(500).json({ message: "Unable to update" })
    return res.status(200).json({ blog })
}