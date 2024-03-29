import express from "express";
import upload from "../controllers/multer-middleware.js";
import {getProductDetails,saveProduct} from "../controllers/Product-middleware.js"
const router=express.Router()
router.get('/',getProductDetails);
router.post('/save',upload.single('image'),saveProduct);
export default router;