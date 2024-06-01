import { Link } from "react-router-dom";
import ButtonComponent from "./ButtonComponent";
import { useSelector } from "react-redux"
import React, { useState, useEffect } from 'react';
import "./CSS/Navbar.css";
const Navbar = () => {
    // const userId = useSelector((state) => state.user.userId)

    const [isOpen, setIsOpen] = useState(false);
const[userId,setId]=useState();
// ;
useEffect(() => {
    setId(JSON.parse(localStorage.getItem("userId")))
        const handleClickOutside = (event) => {
            if (isOpen && !event.target.closest('.navbar-container')) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen,userId]);
    console.log(userId);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const menus = [
        {
            menu: 'PETS',
            to: "/Pets"
        },
        {
            menu: 'FOOD',
            to: "/foods"
        },
        {
            menu: 'ACCESSORYS',
            to: "/accessorys"
        },
        {
            menu: 'MEDICINE',
            to: "/medicine"
        },
        {
            menu: 'BLOGS',
            to: "/blogs"
        },
        {
            menu: 'CARE TAKING',
            to: "/productdetails"
        },
    ];
    return (
        <nav className={`navbar ${isOpen ? 'open' : ''}`}>
            <div className="navbar-container crossBtn">
                <input type="checkbox" name="" id="" checked={isOpen} onChange={toggleNavbar} />
                <div className="hamburger-lines" onClick={toggleNavbar}>
                    <span className="line line1"></span>
                    <span className="line line2"></span>
                    <span className="line line3"></span>
                </div>
                <ul className="menu-items">
                    {
                        menus.map((menu, id) => {
                            return (
                                <li className="menuContainer" key={id}>
                                    <Link to={menu.to} className="menu">
                                        <span>{menu.menu}</span>
                                    </Link>
                                </li>
                            );
                        })
                    }
                    {/* </ul> */}

                    {/* <ul className="menu-items"> */}
                    {/* <li><Link to="/" className="menu">search</Link></li> */}
                    {
                    userId!==null ? (<><li><Link to="/cart" className="menu"><i className="bi bi-bag-fill"></i></Link></li>
                        <li><Link to="/cart" className="menu"><i className="bi bi-person-fill"></i></Link></li>   </>)
                        : (<li>
                            <Link to="/login">
                                <ButtonComponent
                                    text="Login"
                                    classs="addbtn smallBtn"
                                />
                            </Link>
                        </li>)
                    }
                </ul>
                <h1 className="logo">
                    <Link to="/">
                        <img src="https://static.freshtohome.com/images/logo/2021/logo-medium.png" alt="" />
                    </Link>
                </h1>
            </div>
        </nav>

    );
}
export default Navbar;  