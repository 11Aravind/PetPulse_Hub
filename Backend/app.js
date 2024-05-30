// const express=require('express');
import express from "express"
import mongoose from "mongoose"
import userRouter from "./routes/user_routes.js";
import blogRouter from "./routes/blog-routes.js";
import galleryRouter from "./routes/gallery-routs.js";
import categoryRouter from "./routes/category-routers.js";
import adminRouter from "./routes/admin-router.js";
import productRouter from "./routes/product-routers.js";
import orderRouteer from "./routes/order-router.js"
import Razorpay from "razorpay"
import crypto from "crypto"
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: false }));

// Middleware to set Permissions-Policy header
const PORT = process.env.PORT;
app.use((req, res, next) => {
  res.setHeader(
    "Permissions-Policy",
    "geolocation=(self \"https://www.youtube.com\")"
  );
  next();
});
// app.use(express.static('uploads'));
app.use(express.json())
app.use(cors())
// Serve images from a directory named 'images'
// app.use('/', express.static('uploads'));

app.use(express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);
app.use("/api/gallery", galleryRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/admin", adminRouter);
app.use("/api/order", orderRouteer);

app.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const options = req.body;
    const order = await razorpay.orders.create(options);
    if (!order) {
      return res.status(500).send("Error");
    }
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

app.post("/order/validate", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  //order_id + "|" + razorpay_payment_id
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }
  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
});

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