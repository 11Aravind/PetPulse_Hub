import { useSelector } from "react-redux";
import Produtcard from "../component/Produtcard";
import { useDispatch } from "react-redux";
import {filterAndStore} from "../Slice/productSlice"
const Foods = () => {
  const dispatch = useDispatch();
  const categorys = useSelector((state) => state.categorys.categoryList);
  const products = useSelector((state) => state.products.productList);
  const filterCategory = categorys.filter((itemCat) => itemCat.mainCategory === "Food");
  const filteredProduct = products.filter(product => categorys.some(category => category._id === product.category_id && category.mainCategory === "Food"));
  dispatch(filterAndStore(filteredProduct));
  // console.log(filteredProduct);
  return (
    <Produtcard categorys={filterCategory} products={filteredProduct} headding="Our Top Food Items" />
  )
}
export default Foods;