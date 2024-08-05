import {useEffect, useState,} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {connect} from "react-redux";
import './appHeader.scss';
import btn from '../../img/discuss-btn.png';
import RetryImage from "../../helpers/RetryImage";
import {Icon} from "../icon/Icon";
import DelayedLink, {DelayedNavLink} from "./DelayedLink";
import {setIsLoadingMainPageEvent} from "../../axios";
import {gotoAnchor} from "../anchors";

const apiUrl = ''

const AppHeader = (props) => {
    const [isLoading, setIsLoading] = useState(true);

    const [menu, setMenu] = useState(false);
    const [prevScroll, setPrevScroll] = useState(0);
    const [lastShowPos, setLastShowPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [visibleMob, setVisibleMob] = useState(true);
    const location = useLocation()

    useEffect(() => {
        const defaultColor = [
            /^\/$/,
            /^\/contacts$/,
            /^\/news$/,
            /^\/login$/,
            /^\/services\/.*$/,
            /^\/projects\/.*$/
        ];
        let header = document.querySelector('.header')
        let headerMob = document.querySelector('.headerMob')

        if (!!header) {
            if (defaultColor.some(pattern => pattern.test(location.pathname))) {
                header.classList.remove('white');

            } else {
                header.classList.add('white');

            }
        }

    }, [isLoading, location])


    useEffect(() => {
        let header = document.querySelector(".header");
        let headerMob = document.querySelector(".headerMob");
        let menu = document.querySelector(".activeMenu");
        [header, headerMob, menu].filter(Boolean).forEach((el) => {
            el.style.pointerEvents = "none";
            const isWhite = document.elementFromPoint(40, el.offsetTop + el.offsetHeight / 2).closest(".whiteHeader");
            if (isWhite) {
                if (menu) {
                    headerMob.classList.remove("white")
                    header.classList.remove("white")
                } else {
                    headerMob.classList.add("white")
                    header.classList.add("white")
                }
            } else {
                headerMob.classList.remove("white")
                header.classList.remove("white")
            }
            el.style.pointerEvents = "";
        });
    }, [menu]);

    // хук для изменения цвета хедера, с троттлингом для производительности
    useEffect(() => {
      let id;
      const handleScroll = () => {
        clearTimeout(id);
        id = setTimeout(() => {
          let header = document.querySelector(".header");
          let headerMob = document.querySelector(".headerMob");
          let menu = document.querySelector(".activeMenu");
          [header, headerMob, menu].filter(Boolean).forEach((el) => {
            el.style.pointerEvents = "none";
            const isWhite = document.elementFromPoint(40, el.offsetTop + el.offsetHeight / 2).closest(".whiteHeader");
            isWhite ? el.classList.add("white") : el.classList.remove("white");
            el.style.pointerEvents = "";
          });
        }, 50);
      };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;

            if (scrolled > 0 && scrolled > prevScroll) {
                setVisible(false);
                setLastShowPos(scrolled);
            } else if (scrolled <= Math.max(lastShowPos - 100, 0)) {
                setVisible(true);
            }
            setPrevScroll(scrolled);

        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScroll, lastShowPos]);

    useEffect(()=>{
        const hiddenHeader = () => {

            const scrollMob = window.scrollY;
            if (window.innerWidth <= 767) {
                if (scrollMob < 10 && !menu ) {
                    setVisibleMob(true);
                } else {
                    setVisibleMob(false);
                }
            }
        }

        window.addEventListener('scroll', hiddenHeader);
        return () => {
            window.removeEventListener('scroll', hiddenHeader);
        };
    },)

    useEffect(() => {
        setIsLoadingMainPageEvent(true)

        const handleLoad = (e) => {
            if (e.detail.isLoading !== isLoading) {
                setIsLoading(e.detail.isLoading);
            }
        };

        window.addEventListener('isLoadingMainPage', handleLoad);
        return () => {
            window.removeEventListener('isLoadingMainPage', handleLoad);
        };
    }, []);

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/contacts#contactUs');
    };


    const {headerData} = props;

    return (
        <>
            {!isLoading && headerData &&
                <>
                    <header className={`header ${visibleMob ? "activeScroll": "hiddenScroll"} ${menu ? 'hidden-mobile' : ''} `}>
                        <div className="container">
                            <div className="header__wrap">
                                <DelayedLink to="/" className='header__logo'>
                                    <Icon icon="headerLogo" viewBox="0"/>
                                </DelayedLink>
                                <nav className={`header__nav m-text ${visible ? '' : 'hidden'}`}>
                                    <ul className="header__nav-list">
                                        <li className="header__nav-item hover-flip hidden-mobile">
                                            <DelayedNavLink to="/agency">
                                                <span data-hover="Агентство">Агентство</span>
                                            </DelayedNavLink>
                                        </li>
                                        <li className="header__nav-item hover-flip hidden-mobile">
                                            <DelayedNavLink to="/services">
                                                <span data-hover="Услуги">Услуги</span>
                                            </DelayedNavLink>
                                        </li>
                                        <li className="header__nav-item hover-flip hidden-mobile">
                                            <DelayedNavLink to="/projects">
                                                <span data-hover="Проекты">Проекты</span>
                                            </DelayedNavLink>
                                        </li>
                                        <li className="header__nav-item hover-flip hidden-mobile">
                                            <DelayedNavLink to="/news">
                                                <span data-hover="Блог">Блог</span>
                                            </DelayedNavLink>
                                        </li>
                                        <li className="header__nav-item hover-flip hidden-mobile">
                                            <DelayedNavLink to="/contacts">
                                                <span data-hover="Контакты">Контакты</span>
                                            </DelayedNavLink>
                                        </li>
                                    </ul>
                                </nav>

                                <DelayedLink to="/contacts" className="header__discuss hidden-mobile"
                                             datahash="contactUs"
                                             onClick={(e) => gotoAnchor(e)}>
                                    {!!headerData.headerPhoto &&
                                                <RetryImage datahash="contactUs" onClick={(e) => gotoAnchor(e)}
                                                            src={`${apiUrl}/uploads/${headerData.headerPhoto.filename}`}
                                                            alt="Обсудить проект" className="header__discuss-img"/>
                                    }
                                    <div datahash="contactUs" onClick={(e) => gotoAnchor(e)}
                                         className="header__discuss-text m-text">Обсудить проект
                                    </div>
                                </DelayedLink>

                                <div className={`header__burger hidden-desktop  ${menu ? 'activeMenu active' : ''}`}
                                     onClick={() =>{
                                         setMenu(!menu)
                                     }}>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className={`header-conatiner hidden-desktop `}>
                        <header className={`headerMob ${menu ? 'headerMob-active' : ''}`}>
                            <div className="headerMob-top">
                                <div className={`menu ${menu ? 'activeMenu' : ''}`}>
                                    <div className={`menu-wrap ${menu ? 'menu-wrap-active' : ''}`}>

                                        <nav className="menu-nav">
                                            <ul className="menu-list">
                                                <li className="menu-item">
                                                    <DelayedNavLink to="/projects"
                                                                    onClick={() => setMenu(!menu)}>Проекты</DelayedNavLink>
                                                </li>
                                                <li className="menu-item">
                                                    <DelayedNavLink to="/agency"
                                                                    onClick={() => setMenu(!menu)}>Агентство</DelayedNavLink>
                                                </li>
                                                <li className="menu-item">
                                                    <DelayedNavLink to="/services"
                                                                    onClick={() => setMenu(!menu)}>Услуги</DelayedNavLink>
                                                </li>

                                                <li className="menu-item">
                                                    <DelayedNavLink to="/contacts"
                                                                    onClick={() => setMenu(!menu)}>Контакты</DelayedNavLink>
                                                </li>
                                            </ul>
                                            <div>
                                            </div>
                                        </nav>
                                        {
                                            headerData && headerData.phone ?
                                                (
                                                    <div className="menu-contacts">
                                                        <DelayedLink to={`tel:${headerData.phone}`}
                                                                     className="menu-contacts-link">{headerData.phone}</DelayedLink>
                                                    </div>
                                                ) : (
                                                    <div className="menu-contacts">
                                                        <DelayedLink to="tel:+74951034351"
                                                                     className="menu-contacts-link">+7
                                                            (495)
                                                            103—4351</DelayedLink>
                                                    </div>
                                                )
                                        }

                                        <div className="hidden-desktop">
                                            <DelayedLink to="/contacts" className="header__discuss" datahash="contactUs"
                                                         onClick={(e) => gotoAnchor(e)}>
                                                {
                                                    headerData.headerPhoto ?
                                                        (
                                                            <RetryImage datahash="contactUs"
                                                                        onClick={(e) => gotoAnchor(e)}
                                                                        src={`${apiUrl}/uploads/${headerData.headerPhoto.filename}`}
                                                                        alt="Обсудить проект"
                                                                        className="header__discuss-img"/>
                                                        ) : (
                                                            <img datahash="contactUs" onClick={(e) => gotoAnchor(e)}
                                                                 src={btn}
                                                                 alt="Обсудить проект" className="header__discuss-img"/>
                                                        )
                                                }
                                                <div datahash="contactUs" onClick={(e) => gotoAnchor(e)}
                                                     className="header__discuss-text">Обсудить проект
                                                </div>
                                            </DelayedLink>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            {(!visibleMob || menu) &&
                            <div className="headerMob-bottom">
                                <div className={`headerMob-bottom__wrap ${menu ? 'headerMob-bottom__wrap-activeBot' : ''}`}>
                                    <DelayedLink to="/" className='headerMob-bottom__logo'>
                                        <Icon icon="headerLogo" viewBox="0"/>
                                    </DelayedLink>

                                    <div className={`header__burger mob hidden-desktop ${menu ? 'activeMenu active' : ''}`}
                                         onClick={() => {
                                             setMenu(!menu)
                                         }}>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                            }
                        </header>
                    </div>

                </>
            }
        </>

    )

}

export default connect(
    (state) => ({headerData: state.app.headerData})
)(AppHeader)