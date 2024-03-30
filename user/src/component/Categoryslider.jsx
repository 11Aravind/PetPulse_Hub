import React, { useEffect, useState, useRef } from 'react';
import './CSS/categoryslider.css'; // Import CSS file

const Categoryslider = ({ categorys,headding }) => {
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

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
  return (
    <div className="container">
      <div className="main-slider">
        <h1 className='headding'>{headding}</h1>
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
              <div className="card-wrapper" key={index}>
                {/* <img
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029856/PC_Creative%20refresh/3D_bau/banners_new/Pizza.png`}
                alt=""
              /> */}
                <div className="mainContainer">
                  <div className="image">
                    <img src={`http://localhost:5001/${category.image}`} alt="" />
                  </div>
                  <div className="categoryName">
                    <b>{category.subCategory}</b>
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