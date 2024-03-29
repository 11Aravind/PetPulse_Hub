import ImageSlider from "../component/ImageSlider";
import { Cardslider } from "../component/ImageSlider";
import Categorylist from "../component/Categorylist";
// import MyCarousel  from "../component/CarouselComponent";
import Categoryslider from "../component/Categoryslider";
import { useSelector } from "react-redux";

const Home = () => {
  const categorys = useSelector((state) => state.categorys.categoryList);
  console.log(categorys);
  return (
    <div className="container">
      <ImageSlider />

      <h1 className="headding">Our Categorys</h1>
      <Categorylist />
      <Categoryslider categorys={categorys} />
      <h1 className="headding">Pet-tastic Deals</h1>
      {/* <MyCarousel  items={newProducts}/> */}
      <Cardslider />
    </div>
  );
}
export default Home;