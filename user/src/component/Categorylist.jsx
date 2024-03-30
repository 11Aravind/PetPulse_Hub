import React from 'react';
import "./CSS/Categorylist.css";

const Categorylist = ({categorys}) => {
    

    return (
        <div className="container">
            
            <div className="row">
                {categorys.map((item, index) =>
                    <div key={index} className="col-4 col-sm-4 col-md-3 col-lg-2">
                    {/* <div key={index} className="col-4 col-sm-4 col-md-3 align-center"> */}
                        <div className="category-item">
                            <div className="category-image">
                                <img src={item.url} alt={item.name} />
                            </div>
                            <div className="category-name">
                                <b>{item.name}</b>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Categorylist;
