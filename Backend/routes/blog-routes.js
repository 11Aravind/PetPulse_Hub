import express from "express";
// import multer from "multer";
// import upload from "../controllers/multer-middleware.js";
import { getAllBlogs, addBlog, updateBlog,deleteBlog } from "../controllers/Blog-Middleware.js"
const blogRouter = express.Router()
blogRouter.get("/", getAllBlogs)
blogRouter.post("/add",addBlog)//addBlog
blogRouter.delete('/:blogId',deleteBlog);

// blogRouter.post("/add",upload.single('image'),addBlog)//addBlog
blogRouter.post("/update", updateBlog)
export default blogRouter;