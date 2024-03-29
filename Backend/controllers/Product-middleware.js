import mongoose from "mongoose";
import Product from "../models/Product.js";
export const getProductDetails = async (req, res, next) => {
  let productDetails;
  try {
    productDetails = await Product.find();
  }
  catch (error) {
    return console.log(error);
  }
  if (productDetails.length===0)
    return res.status(500).json({ message: "Product was empty" })
  return res.status(200).json({productDetails})

}
export const saveProduct = async (req, res, next) => {
  const { name, description, category_id, oldPrice, newPrice, status } = req.body;
  const image = req.file.filename;
  // const image = req.file.path.replace('uploads/','');
  const productData = new Product({
    name,
    image,
    description,
    oldPrice,
    newPrice,
    status,
    category_id,
  });
  try {
    await productData.save();
    res.status(200).json({ status: "success", message: "product was added successfuly" })
  } catch (error) {
    res.status(500).json({ status: "failed", message: `product was not inserted${error}` })
  }
}

