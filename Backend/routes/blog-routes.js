import express from "express";
// import multer from "multer";
// import upload from "../controllers/multer-middleware.js";
import { getAllBlogs, addBlog, updateBlog } from "../controllers/Blog-Middleware.js"
const blogRouter = express.Router()
blogRouter.get("/", getAllBlogs)
blogRouter.post("/add",addBlog)//addBlog
// blogRouter.post("/add",upload.single('image'),addBlog)//addBlog
blogRouter.put("/update/:id", updateBlog)
export default blogRouter;