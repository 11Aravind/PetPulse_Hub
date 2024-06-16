import React, { useEffect, useState, useRef } from 'react';
import './CSS/categoryslider.css'; // Import CSS file
import { useSelector } from 'react-redux';
const Categoryslider = ({ categorys,headding }) => {
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const imgPath=useSelector((state)=>state.common.imagePath);

  useEffect(() => {
    const updateScrollPosition = () => {
      if (containerRef.current) {
        setScrollPosition(containerRef.current.scrollLeft);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollPosition);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", updateScrollPosition);
      }
    };
  }, []);

  const scrollLeft = () => {
    const newPosition = scrollPosition - containerRef.current.offsetWidth / 2;
    setScrollPosition(newPosition >= 0 ? newPosition : 0);
    containerRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
  };

  const scrollRight = () => {
    const newPosition = scrollPosition + containerRef.current.offsetWidth / 2;
    const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth;
    setScrollPosition(newPosition <= maxScroll ? newPosition : maxScroll);
    containerRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
  };
  const checkCategory=(e)=>{
    const id=e.currentTarget.id
    console.log(id);
  }
  return (
    <div className="container">
      <div className="main-slider">
        {/* <h1 className='category-headding'>{headding}</h1> */}
        <div className="label-container">
          <button className="arrow-left" onClick={scrollLeft}>
            <i className="bi bi-arrow-left"></i>
          </button>
          <button className="arrow-right" onClick={scrollRight}>
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
        <div className="card-slider-main" ref={containerRef}>
          {
            categorys.map((category, index) => (
              <div className="card-wrapper" key={index} id={category._id} onClick={checkCategory}>
                <div className="mainContainer">
                  <div className="image">
                    <img src={imgPath+category.image} alt="" />
                  </div>
                  <div className="categoryName">
                  {category.subCategory}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Categoryslider;