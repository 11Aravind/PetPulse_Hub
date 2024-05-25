import AllRouter from "./AllRoutes";
import Navbar from "./component/Navbar";
import Navbartop from "./component/Navbartop";
import { useDispatch } from "react-redux"
import { fetchAndStore } from "./Slice/productSlice"
import { useEffect } from "react";
import {httpRequest} from "./API/api"
import {fetchAndStoreCategory} from "./Slice/categorySlice"
// import Toplinks from "./component/Toplinks";
//  import Footer from "./component/Footer"
const App = () => {
      const dispatch=useDispatch();
  useEffect(() => {
    // Fetching categories
    httpRequest('get', 'api/category')
    .then(data => {
      if (data && Array.isArray(data.categoryDetails)) {
        dispatch(fetchAndStoreCategory(data.categoryDetails));
      } else {
        console.error("Fetched data does not contain 'categoryDetails' array:", data);
      }
    })
    .catch(error => {
      console.error("Error fetching products:", error);
    });
  
    // Fetching products
    httpRequest('get', 'api/product')
      .then(data => {
        if (data && Array.isArray(data.productDetails)) {
          dispatch(fetchAndStore(data.productDetails));
        } else {
          console.error("Fetched data does not contain 'productDetails' array:", data);
        }
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, []);
  return (
    <>
      {/* <Toplinks /> */}
      <Navbar />
      {/* <Navbartop/> */}
      <AllRouter />
      {/* <Footer/> */}
    </>
  );
}
export default App;
