// Foods.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterAndStore } from "../Slice/productSlice";
import Produtcard from "../component/Produtcard";

const Foods = () => {
  const dispatch = useDispatch();
  const categorys = useSelector((state) => state.categorys.categoryList);
  const products = useSelector((state) => state.products.productList);
  const filteredProduct = products.filter(product =>
    categorys.some(category => category._id === product.category_id && category.mainCategory === "Food")
  );
  dispatch(filterAndStore(filteredProduct));
  const filterCategory = categorys.filter((itemCat) => itemCat.mainCategory === "Food");

  return (
    <Produtcard categorys={filterCategory}  headding="Our Top Food Items" />
  );
};

export default Foods;
