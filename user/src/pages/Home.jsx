import ImageSlider from "../component/ImageSlider";
import { Cardslider } from "../component/ImageSlider";
import Categorylist from "../component/Categorylist";
// import MyCarousel  from "../component/CarouselComponent";
import Categoryslider from "../component/Categoryslider";
import { useSelector } from "react-redux";
import Blogs from "./Blogs";

const Home = () => {
  const categorys = useSelector((state) => state.categorys.categoryList);
  const mainCategorys = [
    {
        url: "https://cdn.petsworld.network/v1/b/assets.petsworld.network/o/images%2Fcategories%2Fcategory-dog.png?h=256",
        name: "Pets",
        route:"/Pets"
    },
    {
        url: "images/food.png",
        name: "Food",
        route:"/foods"
    },
    {
        url: "images/acc.png",
        name: "Accessorys",
        route:"/accessorys"
    },
    {
        url: "images/medi.png",
        name: "Medicine",
        route:"/medicine"
    },
    {
        url: "images/blogs.png",
        name: "Blogs",
         route:"/blogs"
    },
    {
        url: "images/care.png",
        name: "Care_Taking",
         route:"/accessorys"
    },
];
  const dogCategorys = [
    {
        url: "https://www.petsy.online/cdn/shop/files/Dog-Food.jpg?v=1710755622&width=194",
        name: "Food",
         route:"/routenotadded"
    },
    {
        url: "https://www.petsy.online/cdn/shop/files/Dog-Toys_12ce7fa5-1cdc-4b31-b0e5-8f57a863fcca.jpg?v=1710755622&width=194",
        name: "Toys",
         route:"/routenotadded"
    },
    {
        url: "https://www.petsy.online/cdn/shop/files/Dog-Accessories_ae912f34-23a9-42f1-b52c-ba0394b05ced.jpg?v=1710755622&width=194",
        name: "Accessorys",
         route:"/routenotadded"
    },
    {
        url: "https://www.petsy.online/cdn/shop/files/Dog-Treats_6294ba49-0864-41bc-953d-7fa1eafb7e1c.jpg?v=1710755622&width=194",
        name: "Medicine",
         route:"/routenotadded"
    },
];

  return (
    <div className="container">
      <ImageSlider />
      <h1 className="headding">Our Services</h1>
      <Categorylist categorys={mainCategorys}/>
      <h1 className="headding">Top Categories For Your Dog</h1>
      {/* <Categorylist categorys={dogCategorys}/> */}
      <Categoryslider categorys={categorys} />
      <h1 className="headding">Pet-tastic Deals</h1>
      {/* <MyCarousel  items={newProducts}/> */}
      {/* <Blogs/> */}
      {/* <Cardslider /> */}
    </div>
  );
}
export default Home;