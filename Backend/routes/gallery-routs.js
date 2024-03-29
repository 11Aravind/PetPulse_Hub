import  express  from "express";
const rout=express.Router();
import {getGallery,savegallery} from "../controllers/Gallery-middleware.js";
import multer from "multer";
import upload from "../controllers/multer-middleware.js";

rout.get('/',getGallery);
rout.post("/savegallery",upload.single('image'),savegallery);
export default rout;