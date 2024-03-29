// const express=require('express');
import express from "express"
import mongoose from "mongoose"
import userRouter from "./routes/user_routes.js";
import blogRouter from "./routes/blog-routes.js";
import galleryRouter from "./routes/gallery-routs.js";
import categoryRouter from "./routes/category-routers.js";
import adminRouter from "./routes/admin-router.js";
import productRouter from "./routes/product-routers.js";
import cors from "cors";

const app=express();
// app.use(express.static('uploads'));
app.use(express.json())
app.use(cors())
const PORT=5000
// Serve images from a directory named 'images'
// app.use('/', express.static('uploads'));

app.use(express.static('uploads'));
app.use("/api/user",userRouter); 
app.use("/api/blog",blogRouter); 
app.use("/api/gallery",galleryRouter); 
app.use("/api/category",categoryRouter); 
app.use("/api/product",productRouter); 
app.use("/api/admin",adminRouter);
mongoose.connect('mongodb://localhost:27017/petsworlds', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log(`Connected to MongoDB in port  ${PORT}`);
  app.listen(PORT);
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

//app.use("/api/user",router)
// mongoose.connect("mongodb+srv://aravindas247:JK6JJzd4lgT6awpY@cluster0.21ylyi6.mongodb.net/?retryWrites=true&w=majority")
// mongoose.connect('mongodb://localhost:27017/myDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// },(err)=>console.log(err)).then(()=>app.listen(PORT))
// .then(()=>console.log(`db connection was success in port ${PORT} `))
// .catch((err)=>console.log(err));