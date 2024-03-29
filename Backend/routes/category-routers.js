import express from "express";
import upload from "../controllers/multer-middleware.js";
import multer from "multer";
import { getCategory,saveCategory,deleteCategory } from "../controllers/Category-middleware.js"
const router = express.Router();
router.get("/", getCategory);
router.post("/add",upload.single("image"), saveCategory);
router.delete('/:category_id',deleteCategory);
export default router;