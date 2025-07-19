import ImageSlider from "../component/ImageSlider";
import { Cardslider } from "../component/ImageSlider";
import Categorylist from "../component/Categorylist";
// import MyCarousel  from "../component/CarouselComponent";
import Cards from "../component/Cards";
import Categoryslider from "../component/Categoryslider";
import { useSelector, useDispatch } from "react-redux";
import Blogs from "./Blogs";
import { useEffect, useState } from "react";
import "./CSS/home.css"
const Home = () => {
  const dispatch = useDispatch()
  const categorys = useSelector((state) => state.categorys.categoryList);
  const mainCategorys = [
    {
      url: "https://cdn.petsworld.network/v1/b/assets.petsworld.network/o/images%2Fcategories%2Fcategory-dog.png?h=256",
      name: "Pets",
      route: "/Pets"
    },
    {
      url: "images/food.png",
      name: "Food",
      route: "/foods"
    },
    {
      url: "images/acc.png",
      name: "Accessorys",
      route: "/accessorys"
    },
    {
      url: "images/medi.png",
      name: "Medicine",
      route: "/medicine"
    },
    {
      url: "images/blogs.png",
      name: "Blogs",
      route: "/blogs"
    },
    {
      url: "images/care.png",
      name: "Care_Taking",
      route: "/accessorys"
    },
  ];
  
  const products = useSelector((state) => state.products.productList);
  const [dogFood, setDogFood] = useState([])
  const [catFood, setcatFood] = useState([])
  const [allAccessorys, setallAccessorys] = useState([])
  const [itemsToShow, setItemsToShow] = useState(4);
  const [showAll, setShowAll] = useState(false); 

  useEffect(() => {
    const filteredProduct = products.filter(product =>
      categorys.some(category => category._id === product.category_id && category.mainCategory === "Food" && category.category==="Dog")
    );
    setDogFood(filteredProduct);
    const catFilterFood = products.filter(product =>
      categorys.some(category => category._id === product.category_id && category.mainCategory === "Food" && category.category==="Cat")
    );
    setcatFood(catFilterFood);
    const accessorys = products.filter(product =>
      categorys.some(category => category._id === product.category_id && category.mainCategory === "Accessorys" && category.category.includes("Dog"))
    );
    setallAccessorys(accessorys);

  }, [dispatch, categorys, products]);
  const handleShowMore = () => {
    setItemsToShow(dogFood.length); // Show all items
    setShowAll(true); // Set showAll to true
  };

  const handleShowLess = () => {
    setItemsToShow(4); // Show only 4 items
    setShowAll(false); // Set showAll to false
  };
  return (
    <div className="container">
      <ImageSlider />
      {/* <h1 className="headding headding-margin">Our Services</h1>
      <Categorylist categorys={mainCategorys} /> */}
      {/* <div className="dogBanner">

      <img src="images/petBan.png" alt="banner" style={{borderRadius:"10px"}}/>
      </div> */}
      {/* <h1 className="headding" headding-margin>Top Categories For Your Dog</h1> */}
      {/* <Categorylist categorys={dogCategorys}/> */}
      {/* <Categoryslider categorys={categorys} /> */}
      {/* <h1 className="headding headding-margin">Pet-tastic Deals</h1> */}
      {/* <div className="videoContainer">
        <video className="desktop-video" autoplay="autoplay" loop="loop" muted="muted" width="300" height="150">
          <source src="https://zigly-happy-pets.s3.ap-south-1.amazonaws.com/videos/playful-temptations-desktop.mp4" type="video/mp4" />
          Your browser does not support the video tag.</video>  */}
        {/* <video class="mobile-video" autoplay="autoplay" loop="loop" muted="muted" width="300" height="150">
  <source src="https://zigly-happy-pets.s3.ap-south-1.amazonaws.com/videos/playful-temptations-mobile.mp4" type="video/mp4"/>
  Your browser does not support the video tag.</video> */}
      {/* </div> */}
     {/* dog food star */}
     <h1 className="headding headding-margin">🐾Top Deals on Dog Food</h1>
     <Cards filteredProduct={dogFood.slice(0, itemsToShow)} />
  <div className="moreAndLessBtn-container">
  {showAll ? (
        <button onClick={handleShowLess} className="moreAndLessBtn">View Less</button>
      ) : (
        itemsToShow < dogFood.length && (
          <button onClick={handleShowMore} className="moreAndLessBtn">View More</button>
        )
      )}
  </div>
     {/* dog food end */}
    <div className="videoContainer">
        <video className="desktop-video" autoplay="autoplay" loop="loop" muted="muted" width="300" height="150">
          <source src="https://zigly-happy-pets.s3.ap-south-1.amazonaws.com/videos/playful-temptations-desktop.mp4" type="video/mp4" />
          Your browser does not support the video tag.</video>
        {/* <video class="mobile-video" autoplay="autoplay" loop="loop" muted="muted" width="300" height="150">
  <source src="https://zigly-happy-pets.s3.ap-south-1.amazonaws.com/videos/playful-temptations-mobile.mp4" type="video/mp4"/>
  Your browser does not support the video tag.</video> */}
      </div>

  <h1 className="headding headding-margin">🎉 Dog Toys ! Playtime Fun Awaits! 🐱</h1>
  <Cards filteredProduct={allAccessorys.slice(0, itemsToShow)} />
      <div className="moreAndLessBtn-container">
  {showAll ? (
        <button onClick={handleShowLess} className="moreAndLessBtn">View Less</button>
      ) : (
        itemsToShow < dogFood.length && (
          <button onClick={handleShowMore} className="moreAndLessBtn">View More</button>
        )
      )}
  </div>
{/* Cat */}
          <div className="videoContainer">
          <video class="desktop-video" autoplay="autoplay" loop="loop" muted="muted" width="650" height="150">
  <source src="https://zigly-happy-pets.s3.ap-south-1.amazonaws.com/videos/2023-09-10-kitty-pawrty-supplies-desktop.mp4" type="video/mp4"/>
  Your browser does not support the video tag.
</video>
        {/* <video class="mobile-video" autoplay="autoplay" loop="loop" muted="muted" width="300" height="150">
  <source src="https://zigly-happy-pets.s3.ap-south-1.amazonaws.com/videos/playful-temptations-mobile.mp4" type="video/mp4"/>
  Your browser does not support the video tag.</video> */}
      </div>
      <h1 className="headding headding-margin">Top-Quality Cat Food Here!🐾 </h1>
      <Cards filteredProduct={catFood.slice(0, itemsToShow)} />
      <div className="moreAndLessBtn-container">
  {showAll ? (
        <button onClick={handleShowLess} className="moreAndLessBtn">View Less</button>
      ) : (
        itemsToShow < dogFood.length && (
          <button onClick={handleShowMore} className="moreAndLessBtn">View More</button>
        )
      )}
  </div>
 


      {/* <MyCarousel  items={newProducts}/> */}
      <Blogs sx="0"/>
      {/* <Cardslider /> */}
    </div>
  );
}
export default Home;