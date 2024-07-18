import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ButtonComponent from './ButtonComponent';
import './CSS/Navbar.css';
import { useCart } from "react-use-cart";
import {fetchAndStore} from '../Slice/userSlice'
import { useDispatch, useSelector } from 'react-redux';
const Navbar = () => {
    const { totalItems } = useCart();
    const dispatch=useDispatch()
    const [isOpen, setIsOpen] = useState(false);
    const userId=JSON.parse(localStorage.getItem('userId'));  
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && !event.target.closest('.navbar-container')) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const menus = [
        {
            menu: 'PETS',
            to: '/Pets',
        },
        {
            menu: 'FOOD',
            to: '/foods',
        },
        {
            menu: 'ACCESSORIES',
            to: '/accessorys',
        },
        {
            menu: 'MEDICINE',
            to: '/medicine',
        },
        {
            menu: 'BLOGS',
            to: '/blogs',
        },
        {
            menu: 'CARE TAKING',
            to: '/caretaking',
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
                    {menus.map((menu, id) => (
                        <li className="menuContainer" key={id}>
                            <Link to={menu.to} className="menu">
                                <span>{menu.menu}</span>
                            </Link>
                        </li>
                    ))}
                    {userId !== null ? (
                        <>
                            <li>
                                <Link to="/cart" className="menu">
                                    <i className="bi bi-bag-fill"></i>
                                    <small className='cartNumber'>{totalItems}</small>
                                </Link>
                            </li>
                            <li>
                                <Link to="/profile" className="menu">
                                    <i className="bi bi-person-fill"></i>
                                </Link>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link to="/login">
                               <button className="addbtn smallBtn">Login </button>
                            </Link>
                        </li>
                    )}
                </ul>
                <h1 className="logo">
                    <Link to="/">
                        <img src="./images/logo.png" alt="" />
                    </Link>
                </h1>
            </div>
        </nav>
    );
};

export default Navbar;
