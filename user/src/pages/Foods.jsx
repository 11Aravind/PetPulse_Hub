// Foods.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterAndStore } from "../Slice/productSlice";
import Produtcard from "../component/Produtcard";
import Categoryslider from "../component/Categoryslider";

const Foods = () => {
  // const dispatch = useDispatch();
  // const categorys = useSelector((state) => state.categorys.categoryList);
  // const products = useSelector((state) => state.products.productList);
  // const filteredProduct = products.filter(product =>
  //   categorys.some(category => category._id === product.category_id && category.mainCategory === "Food")
  // );
  // dispatch(filterAndStore(filteredProduct));
  // const filterCategory = categorys.filter((itemCat) => itemCat.mainCategory === "Food");
  const dispatch = useDispatch();
  const categorys = useSelector((state) => state.categorys.categoryList);
  const products = useSelector((state) => state.products.productList);

  // Use useEffect to dispatch the action after component has mounted
  useEffect(() => {
    const filteredProduct = products.filter(product =>
      categorys.some(category => category._id === product.category_id && category.mainCategory === "Food")
    );
    dispatch(filterAndStore(filteredProduct));
  }, [dispatch, categorys, products]);

  // Filter categories separately (outside useEffect)
  const filterCategory = categorys.filter((itemCat) => itemCat.mainCategory === "Food");
  return (
    <>
      {/* <Categoryslider categorys={filterCategory} /> */}
      <Produtcard categorys={filterCategory}   headding="Our Top Food Items" />
    </>
  );
};

export default Foods;
