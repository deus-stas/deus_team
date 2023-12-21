import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {Link, NavLink} from 'react-router-dom';

import './appFooter.scss';
import {Icon} from '../icon/Icon';
import {connect, useSelector} from "react-redux";
import arrorLink from "../../img/icon/arrow-link.svg";
import {debounce} from "@material-ui/core";

const apiUrl = process.env.NODE_ENV === 'production'
    ? 'http://188.120.232.38'
    : process.env.REACT_APP_LOCALHOST_URI;

const AppFooter = (props) => {

    const MOBILE_SIZE = 426
    const [isLoading, setIsLoading] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [isMobile, setIsMobile] = useState(windowWidth <= MOBILE_SIZE)


    useEffect(() => {
        const handleLoad = (e) => {
            setIsLoading(e.detail.isLoading);
        };

        window.addEventListener('isLoadingMainPage', handleLoad);

        return () => {
            window.removeEventListener('isLoadingMainPage', handleLoad);
            setIsLoading(true)
        };
    }, []);

    const handleButtonClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    const gotoAnchor = (e) => {
        setTimeout(() => {
            let element = document.getElementById(e.target.getAttribute('datahash'));
            element.scrollIntoView({behavior: "smooth", block: "start"});
        }, 750)
    }
    const {headerData, services} = props;

    const addressNode = <div className="footer__item">
        <div className="footer__list-item">г. Одинцово, ул. <br/> Молодежная, д.46, <br/> строение 1 офис
            24, 25
        </div>
        {/* <a className='btn' href={`${apiUrl}/uploads/DEUS.pdf`}>Скачать презентацию</a> */}
        {/*{*/}
        {/*    headerData && headerData.presentation ?*/}
        {/*        <a href={`${apiUrl}/uploads/${headerData.presentation.filename}`} target='_blank'*/}
        {/*           rel="noopener noreferrer" className="btn">Скачать презентацию</a> :*/}
        {/*        <a href={`${apiUrl}/uploads/DEUS.pdf`} target='_blank' rel="noopener noreferrer"*/}
        {/*           className="btn">Скачать презентацию</a>*/}
        {/*}*/}
    </div>

    const contactNode = <div className="footer__item --about">
        {/*<nav className="footer__nav">*/}
        {/*    <ul className='footer__list'>*/}
        {/*        <li className="footer__list-item"><Link to="/agency" datahash="agency"*/}
        {/*                                                onClick={(e) => gotoAnchor(e)}>О*/}
        {/*            компании</Link></li>*/}
        {/*        <li className="footer__list-item"><Link to="/agency" datahash="clients"*/}
        {/*                                                onClick={(e) => gotoAnchor(e)}>Клиенты</Link>*/}
        {/*        </li>*/}
        {/*        <li className="footer__list-item"><Link to="/agency" datahash="team"*/}
        {/*                                                onClick={(e) => gotoAnchor(e)}>Команда</Link>*/}
        {/*        </li>*/}
        {/*        <li className="footer__list-item"><Link to="/agency" datahash="awards"*/}
        {/*                                                onClick={(e) => gotoAnchor(e)}>Награды</Link>*/}
        {/*        </li>*/}
        {/*        <li className="footer__list-item"><Link to="/agency" datahash="vacancies"*/}
        {/*                                                onClick={(e) => gotoAnchor(e)}>Вакансии</Link>*/}
        {/*        </li>*/}
        {/*        <li className="footer__list-item"><Link to="/contacts">Контакты </Link></li>*/}
        {/*    </ul>*/}
        {/*</nav>*/}
        <p className="p-style hover-flip"><span data-hover="+7 (495) 103—4351">+7 (495) 103—4351</span></p>
        <p className="p-style hover-flip"><span data-hover="hello@de-us.ru">hello@de-us.ru</span></p>
    </div>

    useEffect(() => {
        window.addEventListener("resize", onResizeEvent);
        return () => window.removeEventListener("resize", onResizeEvent);
    }, [])

    useEffect(() => {
        setIsMobile(windowWidth <= MOBILE_SIZE)
    }, [windowWidth])
    const onResizeEvent = () => {
        debouncedResize();
    };


    const debouncedResize = debounce(() => setWindowWidth(window.innerWidth), 100);
    let footerRenderArr = [addressNode]
    if(!!isMobile){
        footerRenderArr.unshift(contactNode)
    }else{
        footerRenderArr.push(contactNode)
    }

    console.log('render',footerRenderArr,isMobile)

    return (
        <>
            <footer className="footer"
                    data-wow-offset="2"
                    data-wow-duration="3s"
                    data-wow-delay="1s">
                <div className="container">
                    <p className="footer-header heading-footer">
                        <span> Расскажите нам
                            <img onClick={handleButtonClick} className="to-top hidden-mobile" src={arrorLink}
                                 alt={'go'}/>
                        </span>
                        <span>о своем проекте, подумаем </span>
                        <span className="last-grid">над ним вместе  <btn className="btn --footer  hidden-mobile">Обсудить проект</btn></span>
                        <Link to={`/contacts`} className="hidden-desktop">
                            <btn className="btn --footer">Обсудить проект</btn>
                        </Link>

                    </p>
                    {headerData &&
                        <>
                            {!!isMobile && <div className="wrap-mobile">{footerRenderArr.map(value=>value)}</div>}
                            <div className="footer__wrap">
                                <>
                                    {!isMobile && <>{footerRenderArr.map(value=>value)}</>}

                                    <nav>
                                        <ul className="footer__pages p-style">
                                            <li className="footer__pages-item hover-flip">
                                                <NavLink to="/agency"> <span
                                                    data-hover="Агентство">Агентство</span></NavLink>
                                            </li>
                                            <li className="footer__pages-item hover-flip ">
                                                <NavLink to="/projects"><span
                                                    data-hover="Услуги">Услуги</span></NavLink>
                                            </li>
                                            <li className="footer__pages-item hover-flip">
                                                <NavLink to="/services"><span
                                                    data-hover="Проекты">Проекты</span></NavLink>
                                            </li>

                                            {/* <li className="header__nav-item hidden-mobile">
                                    <NavLink to="/news">Журнал</NavLink>
                                </li> */}
                                            <li className="footer__pages-item hover-flip">
                                                <NavLink to="/contacts"><span
                                                    data-hover="Контакты">Контакты</span></NavLink>
                                            </li>
                                        </ul>
                                    </nav>
                                </>

                                <>
                                    <div className="footer__contacts">

                                        {/* <a href="tel:+74951034351" className="footer__contacts-item">+7 (495) 103—4351</a>
                        <a href="mailto:hello@de-us.ru" className="footer__contacts-item">hello@de-us.ru</a> */}
                                        {
                                            headerData && headerData.vk && headerData.telegram && headerData.behance ?
                                                <div className="footer__social p-style">
                                                    <Link className="footer__social-item hover-flip"
                                                          to={`${headerData.dprofile}`}> <span
                                                        data-hover="Dprofile">Dprofile</span></Link>
                                                    <Link className="footer__social-item hover-flip"
                                                          to={`${headerData.vk}`}><span data-hover="VK">VK</span></Link>
                                                    <Link className="footer__social-item hover-flip"
                                                          to={`${headerData.behance}`}><span
                                                        data-hover="Behance">Behance</span></Link>
                                                    <Link className="footer__social-item hover-flip"
                                                          to={`${headerData.telegram}`}><span
                                                        data-hover="Telegram">Telegram</span></Link>
                                                </div> :
                                                <div className="footer__social p-style">
                                                    <Link className="footer__social-item hover-flip" to="/"><span
                                                        data-hover="Dprofile">Dprofile</span></Link>
                                                    <Link className="footer__social-item hover-flip" to="/"><span
                                                        data-hover="VK">VK</span></Link>
                                                    <Link className="footer__social-item hover-flip" to="/"><span
                                                        data-hover="Behance">Behance</span></Link>
                                                    <Link className="footer__social-item hover-flip" to="/"><span
                                                        data-hover="Telegram">Telegram</span></Link>
                                                </div>
                                        }

                                    </div>
                                </>

                            </div>
                        </>
                    }
                    <div className="footer-info__wrap footer__copyright p-style">
                        <p>© 2016–2023 DEUS agency</p>
                        <p>Политика конфиденциальности</p>
                        <img onClick={handleButtonClick} className="to-top-mob hidden-desktop" src={arrorLink}
                             alt={'go'}/>
                    </div>


                </div>
            </footer>
        </>
    )

}

export default connect(
    (state) => ({
        headerData: state.app.headerData,
        services: state.app.services
    })
)(AppFooter)