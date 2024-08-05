import express from "express";
import upload from "../controllers/multer-middleware.js";
import {getProductDetails,saveProduct,deleteProduct,updateProduct} from "../controllers/Product-middleware.js"
const router=express.Router()
router.get('/',getProductDetails);
router.post('/save',upload.single('image'),saveProduct);
router.post('/update',upload.single('image'),updateProduct);
router.delete('/:product_id',deleteProduct);
export default router;