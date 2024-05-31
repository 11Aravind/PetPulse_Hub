import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {changeVisibility} from "../Slice/visibilitySlice"
const Navbar = () => {
    const menuData = [
        {
            menu: 'Dashboard',
            url: "/",
            subMenu: {
                menu: 'menu 1',
                url: "/"
            },
        },
        {
            menu: 'Service',
            subMenu: [
                {
                    menu: 'Category',
                    url: "/category"
                },
                {
                    menu: 'Product',
                    url: "/productdetails"
                },
                {
                    menu: 'Caretaker',
                    url: "/caretaking"
                },
                {
                    menu: 'Order',
                    url: "/orderdetails"
                },
                {
                    menu: 'Blog',
                    url: "/blogs"
                },
                {
                    menu: 'Gallery',
                    url: "/gallery"
                },
            ],
        },
    ];
    // const[navbarShowOrHide,isToogleVisibility]=useState(false);
    // const navbarCallBack=(e)=>{
    //     isToogleVisibility(!navbarShowOrHide);
    //     console.log(navbarShowOrHide);
    // }
    const visibility=useSelector((state)=>state.visibility.visibility)

    return (
        <>
            <Topnavbar  
            // navbarShowOrHide={navbarShowOrHide} 
            // navbarCallBack={navbarCallBack}
            />     
            <div className={visibility?"content-container show":"hide"}>
                <div className="side-nav-container" >
                    {menuData.map((menuItem, index) => (
                        <div className="menu-container" key={index}>
                            <div className="main-menu-headding">{menuItem.menu}</div>

                            {Array.isArray(menuItem.subMenu) ? (
                                <>
                                    {menuItem.subMenu.map((subMenuItem, subIndex) => (
                                        <Link to={subMenuItem.url} key={subIndex}>
                                            <div className="submenu" key={subIndex}>{subMenuItem.menu}</div>

                                        </Link>))}
                                </>
                            ) : (
                                <Link to={menuItem.subMenu.url}>
                                    <div className="submenu" >{menuItem.subMenu.menu}</div>
                                </Link>
                                
                            )}
                        </div>

                    ))}
                </div>
            </div>
        </>
    );
}
export default Navbar;
export const Topnavbar = () => {
    const dispatch=useDispatch();
    const visibility=useSelector((state)=>state.visibility.visibility)
// dispatch(changeVisibility(!visibility))
    return (
        <div className="topnav-container">
           
            <div className="top-leftContainer">
            <div className="logo">
            <img src="https://img.freepik.com/premium-vector/dog-paw-animal-paws_77417-1636.jpg?w=740" alt="logo" style={{width:"40px"}}/>
            </div>
            <div className="closingBtn" onClick={()=>dispatch(changeVisibility(!visibility))}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
            </div>
            <div className="admin-name">
            {/* {navbarShowOrHide} */}
                Admin
            </div>
        </div>
    );
}