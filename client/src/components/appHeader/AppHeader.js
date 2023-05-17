import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import './appHeader.scss';

import logo from '../../img/logo.svg';
import btn from '../../img/discuss-btn.png';

const AppHeader = () => {

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
                                <li className="header__nav-item hidden-mobile">
                                    <NavLink to="/news">Новости</NavLink>
                                </li>
                                <li className="header__nav-item hidden-mobile">
                                    <NavLink to="/contacts">Контакты</NavLink>
                                </li>
                            </ul>
                        </nav>
                        <div className="header__contacts hidden-mobile">
                            <Link to="mailto:hi@deus.team" className="header__contacts-link">hi@deus.team</Link>
                            <Link to="tel:+74951034351" className="header__contacts-link">+7 (495) 103—4351</Link>
                        </div>
                        <Link to="/" className="header__discuss hidden-mobile">
                            <img src={btn} alt="Обсудить проект" className="header__discuss-img" />
                            <div className="header__discuss-text">Обсудить проект</div>
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
                                <NavLink to="/agency" onClick={() => setMenu(!menu)}>Агентство</NavLink>
                            </li>
                            <li className="header__menu-item">
                                <NavLink to="/contacts" onClick={() => setMenu(!menu)}>Контакты</NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div className="header__menu-contacts">
                        <Link to="tel:+74951034351" className="header__menu-contacts-link">+7 (495) 103—4351</Link>
                        <Link to="mailto:hi@deus.team" className="header__menu-contacts-link">hi@deus.team</Link>
                    </div>
                    <div className="header__bot">
                        <div className="header__cta">
                            <img src={btn} alt="Обсудить проект" />
                            Обсудить проект
                        </div>
                        <Link to="/" className="header__presa">Презентация агентства</Link>
                    </div>
                </div>
            </div>
        </>

    )

}

export default AppHeader;