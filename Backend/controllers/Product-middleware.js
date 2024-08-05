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
  if (productDetails.length === 0)
    return res.status(500).json({ message: "Product was empty" })
  return res.status(200).json({ productDetails })

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
// export const updateProduct = async (req, res, next) => {
//   const { name, description, category_id, oldPrice, newPrice, status,productId } = req.body;
//   const image = req.file.filename;
//   // const image = req.file.path.replace('uploads/','');
//   const productData = new Product({
//     name,
//     image,
//     description,
//     oldPrice,
//     newPrice,
//     status,
//     category_id,
//   });
//   try {
//     await productData.save();
//     res.status(200).json({ status: "success", message: "product was added successfuly" })
//   } catch (error) {
//     res.status(500).json({ status: "failed", message: `product was not inserted${error}` })
//   }
// }
export const updateProduct = async (req, res, next) => {
  const { name, description, category_id, oldPrice, newPrice, status, productId } = req.body;
  
  try {
    // Prepare the update fields
    const updateFields = {
      name,
      description,
      oldPrice,
      newPrice,
      status,
      category_id,
    };

    // Check if a new image was uploaded
    if (req.file) {
      updateFields.image = req.file.filename;
      // If you want to delete the old image from storage, handle it here
    }

    // Perform the update
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateFields,
      { new: true, runValidators: true } // Options: return the updated document and run validators
    );

    if (!updatedProduct) {
      return res.status(404).json({ status: "failed", message: "Product not found" });
    }

    res.status(200).json({ status: "success", message: "Product updated successfully", data: updatedProduct });

  } catch (error) {
    res.status(500).json({ status: "failed", message: `Product update failed: ${error.message}` });
  }
};

export const deleteProduct = async (req, res) => {
  const product_id = req.params.product_id;
  let deleteFlag;
  try {
    deleteFlag = await Product.findByIdAndDelete(product_id);

  } catch (err) {
    return res.status(500).send({ status: "failed", message: 'deletion failed', error: err, id: product_id });
  }
  if (!deleteFlag) {
    return res.status(404).json({ status: "failed", message: 'Category not found', id: product_id });
  }
  return res.status(200).json({ status: "success", message: 'Category deleted successfully', deleteFlag });

}

