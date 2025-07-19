import express from "express";
import upload from "../controllers/multer-middleware.js";
import multer from "multer";
import { getCategory,saveCategory,deleteCategory,updateCategory, getCategoryById } from "../controllers/Category-middleware.js"
const router = express.Router();
router.get("/", getCategory);
router.post("/add",upload.single("image"), saveCategory);
router.post("/update",upload.single("image"), updateCategory);
router.delete('/:category_id', deleteCategory);
router.get('/:category_id', getCategoryById)
export default router;