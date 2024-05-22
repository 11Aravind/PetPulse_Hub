import { useSelector,useDispatch } from "react-redux";
import Produtcard from "../component/Produtcard"
import {filterAndStore} from "../Slice/productSlice"

const Medicine=()=>{
    const dispatch = useDispatch();
    const categorys=useSelector((state)=>state.categorys.categoryList);
    const products = useSelector((state) => state.products.productList);
    const filterCategory=categorys.filter((itemCat)=>itemCat.mainCategory==="Medicine" && products.some((productItem)=>productItem.category_id===itemCat._id ));
    const filteredProduct=products.filter(product=>categorys.some(category=>category._id===product.category_id && category.mainCategory==="Medicine"));
    dispatch(filterAndStore(filteredProduct));
    return(
       <>
        { filteredProduct.length===0?"Medicine was empty":<Produtcard categorys={filterCategory} products={filteredProduct} headding="Our Medicine"/>  }
       </>
    );
}
export default Medicine;