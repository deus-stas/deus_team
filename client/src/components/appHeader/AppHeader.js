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
import {useMobile} from "../pages/projects/projectDetail/ProjectDetail";

const apiUrl = ''

const AppHeader = (props) => {
    const [isLoading, setIsLoading] = useState(true);

    const [menu, setMenu] = useState(false);
    const [prevScroll, setPrevScroll] = useState(0);
    const [lastShowPos, setLastShowPos] = useState(0);
    const [visible, setVisible] = useState(true);
    // const [visibleMob, setVisibleMob] = useState(true);
    const location = useLocation()

    const {isLaptop, isDesktop, isMobile} = useMobile();

    const handleHeaderColor = (header, headerMob, menu) => {
        [header, headerMob, menu].filter(Boolean).forEach((el) => {
            el.style.pointerEvents = "none";
            const isWhite = document.elementFromPoint(40, el.offsetTop + el.offsetHeight / 2).closest(".whiteHeader");
            isWhite ? el.classList.add("white") : el.classList.remove("white");
            el.style.pointerEvents = "";
        });
    };

    useEffect(() => {
        let id;
        const handleScroll = () => {
            clearTimeout(id);
            id = setTimeout(() => {
                let header = document.querySelector(".header");
                let headerMob = document.querySelector(".headerMob");
                let menu = document.querySelector(".activeMenu");
                handleHeaderColor(header, headerMob, menu);
            }, 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [menu]);

    useEffect(() => {
        const styles = {
            wide: { width: '100%' },
            narrowly: { width: '64vw' },
            up: { transform: 'translateY(-30rem)' },
            down: { transform: 'translateY(0)' }
        };

        const handleScroll = () => {
            const scrolled = window.scrollY;
            const header = document.querySelector('.header');
            const headerWrap = document.querySelector('.header__wrap');

            if (!!header || !!headerWrap) {
                if (!!menu) { // если меню открыто
                    headerWrap.style.width = styles.wide.width;
                    header.style.transform = styles.down.transform;
                } else { // если меню закрыто
                    if (scrolled === 0) {
                        headerWrap.style.width = styles.wide.width;
                        header.style.transform = styles.down.transform;
                    } else if (scrolled < prevScroll) {
                        header.style.transform = styles.down.transform;
                    } else if (scrolled > 500) {
                        header.style.transform = styles.up.transform;
                    } else if (scrolled > 0 && scrolled < 500) {
                        headerWrap.style.width = styles.narrowly.width;
                    }
                }

                setPrevScroll(scrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [menu, prevScroll]);


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

    const {headerData, services} = props;

    const navLink = (
        <nav className={`header__nav m-text ${visible ? '' : 'hidden'}`}>
            <ul className={`header__nav-list ${isDesktop ? 'm-text' : isLaptop && 'heading-secondary'}`}>
                <li className={`header__nav-item ${isDesktop ? 'hover-flip' : ''}`}>
                    <DelayedNavLink to="/agency">
                        <span data-hover="Агентство">Агентство</span>
                    </DelayedNavLink>
                </li>
                <div style={{position: "relative"}}>
                    <li className={`header__nav-item ${isDesktop ? 'hover-flip' : ''}`}>
                        <DelayedNavLink to="/services">
                            <span data-hover="Услуги">Услуги</span>
                        </DelayedNavLink>
                    </li>
                    <div className="xs-text services-count">{services.length}</div>
                </div>

                <li className={`header__nav-item ${isDesktop ? 'hover-flip' : ''}`}>
                    <DelayedNavLink to="/projects">
                        <span data-hover="Проекты">Проекты</span>
                    </DelayedNavLink>
                </li>
                <li className={`header__nav-item ${isDesktop ? 'hover-flip' : ''}`}>
                    <DelayedNavLink to="/news">
                        <span data-hover="Блог">Блог</span>
                    </DelayedNavLink>
                </li>
                <li className={`header__nav-item ${isDesktop ? 'hover-flip' : ''}`}>
                    <DelayedNavLink to="/contacts">
                        <span data-hover="Контакты">Контакты</span>
                    </DelayedNavLink>
                </li>
            </ul>
        </nav>
    )

    return (
        <>
            {!isLoading && headerData &&
                <>
                    <header className={`header`}>
                        <div className="container">
                            <div className="header__wrap">
                                <DelayedLink to="/" className='header__logo'>
                                    <Icon icon="logo" viewBox="0 0 67 30"/>
                                </DelayedLink>
                                {isDesktop && (<>{navLink}</>)}
                                <span className="header-nav"
                                      style={{
                                          display: "flex",
                                          gap: "10px",
                                          justifyContent: "flex-end",
                                          alignItems: 'center'
                                      }}>
                                    {isMobile ? null : <>
                                    {
                                        headerData && headerData.phone &&
                                        (
                                            <div className={`menu-contacts ${menu ? 'hidden' : ''}`}>
                                                <a href={`tel:${headerData.phone}`} className="menu-contacts-link">
                                                    <Icon icon="telephone" viewBox="0 0 18 18"/>
                                                </a>
                                            </div>
                                        )
                                    }

                                    <DelayedLink to="/contacts" className={`header__discuss ${menu ? 'hidden' : ''}`}
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
                                    </>}
                                    <div className={`header__burger hidden-desktop  ${menu ? 'activeMenu' : ''}`}
                                         onClick={() => {
                                             setMenu(!menu)
                                         }}>
                                        {menu ?
                                            <Icon icon="close" viewBox="0 0 24 24"/>
                                            :
                                            <Icon icon="dots" viewBox="0 0 24 24"/>
                                        }
                                    </div>
                                </span>

                            </div>
                        </div>
                    </header>

                    <div className={`header-conatiner hidden-desktop `}>
                        <header className={`headerMob ${menu ? 'headerMob-active' : ''}`}>
                            <div className="headerMob-top">
                                <div className={`menu ${menu ? 'activeMenu' : ''}`}>
                                    <div className={`menu-wrap ${menu ? 'menu-wrap-active' : ''}`}>

                                        {isLaptop && (<>{navLink}</>)}

                                        <div className="flex-wrap">
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

                                            {
                                                headerData && headerData.phone &&
                                                (
                                                    <div className="menu-contacts menu-contacts__menuSize">
                                                        <DelayedLink to={`tel:${headerData.phone}`} className="menu-contacts-link">
                                                            <Icon icon="telephone" viewBox="0 0 18 18"/>
                                                        </DelayedLink>
                                                    </div>
                                                )
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                    </div>

                </>
            }
        </>

    )

}

export default connect(
    (state) => ({ headerData: state.app.headerData, services: state.app.services,})
)(AppHeader)