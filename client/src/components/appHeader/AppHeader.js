import { Link, NavLink } from 'react-router-dom';

import './appHeader.scss';

import logo from '../../img/logo.svg';
import btn from '../../img/discuss-btn.png';

const AppHeader = () => {

    return (
        <header className="header">
            <div className="container">
                <div className="header__wrap">
                    <Link to="/" className='header__logo'>
                        <img src={logo} alt="DEUS" />
                    </Link>
                    <nav className="header__nav hidden-mobile">
                        <ul className="header__nav-list">
                            <li className="header__nav-item">
                                <NavLink to="/projects">Проекты</NavLink>
                            </li>
                            <li className="header__nav-item">
                                <NavLink to="/agency">Агентство</NavLink>
                            </li>
                            <li className="header__nav-item">
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
                </div>
            </div>
        </header>
    )

}

export default AppHeader;