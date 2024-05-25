// import "./CSS/top.css"
import { Link } from "react-router-dom";
import "./CSS/Navbar.css";
import ButtonComponent from "./ButtonComponent";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
const Navbartop = () => {
    const [activeLink, setActiveLink] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section[id]');
            const scrollY = window.pageYOffset;

            sections.forEach(current => {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 50;
                const sectionId = current.getAttribute('id');

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    setActiveLink(sectionId);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array ensures this effect runs only once on component mount

    const handleScrollHeader = () => {
        const header = document.getElementById('header');
        if (window.scrollY >= 80) {
            header.classList.add('scroll-header');
        } else {
            header.classList.remove('scroll-header');
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScrollHeader);

        return () => {
            window.removeEventListener('scroll', handleScrollHeader);
        };
    }, []);
    const userId = useSelector((state) => state.user.userId)
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
        <header className="header" id="header">
            <nav className="nav container">
                {/* <a href="#" className="nav__logo">Marlon</a> */}
                <Link to="/" className="logoContainer">
                        <img src="https://static.freshtohome.com/images/logo/2021/logo-medium.png" className="logo" alt="" />
                    </Link>
                <div className="nav__menu" id="nav-menu">
                    <ul className="nav__list">

                        {/* <li className="nav__item">
                        <a href="#home" className="nav__link active-link">
                            <i className='bx bx-home-alt nav__icon'></i>
                            <span className="nav__name">Home</span>
                        </a>
                    </li> */}
                        {
                            menus.map((menu, id) => {
                                return (
                                    <li className="nav__item menuContainer" key={id}>
                                        <Link to={menu.to} className="nav__link menu">
                                        <i className='bx bx-home-alt nav__icon'></i>
                                            <span className="">{menu.menu}</span>
                                        </Link>
                                    </li>
                                );
                            })
                        }
                        {userId ? (<><li><Link to="/cart" className="menu"><i className="bi bi-bag-fill"></i></Link></li>
                        <li><Link to="/cart" className="nav__link menu"><i className="bi bi-person-fill"></i></Link></li>   </>)
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
                </div>

                <img src="assets/img/perfil.png" alt="" className="nav__img" />
            </nav>
        </header>
    )
}
export default Navbartop;