import React from 'react';
import "./CSS/Categorylist.css";

const Categorylist = () => {
    const categoryDetails = [
        {
            url: "https://cdn.petsworld.network/v1/b/assets.petsworld.network/o/images%2Fcategories%2Fcategory-dog.png?h=256",
            name: "Dogs"
        },
        {
            url: "https://cdn.petsworld.network/v1/b/assets.petsworld.network/o/images%2Fcategories%2Fcategory-cat.png?h=256",
            name: "Cats"
        },
        {
            url: "https://cdn.petsworld.network/v1/b/assets.petsworld.network/o/images%2Fcategories%2Fcategory-bird.png?h=256",
            name: "Birds"
        },
        {
            url: "https://cdn.petsworld.network/v1/b/assets.petsworld.network/o/images%2Fcategories%2Fcategory-fish.png?h=256",
            name: "Fishes"
        },
    ];

    return (
        <div className="container">
            
            <div className="row">
                {categoryDetails.map((item, index) =>
                    // <div key={index} className="col-4 col-sm-4 col-md-3 col-lg-2">
                    <div key={index} className="col-4 col-sm-4 col-md-3 align-center">
                        <div className="category-item">
                            <div className="category-image">
                                <img src={item.url} alt={item.name} />
                            </div>
                            <div className="category-name">
                                <small>{item.name}</small>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Categorylist;
