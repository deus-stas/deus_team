import { useState, useEffect } from 'react';
import axios from 'axios'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import './appHeader.scss';

import logo from '../../img/logo.svg';
import btn from '../../img/discuss-btn.png';

const apiUrl = process.env.NODE_ENV === 'production'
    ? 'http://188.120.232.38'
    : process.env.REACT_APP_LOCALHOST_URI;

const AppHeader = (props) => {


    const [headerData, setHeaderData] = useState([]);

    useEffect(() => {
        axios.get(`${apiUrl}/api/headerData/`)
            .then((response) => {
                setHeaderData(response.data[0]);
                console.log('header data',response.data[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    const navigate = useNavigate();
  
    const handleClick = () => {
        navigate('/contacts#contactUs');
    };
    
    const gotoAnchor = (e) => {
        setTimeout(() => {
            let element = document.getElementById(e.target.getAttribute('datahash'));
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 750)
    }
    
    
    const [menu, setMenu] = useState(false);    
    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="header__wrap">
                        <Link to="/" className='header__logo'>
                            <img src={logo} alt="DEUS" />
                        </Link>
                        <nav className="header__nav">
                            <ul className="header__nav-list">
                                <li className="header__nav-item ">
                                    <NavLink to="/projects">Проекты</NavLink>
                                </li>
                                <li className="header__nav-item hidden-mobile">
                                    <NavLink to="/services">Услуги</NavLink>
                                </li>
                                <li className="header__nav-item hidden-mobile">
                                    <NavLink to="/agency">Агентство</NavLink>
                                </li>
                                {/* <li className="header__nav-item hidden-mobile">
                                    <NavLink to="/news">Журнал</NavLink>
                                </li> */}
                                <li className="header__nav-item hidden-mobile">
                                    <NavLink to="/contacts">Контакты</NavLink>
                                </li>
                            </ul>
                        </nav>
                        
                        {
                            headerData && headerData.phone && headerData.email ? 
                            (
                                <div className="header__contacts hidden-mobile">  
                                    <Link to={`mailto:${headerData.email}`} className="header__contacts-link">{headerData.email}</Link>
                                    <Link to={`tel:${headerData.phone}`} className="header__contacts-link">{headerData.phone}</Link>
                                </div>
                            ) : 
                            (
                                <div className="header__contacts hidden-mobile">
                                    <Link to="mailto:hello@de-us.ru" className="header__contacts-link">hello@de-us.ru</Link>
                                    <Link to="tel:+74951034351" className="header__contacts-link">+7 (495) 103—4351</Link>
                                </div>
                            )
                        }

                        
                        {/* <div onClick={handleClick} className="header__discuss hidden-mobile">
                            <img src={btn} alt="Обсудить проект" className="header__discuss-img" />
                            <div className="header__discuss-text">Обсудить проект</div>
                        </div> */}
                        <Link to="/contacts"  className="header__discuss hidden-mobile" datahash="contactUs" onClick={(e) => gotoAnchor(e)}>
                            {
                                headerData.headerPhoto ? 
                                (
                                    <img  datahash="contactUs" onClick={(e) => gotoAnchor(e)} src={`${apiUrl}/uploads/${headerData.headerPhoto.filename}`} alt="Обсудить проект" className="header__discuss-img" />
                                ) : (
                                    <img  datahash="contactUs" onClick={(e) => gotoAnchor(e)} src={btn} alt="Обсудить проект" className="header__discuss-img" />
                                )
                            }
                            <div datahash="contactUs" onClick={(e) => gotoAnchor(e)} className="header__discuss-text">Обсудить проект</div>
                        </Link>
                        
                        <div className={`header__burger hidden-desktop ${menu ? 'active' : ''}`} onClick={() => setMenu(!menu)}>
                            <span></span>
                        </div>
                    </div>
                </div>
            </header>
            <div className={`header__menu ${menu ? 'active' : ''}`}>
                <div className="header__menu-wrap">
                    <nav className="header__menu-nav">
                        <ul className="header__menu-list">
                            <li className="header__menu-item">
                                <NavLink to="/projects" onClick={() => setMenu(!menu)}>Проекты</NavLink>
                            </li>
                            <li className="header__menu-item">
                                <NavLink to="/services" onClick={() => setMenu(!menu)}>Услуги</NavLink>
                            </li>
                            <li className="header__menu-item">
                                <NavLink to="/agency" onClick={() => setMenu(!menu)}>Агентство</NavLink>
                            </li>
                            {/* <li className="header__menu-item">
                                <NavLink to="/news" onClick={() => setMenu(!menu)}>Журнал</NavLink>
                            </li> */}
                            <li className="header__menu-item">
                                <NavLink to="/contacts" onClick={() => setMenu(!menu)}>Контакты</NavLink>
                            </li>
                        </ul>
                        <div>
                    </div>
                    </nav>
                    {
                        headerData && headerData.email && headerData.phone ?
                        (
                            <div className="header__menu-contacts">
                                <Link to={`mailto:${headerData.email}`} className="header__menu-contacts-link">{headerData.email}</Link>
                                <Link to={`tel:${headerData.phone}`} className="header__menu-contacts-link">{headerData.phone}</Link>
                            </div>
                        ) : (
                            <div className="header__menu-contacts">
                                <Link to="tel:+74951034351" className="header__menu-contacts-link">+7 (495) 103—4351</Link>
                                <Link to="mailto:hello@de-us.ru" className="header__menu-contacts-link">hello@de-us.ru</Link>
                            </div>
                        )
                    }
                    
                    <div className="header__bot">
                        <Link to="/contacts"  className="header__cta" datahash="contactUs" onClick={(e) => gotoAnchor(e)}>
                            <img datahash="contactUs" onClick={(e) => gotoAnchor(e)} src={btn} alt="Обсудить проект" />
                            Обсудить проект
                        </Link>
                        {/* <a href='contacts#contactWithUsPart'>
                           
                        </a> */}
                        {/* <Link to="/" className="header__presa">Презентация агентства</Link> */}
                        {
                            headerData && headerData.presentation ? 
                            <a href={`${apiUrl}/uploads/${headerData.presentation.filename}`} target='_blank'  className="header__presa">Презентация агентства</a> :
                            <a href={`${apiUrl}/uploads/DEUS.pdf`} target='_blank'  className="header__presa">Презентация агентства</a>
                        }
                    </div>
                </div>
            </div>
        </>

    )

}

export default AppHeader;